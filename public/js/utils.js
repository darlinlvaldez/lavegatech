export async function checkAuth() {
    try {
        return await fetchFav('/api/auth/status');
    } catch (error) {
        return { authenticated: false };
    }
}

export async function fetchFav(url, options = {}) {
    try {
        const response = await fetch(url, { credentials: 'include', ...options });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error en fetch a ${url}:`, error);
        throw error;
    }
}

export function updateFavCount(count) {
    document.querySelectorAll('.qty-fav').forEach(el => el.textContent = count);
}

async function getRealStock(productId, color) {
  try {
    const response = await fetch(`/cart/stock?id=${productId}&color=${encodeURIComponent(color)}`);
    if (!response.ok) throw new Error('Error al verificar stock');
    const { stock = 0 } = await response.json();
    return stock;
  } catch (error) {
    console.error('Error al obtener stock:', error);
    return 0;
  }
}

async function updateOrRemoveItem({ productId, color, newQuantity, element = null }) {
  try {
    const authData = await checkAuth();
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemIndex = cart.findIndex(item => item.colorSeleccionado === color);

    if (itemIndex >= 0) {
      if (newQuantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].cantidad = newQuantity;
      }

      if (!authData.authenticated) {
        localStorage.setItem('carrito', JSON.stringify(cart));
      }
    }

    if (authData.authenticated) {
      const action = newQuantity <= 0 ? 'remove-item' : 'update-quantity';
      const response = await fetch(`/cart/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({producto_id: productId, colorSeleccionado: color,
          ...(action === 'update-quantity' && { cantidad: newQuantity })
        }), credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error(`Error al ${action} item`);
      }
    }

    if (element) {
      if (newQuantity <= 0) {
        element.closest('.cart-item')?.remove();
      } else {
        updateItemTotalPrice(productId, color);
      }
    }

    return {success: true, action: newQuantity <= 0 ? 'removed' : 'updated'};
  } catch (error) {
    console.error('Error en updateOrRemoveItem:', error);
    return { success: false, error: error.message};
  }
}

async function filterItemsByStock(items, isServerCart = false) {
  const verifiedItems = [];
  
  for (const item of items) {
    try {
      const productId = item.producto_id;
      const color = item.colorSeleccionado;
      
      if (!productId) continue;

      const response = await fetch(`/cart/stock?id=${productId}&color=${encodeURIComponent(color)}`,
      { credentials: 'include' });
      const stockData = await response.json();

      if (!stockData.success) continue;

      if (stockData.stock > 0) {
        const newQuantity = stockData.adjusted ? 
          stockData.newQuantity : Math.min(item.cantidad, stockData.stock);
        
        verifiedItems.push({...item, cantidad: newQuantity});

      } else if (isServerCart) {
        await updateOrRemoveItem({productId, color, newQuantity: 0});
      }
    } catch (error) {
      console.error('Error al verificar stock:', error);
      verifiedItems.push(item); 
    }
  }
  
  if (!isServerCart) {
  localStorage.setItem('carrito', JSON.stringify(verifiedItems.filter(i => i.cantidad > 0)));
}

return verifiedItems;
}

export {filterItemsByStock, updateOrRemoveItem, getRealStock};
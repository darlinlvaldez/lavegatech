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
    const itemIndex = cart.findIndex(item => 
      (item.id === productId || item.producto_id === productId) && 
      item.colorSeleccionado === color
    );

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

async function filterItemsByStock(items, isServerCart = false, userId = null) {
  const verifiedItems = [];
  
  for (const item of items) {
    try {
      const productId = item.id || item.producto_id;
      const color = item.colorSeleccionado || item.colorSeleccionado;
      
      if (!productId) continue;

      const response = await fetch(
        `/cart/stock?id=${productId}&color=${encodeURIComponent(color)}`,
        { credentials: 'include' }
      );
      const stockData = await response.json();

      if (!stockData.success) continue;

      if (stockData.stock > 0) {
        const newQuantity = stockData.adjusted ? 
          stockData.newQuantity : 
          Math.min(item.cantidad || 1, stockData.stock);
        
        verifiedItems.push({
          ...item,
          cantidad: newQuantity
        });

        // Mostrar notificación si se ajustó la cantidad
        if (stockData.adjusted && newQuantity < item.cantidad) {
          showToast(
            `La cantidad de ${item.nombre} (${color}) se ajustó a ${newQuantity} por disponibilidad de stock`,
            "#f39c12",
            "info"
          );
        }
      } else if (isServerCart) {
        await updateOrRemoveItem({
          productId, 
          color, 
          newQuantity: 0
        });
      }
    } catch (error) {
      console.error('Error al verificar stock:', error);
      verifiedItems.push(item); 
    }
  }

  if (!isServerCart) {
    const localCart = JSON.parse(localStorage.getItem('carrito')) || [];
    const newCart = localCart.map(item => {
      const verifiedItem = verifiedItems.find(vi => 
        (vi.id === item.id || vi.producto_id === item.id) && 
        vi.colorSeleccionado === item.colorSeleccionado
      );
      return verifiedItem || item;
    }).filter(item => item.cantidad > 0);
    
    localStorage.setItem('carrito', JSON.stringify(newCart));
  }

  return verifiedItems;
}

export {filterItemsByStock, updateOrRemoveItem, getRealStock};
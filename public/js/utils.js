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

    const isRemove = newQuantity <= 0;

    if (itemIndex >= 0) {
      isRemove ? cart.splice(itemIndex, 1) : cart[itemIndex].cantidad = newQuantity;
      if (!authData.authenticated) {
        localStorage.setItem('carrito', JSON.stringify(cart));
      }
    }

    if (authData.authenticated) {
      const action = isRemove ? 'remove-item' : 'update-quantity';
      const body = {
        producto_id: productId,
        colorSeleccionado: color,
        ...(action === 'update-quantity' && { cantidad: newQuantity })
      };

      const response = await fetch(`/cart/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      if (!response.ok) throw new Error(`Error al ${action} item`);
    }

    if (element) {
      isRemove ? element.closest('.cart-item')?.remove() : updateItemTotalPrice(productId, color);
    }

    return { success: true, action: isRemove ? 'removed' : 'updated' };
  } catch (error) {
    console.error('Error en updateOrRemoveItem:', error);
    return { success: false, error: error.message };
  }
}

async function filterItemsByStock(items, isServerCart = false) {
  const results = await Promise.all(items.map(async (item) => {
    const { producto_id: productId, colorSeleccionado: color, cantidad } = item;
    if (!productId) return null;

    try {
      const res = await fetch(`/cart/stock?id=${productId}&color=${encodeURIComponent(color)}`, {
        credentials: 'include'
      });
      const stockData = await res.json();
      if (!stockData.success) return null;

      if (stockData.stock > 0) {
        const newQuantity = stockData.adjusted ? stockData.newQuantity : Math.min(cantidad, stockData.stock);
        return { ...item, cantidad: newQuantity };
      } else if (isServerCart) {
        await updateOrRemoveItem({ productId, color, newQuantity: 0 });
      }
    } catch (e) {
      console.error('Error al verificar stock:', e);
      return item;
    }
    return null;
  }));

  const filtered = results.filter(item => item && item.cantidad > 0);
  if (!isServerCart) localStorage.setItem('carrito', JSON.stringify(filtered));
  return filtered;
}

export {filterItemsByStock, updateOrRemoveItem, getRealStock};
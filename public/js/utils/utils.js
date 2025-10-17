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

export {getRealStock};
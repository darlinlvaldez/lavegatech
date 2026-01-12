export async function getAuthStatus() {
    try {
        return await apiFetch('/api/auth/status');
    } catch (error) {
        return { authenticated: false };
    }
}

export async function apiFetch(url, options = {}) {
    try {
        const response = await fetch(url, { credentials: 'include', ...options });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error en fetch a ${url}:`, error);
        throw error;
    }
}

async function getRealStock(variantId) {
  try {
    const response = await fetch(`/cart/stock?variantId=${variantId}`);
    if (!response.ok) throw new Error('Error al verificar stock');

    const { stock = 0 } = await response.json();
    return stock;
  } catch (error) {
    console.error('Error al obtener stock:', error);
    return 0;
  }
}

export {getRealStock};
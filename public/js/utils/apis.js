import { checkAuth } from './utils.js';

async function fetchCartItems() {
    let cart = [];

    try {
        const authData = await checkAuth();

        if (authData.authenticated) {
            localStorage.removeItem('carrito');

            const res = await fetch('/cart/items', {
                credentials: 'include',
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.items)) {
                    cart = data.items.filter(item => Number(item.cantidad) > 0);
                }
            } else {
                console.error('Error al obtener carrito del servidor');
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem('carrito')) || [];
            cart = localCart.filter(item => Number(item.cantidad) > 0);
        }
    } catch (error) {
        console.error('Error al cargar carrito del servidor:', error);
        const localCart = JSON.parse(localStorage.getItem('carrito')) || [];
        cart = localCart.filter(item => Number(item.cantidad) > 0);
    }

    return cart;
}

export { fetchCartItems };

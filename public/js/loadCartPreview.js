import {checkAuth, checkStock} from './utils.js';
import {handleClearCart} from './cart.js';

async function loadCartPreview() {
    let carrito = [];
    const cartList = document.getElementById('cart-list');
    const carritoCount = document.getElementById('carrito-count');
    const cartSummary = document.getElementById('cart-summary');
    const cartSubtotal = document.getElementById('cart-subtotal');

    try {
        const authData = await checkAuth();
        if (authData.authenticated) {
            const res = await fetch('/cart/items', { 
                credentials: 'include',
                headers: {'Accept': 'application/json'}
            });
            
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await res.json();
                if (data.success && Array.isArray(data.items)) {
                    carrito = await checkStock(data.items, true);
                }
            } else {
                const text = await res.text();
                console.error('Respuesta inesperada del servidor:', text.substring(0, 100));
            }
        }
    } catch (error) {
        console.error('Error al cargar carrito del servidor:', error);
    }

    if (carrito.length === 0) {
        const localCart = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = await checkStock(localCart, false);
    }
    
    const clearCartContainer = document.getElementById('clear-cart-container');
    if (clearCartContainer) {
        if (carrito.length > 0) {
            clearCartContainer.innerHTML = `
                <button id="clear-cart-btn" class="btn btn-danger">
                    <i class="bi bi-trash"></i> Vaciar
                </button>`;
            clearCartContainer.style.display = 'block';
            document.getElementById('clear-cart-btn').addEventListener('click', handleClearCart);
        } else {
            clearCartContainer.innerHTML = '';
            clearCartContainer.style.display = 'none';
        }
    }

    const count = document.getElementById('cart-items-count');
    if (count) {
        count.textContent = `${carrito.length} ${carrito.length === 1 ? 'producto' : 'productos'}`;
    }

    renderCart(carrito, cartList, carritoCount, cartSummary, cartSubtotal);
}

export {loadCartPreview};
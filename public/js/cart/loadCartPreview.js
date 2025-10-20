import { fetchCartItems } from '../utils/apis.js';

async function loadCartPreview() {
    const carrito = await fetchCartItems();

    const cartList = document.getElementById('cart-list');
    const carritoCount = document.getElementById('carrito-count');
    const cartSummary = document.getElementById('cart-summary');
    const cartSubtotal = document.getElementById('cart-subtotal');

    renderCart(carrito, cartList, carritoCount, cartSummary, cartSubtotal);
}

export { loadCartPreview };
import { loadCartPreview } from '../cart/loadCartPreview.js';
import { calculateItem } from '../utils/calculateItem.js'; 

window.renderCart = renderCart;

function renderCart(carrito, cartList, carritoCount, cartSummary, cartSubtotal) {
    
    if (carrito.length === 0) {
        if (cartList) cartList.innerHTML = '<p>No hay productos en el carrito.</p>';
        if (carritoCount) carritoCount.textContent = '0';
        if (cartSummary) cartSummary.textContent = '0 producto(s) seleccionado(s)';
        if (cartSubtotal) cartSubtotal.textContent = 'SUBTOTAL: $0.00';
        return;
    }

    let total = 0;
    let html = '';

    carrito.forEach(item => {
        const data = calculateItem(item);

        total += data.total;

        html += `
        <div class="product-widget">
            <a href="/product/${data.productId}${data.color ? `?color=${encodeURIComponent(data.color)}` : ''}">
                <div class="product-img">
                    <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                <div class="product-body">
                    <h3 class="product-nombres">${item.nombre} ${data.especificaciones}</h3>
                    <h4 class="product-precios">
                    <span class="qty-cart">${data.cantidad}x</span> 
                    $${formatPrice(data.precioFinal)}
                </h4>
            </div>
            </a>
            <button class="delete" onclick="deleteProduct('${data.productId}', '${data.color}')">
                <i class="fa fa-close"></i>
            </button>
        </div>`;
    });

    if (cartList) cartList.innerHTML = html;
    if (carritoCount) carritoCount.textContent = carrito.reduce((sum, item) => sum + (Number(item.cantidad) || 1), 0);
    if (cartSummary) cartSummary.textContent = `${carrito.length} producto(s) seleccionado(s)`;
    if (cartSubtotal) cartSubtotal.textContent = `SUBTOTAL: $${formatPrice(total)}`;
}

export { loadCartPreview, calculateItem };
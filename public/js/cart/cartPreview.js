import { loadCartPreview } from '../cart/loadCartPreview.js';

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
        const precio = parseFloat(item.precio) || 0;
        const descuento = parseFloat(item.descuento) || 0;
        const precioConDescuento = descuento > 0 ? precio * (1 - descuento / 100) : precio;
        total += precioConDescuento * item.cantidad;

        const productId = item.id || item.producto_id;
        const color = item.colorSeleccionado || item.colorSeleccionado;

        html += `
            <div class="product-widget">
                <a href="/product/${productId}${color ? `?color=${encodeURIComponent(color)}` : ''}">
                    <div class="product-img">
                        <img src="${item.imagen}" alt="${item.nombre}">
                    </div>
                    <div class="product-body">
                        <h3 class="product-nombres">${item.nombre} ${item.ram} + ${item.almacenamiento}</h3></a>
                        <h4 class="product-precios">
                            <span class="qty-cart">${item.cantidad}x</span> 
                            $${formatPrice(precioConDescuento)}
                        </h4>
                    </div>
                    <button class="delete" onclick="deleteProduct('${productId}', '${color}')">
                        <i class="fa fa-close"></i>
                    </button>
            </div>
        `;
    });

    if (cartList) cartList.innerHTML = html;
    if (carritoCount) carritoCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (cartSummary) cartSummary.textContent = `${carrito.length} producto(s) seleccionado(s)`;
    if (cartSubtotal) cartSubtotal.textContent = `SUBTOTAL: $${formatPrice(total)}`;
}

export { loadCartPreview };
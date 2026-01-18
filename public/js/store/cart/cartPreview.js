import { calculateItem } from '../../utils/calculateItem.js'; 

function renderCart(cart, cartList, cartCount, cartSummary, cartSubtotal) {

    if (!cart || cart.length === 0) {
        if (cartList) cartList.innerHTML = '<p>No hay productos en el carrito.</p>';
        if (cartCount) cartCount.textContent = '0';
        if (cartSummary) cartSummary.textContent = '0 producto(s) seleccionado(s)';
        if (cartSubtotal) cartSubtotal.textContent = 'SUBTOTAL: $0.00';
        return;
    }

    let total = 0;
    let totalItems = 0;
    let html = '';

    cart.forEach(item => {
        const stock = item.realStock ?? 0;
        const data = calculateItem(item, stock);

        if (stock > 0) {
            total += data.total;
            totalItems += data.quantity;
        }

        html += `
        <div class="product-widget ${stock === 0 ? 'out-of-stock' : ''}">
            <a href="/product/${data.productId}?variant=${data.variantId}">
                <div class="product-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>

                <div class="product-body">
                    <h3 class="product-name">${item.name} ${data.specs}</h3>

                    <h4 class="product-price">
                        ${stock > 0
                                ? `<span class="qty-cart">${data.quantity}x </span>`
                                : `<span class="badge qty-cart">AGOTADO</span>`
                        }$${formatPrice(data.finalPrice)}
                    </h4>
                </div>
            </a>

            <button class="delete" onclick="deleteProduct('${data.variantId}')">
                <i class="fa fa-close"></i>
            </button>
        </div>`;
    });

    if (cartList) cartList.innerHTML = html;
    if (cartCount) cartCount.textContent = totalItems;
    if (cartSummary) cartSummary.textContent = `${totalItems} producto(s) seleccionado(s)`;
    if (cartSubtotal) cartSubtotal.textContent = `SUBTOTAL: $${formatPrice(total)}`;
}

export { calculateItem, renderCart };
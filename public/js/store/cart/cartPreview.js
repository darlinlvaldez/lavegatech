import { calculateItem } from '../../utils/calculateItem.js'; 

function renderCart(cart, cartList, cartCount, cartSummary, cartSubtotal) {
    
    if (cart.length === 0) {
        if (cartList) cartList.innerHTML = '<p>No hay productos en el cart.</p>';
        if (cartCount) cartCount.textContent = '0';
        if (cartSummary) cartSummary.textContent = '0 producto(s) seleccionado(s)';
        if (cartSubtotal) cartSubtotal.textContent = 'SUBTOTAL: $0.00';
        return;
    }

    let total = 0;
    let html = '';

    cart.forEach(item => {
        const data = calculateItem(item);

        total += data.total;

        html += `
        <div class="product-widget">
            <a href="/product/${data.productId}?variant=${data.variantId}">
                <div class="product-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="product-body">
                    <h3 class="product-name">${item.name} ${data.specs}</h3>
                    <h4 class="product-price">
                    <span class="qty-cart">${data.quantity}x</span> 
                    $${formatPrice(data.finalPrice)}
                </h4>
            </div>
            </a>
            <button class="delete" onclick="deleteProduct('${data.variantId}')">
                <i class="fa fa-close"></i>
            </button>
        </div>`;
    });

    if (cartList) cartList.innerHTML = html;
    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    if (cartSummary) cartSummary.textContent = `${cart.length} producto(s) seleccionado(s)`;
    if (cartSubtotal) cartSubtotal.textContent = `SUBTOTAL: $${formatPrice(total)}`;
}

export {calculateItem, renderCart };
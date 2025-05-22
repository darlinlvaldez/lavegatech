async function updateQuantity(element, change, productId, color) {
    let newQuantity;
    if (element.tagName === 'SELECT') {
        newQuantity = parseInt(element.value);
    } else {
        newQuantity = Math.max(1, parseInt(element.value) + change);
    }

    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemIndex = cart.findIndex(item => 
        (item.id === productId || item.producto_id === productId) && 
        item.colorSeleccionado === color
    );

    if (itemIndex >= 0) {
        cart[itemIndex].cantidad = newQuantity;
        localStorage.setItem('carrito', JSON.stringify(cart));
    }

    try {
        const authRes = await fetch('/api/auth/status', { credentials: 'include' });
        const authData = await authRes.json();
        
        if (authData.authenticated) {
            await fetch('/cart/update-quantity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    producto_id: productId,
                    colorSeleccionado: color,
                    cantidad: newQuantity
                }),
                credentials: 'include'
            });
        }
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
    }

    updateItemTotalPrice(productId, color);
    updateCartTotal();
}

function updateItemTotalPrice(id, color) {
const itemElement = document.querySelector(`.cart-item[data-id="${id}"][data-color="${color}"]`);
    if (!itemElement) return;

    const priceElement = itemElement.querySelector('.product-price b');
    const quantitySelect = itemElement.querySelector('select');
    const totalElement = itemElement.querySelector('.item-total');

    if (priceElement && quantitySelect && totalElement) {
        const priceText = priceElement.textContent.replace('Precio: $', '').trim();
        const unitPrice = parsePrice(priceText);
        const quantity = parseInt(quantitySelect.value);
        const totalPrice = unitPrice * quantity;

        totalElement.innerHTML = `<span><strong>Total:</strong></span> $${formatPrice(totalPrice)}`;
    }
}

function parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9.-]+/g,""));
}

function updateCartTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;

    items.forEach(item => {
        const totalElement = item.querySelector('.item-total');
        if (totalElement) {
            const priceText = totalElement.textContent.split('$')[1];
            const itemTotal = parsePrice(priceText);
            total += itemTotal;
        }
    });

    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${formatPrice(total)}`;
    }
}

async function loadCartPage() {
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    
    try {
        const authCheck = await fetch('/api/auth/status', { credentials: 'include' });
        const authData = await authCheck.json();
        
        if (authData.authenticated) {
            const serverResponse = await fetch('/cart/items', { credentials: 'include' });
            if (serverResponse.ok) {
                const serverData = await serverResponse.json();
                if (serverData.success && serverData.items) {
                    cart = serverData.items;
                }
            }
        }
    } catch (error) {
        console.error("Error al obtener carrito:", error);
    }

    const container = document.getElementById('cart-items-container');
    const countElement = document.getElementById('cart-items-count');
    const totalElement = document.getElementById('cart-total');

    if (cart.length > 0) {
        let html = '';
        let total = 0;
        
        cart.forEach(item => {
            const productId = item.id;
            const color = item.colorSeleccionado;
            const stock = item.stock || 0;
            
            const price = Number(item.precio) || 0;
            const discount = Number(item.descuento) || 0;
            const finalPrice = discount > 0 ? price * (1 - discount/100) : price;
            const itemTotal = finalPrice * (item.cantidad || 1);
            total += itemTotal;

            let quantityOptions = '';
            const maxQuantity = Math.min(stock, 10);
            for (let i = 1; i <= maxQuantity; i++) {
                quantityOptions += `<option value="${i}" ${i === item.cantidad ? 'selected' : ''}>${i}</option>`;
            }

            html += `
            <div class="cart-item" data-id="${productId}" data-color="${color}">
                <a href="/product/${productId}${color ? `?color=${encodeURIComponent(color)}` : ''}">
                    <img src="${item.imagen}" alt="${item.nombre}" class="product-imagen">
                    <div class="product-info">
                        <h5>${item.nombre}</h5>
                        <b>Precio:</b>
                        <span class="product-price">
                            <b>$${formatPrice(finalPrice)}</b>
                            ${discount > 0 ? `
                                <del class="product-old-price">$${formatPrice(price)}</del>
                                <span class="sale">-${discount.toFixed(2)}%</span>` : ''}
                        </span>
                        <div class="item-total">
                            <span><strong>Total:</strong></span>
                            $${formatPrice(itemTotal)}
                        </div>
                    </a>
                </div>
                <div class="product-items">
                    <span class="label">Color</span>
                    <div class="color-item">
                        ${color ? `<span>${color}</span>` : '<span>No disponible</span>'}
                    </div>
                </div>
                <div data-id="${productId}" data-color="${color}">
                    <div class="qty-cantidad">
                        <span>Cantidad</span>
                        <div class="input-number product-quantity">
                            <select class="input-select" 
                                onchange="updateQuantity(this, 0, '${productId}', '${color}')">
                                ${quantityOptions}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-1">
                    <i class="bi bi-trash remove-btn" onclick="deleteProduct('${productId}', '${color}')"></i>
                </div>
            </div>`;
        });

        container.innerHTML = html;
        countElement.textContent = `${cart.length} ${cart.length === 1 ? 'producto' : 'productos'}`;
        totalElement.textContent = `${formatPrice(total)}`;
    } else {
        container.innerHTML = '<p>No hay productos en el carrito.</p>';
        countElement.textContent = '0 productos';
        totalElement.textContent = '$0.00';
    }
}
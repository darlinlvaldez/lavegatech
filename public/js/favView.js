function updateFavCount(count) {
    const favCountElements = document.querySelectorAll('.qty-fav'); 
    favCountElements.forEach(element => {
        if (element) element.textContent = count;
    });
}

async function loadFavPage() {
    const container = document.getElementById('fav-items-container');
    const countElement = document.getElementById('fav-items-count');
    
    if (!container || !countElement) return;

    let favs = [];
    
    try {
        const authCheck = await fetch('/api/auth/status', { credentials: 'include' });
        const authData = await authCheck.json();
        
        if (authData.authenticated) {
            const serverResponse = await fetch('/fav/items', { credentials: 'include' });
            if (serverResponse.ok) {
                const serverData = await serverResponse.json();
                if (serverData.success && serverData.items) {
                    favs = serverData.items;
                }
            }
        }
    } catch (error) {
        console.error("Error al obtener favoritos:", error);
    }

    updateFavCount(favs.length);

    if (favs.length > 0) {
        let html = '';
        
        favs.forEach(item => {
            const productId = item.id || item.producto_id;
            const color = item.colorSeleccionado;
            const price = Number(item.precio) || 0;
            const discount = Number(item.descuento) || 0;
            const finalPrice = discount > 0 ? price * (1 - discount/100) : price;

            html += `
            <div class="fav-item" data-id="${productId}" data-color="${color}">
                <a href="/product/${productId}${color ? `?color=${encodeURIComponent(color)}` : ''}">
                    <img src="${item.imagen}" alt="${item.nombre}" class="product-imagen">
                    <div class="product-info">
                        <h5>${item.nombre}</h5>
                        <span class="product-price">
                            <b>$${formatPrice(finalPrice)}</b>
                            ${discount > 0 ? `
                                <del class="product-old-price">$${formatPrice(price)}</del>
                                <span class="sale">-${discount.toFixed(2)}%</span>` : ''}
                        </span>
                    </div>
                </a>
                <div class="product-items">
                    <span class="label">Color</span>
                    <div class="color-item">
                        ${color ? `<span>${color}</span>` : '<span>No disponible</span>'}
                    </div>
                </div>
                <div class="fav-item" data-id="${productId}" data-color="${color}">
            <div class="action-buttons">
                <button class="add-to-cart-btn"
            data-id="${productId}" 
            data-nombre="${item.nombre}" 
            data-precio="${price}" 
            data-color="${color}"
            data-descuento="${discount}" 
            data-stock="${item.stockPorColor || 1}"
            data-imagen="${item.imagen}">
            <i class="fa fa-shopping-cart"></i> Añadir al carrito
        </button>
                <i class="bi bi-trash remove-btn" onclick="removeFromFav('${productId}', '${color}')"></i>
            </div>
        </div>`;
        });

        container.innerHTML = html;
        countElement.textContent = `${favs.length} ${favs.length === 1 ? 'producto' : 'productos'}`;
    } else {
        container.innerHTML = '<p>No hay productos en tu lista de deseos.</p>';
        countElement.textContent = '0 productos';
    }
}

async function removeFromFav(productId, color) {
    try {
        const authRes = await fetch('/api/auth/status', { credentials: 'include' });
        const authData = await authRes.json();
        
        if (authData.authenticated) {
            const response = await fetch('/fav/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    producto_id: productId,
                    colorSeleccionado: color
                }),
                credentials: 'include'
            });
            
            const data = await response.json();
            if (data.success) {
                updateFavCount(data.count || 0);
                loadFavPage();
            }
        }
    } catch (error) {
        console.error('Error al eliminar de favoritos:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[name="color"], .color-option').forEach(element => {
        element.addEventListener('click', function () {
            const selectedColor = this.value || this.textContent;
            document.querySelector('.add-to-wishlist').dataset.productColor = selectedColor;
        });
    });

    // Manejar clic en botones de lista de deseos
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', async function () {
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            const productPrice = this.getAttribute('data-product-price');
            const productDiscount = this.getAttribute('data-product-discount');
            const productImage = this.getAttribute('data-product-image');
            const colorSelected = this.dataset.productColor || document.querySelector('.color-selected')?.textContent || null;

            try {
                // 1. Actualizar el estado visual inmediatamente (feedback al usuario)
                this.innerHTML = '<i class="fa fa-heart"></i><span class="tooltipp">Agregado</span>';
                this.classList.add('added');

                // 3. Enviar al servidor si el usuario está autenticado
                const authCheck = await fetch('/api/auth/status', { credentials: 'include' });
                const authData = await authCheck.json();

                if (authData.authenticated) {
                    const response = await fetch('/fav/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            producto_id: productId,
                            colorSeleccionado: colorSelected,
                            nombre: productName,
                            precio: productPrice,
                            descuento: productDiscount,
                            imagen: productImage
                        }),
                        credentials: 'include'
                    });

                    const result = await response.json();
                    if (!result.success) {
                        console.error('Error al agregar a favoritos:', result.message);
                    }
                }

                // 4. Mostrar notificación
                showNotification('Producto agregado a tu lista de deseos');

            } catch (error) {
                console.error('Error:', error);
                this.innerHTML = '<i class="fa fa-heart-o"></i><span class="tooltipp">Error</span>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fa fa-heart-o"></i><span class="tooltipp">Lista de deseo</span>';
                }, 2000);
            }
        });
    });
});

function showNotification(message) {
    // Implementación básica de notificación - puedes usar Toastr o similar
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', loadFavPage);
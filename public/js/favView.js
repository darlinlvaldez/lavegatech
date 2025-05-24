async function checkAuth() {
    try {
        return await fetchFav('/api/auth/status');
    } catch (error) {
        return { authenticated: false };
    }
}

async function fetchFav(url, options = {}) {
    try {
        const response = await fetch(url, { credentials: 'include', ...options });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error en fetch a ${url}:`, error);
        throw error;
    }
}

function updateFavCount(count) {
    document.querySelectorAll('.qty-fav').forEach(el => el.textContent = count);
}

function generateFavItemHTML(item) {
    const productId = item.id || item.producto_id;
    const color = item.colorSeleccionado;
    const price = Number(item.precio) || 0;
    const discount = Number(item.descuento) || 0;
    const finalPrice = discount > 0 ? price * (1 - discount/100) : price;

    return `
    <div class="fav-item" data-id="${productId}" data-color="${color}">
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
<<<<<<< Updated upstream
                </span>
            </div>
        </a>
        <div class="product-items">
            <span class="label">Color</span>
            <div class="color-item">
                ${color ? `<span>${color}</span>` : '<span>No disponible</span>'}
            </div>
        </div>
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
}

async function loadFavPage() {
    const container = document.getElementById('fav-items-container');
    const countElement = document.getElementById('fav-items-count');
    if (!container || !countElement) return;

    let favs = [];
    const authData = await checkAuth();
    
    if (authData.authenticated) {
        try {
            const serverData = await fetchFav('/fav/items');
            if (serverData.success && serverData.items) favs = serverData.items;
        } catch (error) {
            console.error("Error al obtener favoritos:", error);
        }
    }

    updateFavCount(favs.length);

    if (favs.length > 0) {
        container.innerHTML = favs.map(generateFavItemHTML).join('');
        countElement.textContent = `${favs.length} ${favs.length === 1 ? 'producto' : 'productos'}`;
    } else {
        container.innerHTML = '<p>No hay productos en tu lista de deseos.</p>';
        countElement.textContent = '0 productos';
    }
}

async function removeFromFav(productId, color) {
    const authData = await checkAuth();
    if (!authData.authenticated) return;

    try {
        const data = await fetchFav('/fav/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ producto_id: productId, colorSeleccionado: color })
        });
        
        if (data.success) {
            updateFavCount(data.count || 0);
            loadFavPage();
        }
    } catch (error) {
        console.error('Error al eliminar de favoritos:', error);
    }
}

async function toggleFavorite(button) {
    if (button.disabled) return;
    button.disabled = true;

    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = button.getAttribute('data-product-price');
    const productDiscount = button.getAttribute('data-product-discount');
    const productImage = button.getAttribute('data-product-image');
    const colorSelected = button.dataset.productColor || document.querySelector('.color-selected')?.textContent || null;
    const isAlreadyAdded = button.classList.contains('added');

    try {
        const authData = await checkAuth();
        if (!authData.authenticated) {
            showNotification('Debes iniciar sesión para usar favoritos');
            return;
        }

        if (isAlreadyAdded) {
            await removeFromFav(productId, colorSelected);
            button.classList.remove('added');
            button.innerHTML = '<i class="fa fa-heart-o"></i><span class="tooltipp">Lista de deseo</span>';
            showNotification('Producto eliminado de tu lista de deseos');
        } else {
            await fetchFav('/fav/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    producto_id: productId,
                    colorSeleccionado: colorSelected,
                    nombre: productName,
                    precio: productPrice,
                    descuento: productDiscount,
                    imagen: productImage
                })
            });

            button.classList.add('added');
            button.innerHTML = '<i class="fa fa-heart"></i><span class="tooltipp">Agregado</span>';
            showNotification('Producto agregado a tu lista de deseos');
        }

        await checkFavorites();
    } catch (error) {
        console.error('Error en toggleFavorite:', error);
        showNotification('Ocurrió un error. Intenta nuevamente.');
    } finally {
        button.disabled = false;
    }
}


async function checkFavorites() {
    try {
        const authData = await checkAuth();
        let favorites = [];
        
        if (authData.authenticated) {
            const data = await fetchFav('/fav/items');
            if (data.success && data.items) favorites = data.items;
        }

        document.querySelectorAll('.add-to-wishlist').forEach(button => {
            const productId = button.getAttribute('data-product-id');
            const color = button.dataset.productColor || null;
            const isFav = favorites.some(item => item.id == productId && item.colorSeleccionado == color);
            
            if (isFav) {
                button.innerHTML = '<i class="fa fa-heart"></i><span class="tooltipp">Agregado</span>';
                button.classList.add('added');
            }
        });

        updateFavCount(favorites.length);
    } catch (error) {
        console.error("Error al verificar favoritos:", error);
        updateFavCount(0);
    }
}

function setupEventListeners() {
    document.querySelectorAll('[name="color"], .color-option').forEach(element => {
        element.addEventListener('click', function() {
            const selectedColor = this.value || this.textContent;
            document.querySelector('.add-to-wishlist').dataset.productColor = selectedColor;
        });
    });

    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', () => toggleFavorite(button));
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadFavPage();
    checkFavorites();
});
=======
                        </span>
                    </a>
                </div>
                <div class="product-items">
                    <span class="label">Color</span>
                    <div class="color-item">
                        ${color ? `<span>${color}</span>` : '<span>No disponible</span>'}
                    </div>
                </div>
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
                    </div>
                    <div class="col-md-1">
                    <i class="bi bi-trash remove-btn" onclick="removeFromFav('${productId}', '${color}')"></i>
                </div>
            </div>`;
        }
        
        async function removeFromFav(productId, color) {
            const authData = await checkAuth();
            if (!authData.authenticated) return;

            try {
                const data = await fetchFav('/fav/remove', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ producto_id: productId, colorSeleccionado: color })
                });
                
                if (data.success) {
                    updateFavCount(data.count || 0);
                    loadFavPage();
                }
            } catch (error) {
                console.error('Error al eliminar de favoritos:', error);
            }
        }
        
        async function loadFavPage() {
            const container = document.getElementById('fav-items-container');
            const countElement = document.getElementById('fav-items-count');
            if (!container || !countElement) return;

            let favs = [];
            const authData = await checkAuth();
            
            if (authData.authenticated) {
                try {
                    const serverData = await fetchFav('/fav/items');
                    if (serverData.success && serverData.items) favs = serverData.items;
                } catch (error) {
                    console.error("Error al obtener favoritos:", error);
                }
            }
            
            updateFavCount(favs.length);
            
            if (favs.length > 0) {
            container.innerHTML = favs.map(generateFavItemHTML).join('');
            countElement.textContent = `${favs.length} ${favs.length === 1 ? 'producto' : 'productos'}`;
        } else {
            container.innerHTML = '<p>No hay productos en tu lista de deseos.</p>';
            countElement.textContent = '0 productos';
        }
    }

export { removeFromFav, loadFavPage };
>>>>>>> Stashed changes

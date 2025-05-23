import { fetchFav, checkAuth, updateFavCount } from './utils.js';

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
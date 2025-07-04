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
                data-stock="${item.stockPorColor}"
                data-imagen="${item.imagen}">
                <i class="fa fa-shopping-cart"></i> Añadir al carrito
            </button>
            </div>
            <i class="bi bi-trash remove-btn" onclick="removeFromFav('${productId}', '${color}')"></i>
        </div>`;
    }

export {generateFavItemHTML};
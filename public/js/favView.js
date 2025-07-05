import { fetchFav, checkAuth } from './utils.js';
import {loadFavPage} from './loadFavPage.js';
import { showConfirmDialog } from './sweetAlert2.js';

window.renderButton = renderButton;

async function handleClearFav() {
  const confirmed = await showConfirmDialog({
    title: "¿Vaciar favoritos?",
    text: "¿Deseas eliminar todos los productos favoritos?",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const authData = await checkAuth();

    if (!authData.authenticated) {
      localStorage.removeItem("favoritos");
      await loadCartPreview();
      return;
    }

    const data = await fetchFav("/fav/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (data.success) {
      await loadFavPage();
    }
  } catch (error) {
    console.error("Error al vaciar favoritos:", error);
  }
}

function renderButton(favItems) {
  const favContainer = document.getElementById("fav-items-container");
  const clearFavContainer = document.getElementById("clear-fav-container");
  const countElement = document.getElementById("fav-items-count");

  if (!favContainer || !clearFavContainer || !countElement) return;

  if (favItems.length > 0) {
    favContainer.innerHTML = favItems.map(generateFavItemHTML).join("");
    clearFavContainer.innerHTML = `
      <button id="clear-fav-btn" class="btn btn-danger">
        <i class="bi bi-trash"></i> Vaciar
      </button>`;

    clearFavContainer.style.display = "block";

    document.getElementById("clear-fav-btn").addEventListener("click", handleClearFav);
    
  } else {
    favContainer.innerHTML = "<p>No hay productos en tu lista de deseos.</p>";
    clearFavContainer.innerHTML = "";
    clearFavContainer.style.display = "none";
  }

  countElement.innerHTML = `
  <span class="count-num">${favItems.length}</span>
  <span class="count-label">${favItems.length === 1 ? "producto" : "productos"}</span>
`;
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
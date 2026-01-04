import {fetchFav, checkAuth} from '../../utils/utils.js';
import {loadFavPage} from './loadFavPage.js';
import {calculateItem} from '../../utils/calculateItem.js'; 
import {sweetAlert} from '../../utils/sweetAlert2.js';

window.renderButton = renderButton;

async function handleClearFav() {
  const confirmed = await sweetAlert({
    title: "¿Vaciar favoritos?",
    text: "Se eliminarán todos los productos de favoritos.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const authData = await checkAuth();

    if (!authData.authenticated) {
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
    favContainer.innerHTML = "<p>No hay productos en tu lista de favoritos.</p>";
    clearFavContainer.innerHTML = "";
    clearFavContainer.style.display = "none";
  }

  countElement.innerHTML = `
  <span class="count-num">${favItems.length}</span>
  <span class="count-label">${favItems.length === 1 ? "producto" : "productos"}</span>
`;
}

function generateFavItemHTML(item) {
  
  const data = calculateItem(item);
  
  return ` 
  <div class="fav-item" data-id="${data.productId}" data-color="${data.color}">
        <a href="/product/${data.productId}${data.color ? `?color=${encodeURIComponent(data.color)}` : ''}">
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <div class="product-info">
                <h5>${item.name} ${data.specs}</h5>
                <b>Precio:</b>
                <span class="product-price">  
                    <b>$${formatPrice(data.finalPrice)}</b>
                    ${data.discount > 0 ? `
                      <del class="product-old-price">$${formatPrice(data.originalPrice)}</del>
                      <span class="sale">-${data.discount.toFixed(2)}%</span> ` : ''}
                </span>
                </a>
            </div>
        <div class="product-items">
            <span class="label">Color</span>
            <div class="color-item">
                ${data.color ? `<span>${data.color}</span>` : '<span>No disponible</span>'}
            </div>
        </div>
        <div class="action-buttons">
            <button class="add-to-cart-btn"
            data-id="${data.productId}"
            data-variante-id="${data.variantId}"
            data-color="${data.color}"
            data-ram="${item.ram || ''}"
            data-storage="${item.storage || ''}"
            data-stock="${item.quantity || 0}"
            data-name="${item.name}"
            data-price="${item.price || 0}"
            data-discount="${item.discount || 0}"
            data-tax="${item.tax || 0}"
            data-image="${item.image || ''}">
            <i class="fa fa-shopping-cart"></i> Añadir al carrito
        </button>
        </div>
          <i class="bi bi-trash remove-btn" onclick="removeFromFav('${data.productId}', '${data.color}', '${data.variantId}')"></i>
      </div>`;
    }

export {generateFavItemHTML};
import {fetchFav, checkAuth} from '../utils/utils.js';
import {loadFavPage} from './loadFavPage.js';
import {calculateItem} from '../utils/calculateItem.js'; 
import {sweetAlert} from '../utils/sweetAlert2.js';

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
            <img src="${item.imagen}" alt="${item.nombre}" class="product-imagen">
            <div class="product-info">
                <h5>${item.nombre} ${data.especificaciones}</h5>
                <b>Precio:</b>
                <span class="product-price">  
                    <b>$${formatPrice(data.precioFinal)}</b>
                    ${data.descuento > 0 ? `
                      <del class="product-old-price">$${formatPrice(data.precioAntesDescuento)}</del>
                      <span class="sale">-${data.descuento.toFixed(2)}%</span> ` : ''}
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
            data-variante-id="${data.varianteId}"
            data-color="${data.color}"
            data-ram="${item.ram || ''}"
            data-almacenamiento="${item.almacenamiento || ''}"
            data-stock="${item.cantidad || 0}"
            data-nombre="${item.nombre}"
            data-precio="${item.precio || 0}"
            data-descuento="${item.descuento || 0}"
            data-impuesto="${item.impuesto || 0}"
            data-imagen="${item.imagen || ''}">
            <i class="fa fa-shopping-cart"></i> Añadir al carrito
        </button>
        </div>
          <i class="bi bi-trash remove-btn" onclick="removeFromFav('${data.productId}', '${data.varianteId}')"></i>
      </div>`;
    }

export {generateFavItemHTML};
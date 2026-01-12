import { getRealStock } from '../../utils/utils.js';
import { getAuthStatus } from '../../store/fav/apiFav.js';
import { loadCartPreview } from './loadCartPreview.js';
import { fetchCartItems } from './cartApi.js';
import { calculateItem } from '../../utils/calculateItem.js'; 
import { sweetAlert } from '../../utils/sweetAlert2.js';

window.updateQuantity = async function(element, change, variantId) {
  try {
    const newQuantity = element.tagName === 'SELECT'
      ? parseInt(element.value) 
      : Math.max(1, parseInt(element.value) + change);

    if (!variantId || newQuantity < 1) return;

    const authData = await getAuthStatus();

    if (authData.authenticated) {
      const body = { variantId, quantity: newQuantity };
      const response = await fetch('/cart/update-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Error al actualizar cantidad');

      const data = await response.json();
      console.log(data);
    } else {
      let cart = JSON.parse(localStorage.getItem('carrito')) || [];
      const itemIndex = cart.findIndex(item => item.variantId === variantId);
      if (itemIndex >= 0) cart[itemIndex].quantity = newQuantity;
      localStorage.setItem('carrito', JSON.stringify(cart));
    }

    const countElement = document.getElementById("cart-items-count");
    if (countElement) {
      let totalItems = 0;

      document.querySelectorAll(".cart-item select").forEach((select) => {
        totalItems += parseInt(select.value) || 0;
      });

      countElement.textContent = `${totalItems} ${
        totalItems === 1 ? "producto" : "productos"
      }`;
    }

    totalForItem(variantId);
    totalCart();
    await loadCartPreview();

  } catch (error) {
    console.error('Error en updateQuantity:', error);
  }
};

window.totalForItem = function (variantId) {
  const itemElement = document.querySelector(`.cart-item[data-variant-id="${variantId}"]`);
  if (!itemElement) return;

  const priceText = itemElement.querySelector('.product-price b')?.textContent || '';
  const quantityValue = itemElement.querySelector('select')?.value || '1';
  const totalElement = itemElement.querySelector('.item-total');
  if (!totalElement) return;

  const unitPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, '')) || 0;
  const quantity = parseInt(quantityValue) || 1;

  const totalPrice = unitPrice * quantity;
  totalElement.innerHTML = `<span><strong>Total:</strong></span> $${formatPrice(totalPrice)}`;
};

function totalCart() {
  const items = document.querySelectorAll('.cart-item');
  let total = 0;

  items.forEach(item => {
    const totalText = item.querySelector('.item-total')?.textContent || '';
    const cleanTotal = parseFloat(totalText.split('$')[1]?.replace(/[^0-9.-]+/g, '') || '0');
    if (!isNaN(cleanTotal)) total += cleanTotal;
  });

  const cartTotalElement = document.getElementById('cart-total');
  if (cartTotalElement) {
    cartTotalElement.textContent = `$${formatPrice(total)}`;
  }
}

async function handleClearCart() {
  const confirmed = await sweetAlert({
    title: "¿Vaciar el carrito?",
    text: "Se eliminarán todos los productos del carrito.",
    confirmButtonText: "Aceptar",
  });

  if (!confirmed) return;

  try {
    const authData = await getAuthStatus();
    
    if (!authData.authenticated) {
      localStorage.removeItem('carrito');
      await loadCartPreview();
      await loadCartPage();
      return;
    }

    const res = await fetch('/cart/clear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    
    const data = await res.json();

    if (data.success) {
      await loadCartPreview();
      await loadCartPage();

    }
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
  }
}

async function loadCartPage() {
  const cart = await fetchCartItems();

  const container = document.getElementById("cart-items-container");
  const countElement = document.getElementById("cart-items-count");
  const totalElement = document.getElementById("cart-total");

  if (!container || !countElement || !totalElement) return;

  let html = "";
  let total = 0;
  let totalItems = 0;

  for (const item of cart) {
    const stock = await getRealStock(item.variantId);

    const data = calculateItem(item, stock);

    if (stock > 0) {
      total += data.total;
      totalItems += data.quantity;
    }

    html += `
      <div class="cart-item" data-variant-id="${data.variantId}">
      <a href="/product/${data.productId}?variant=${data.variantId}">
        <img src="${item.image}" alt="${item.name}" class="product-image">
        <div class="product-info">
          <h5>${item.name} ${data.specs}</h5>
          <b>Precio:</b>
          <span class="product-price">
            <b>$${formatPrice(data.finalPrice)}</b>
            ${data.discount > 0 ? `
            <del class="product-old-price">
            $${formatPrice(data.originalPrice)}</del>
            <span class="sale">-${data.discount.toFixed(2)}%</span>` : ""} </span>
          <div class="item-total">
            <span><strong>Total:</strong></span>
            $${formatPrice(data.total)}
          </div></a>
        </div>
        <div class="product-items">
          <span class="label">Color</span>
          <div class="color-item">
            ${data.color ? `<span>${data.color}</span>`
                : "<span>No disponible</span>"}
          </div>
        </div>
        <div data-id="${data.productId}" data-color="${data.color}">
          <div class="qty-cantidad">
            <span>Cantidad</span>
            <div class="input-number product-quantity">
              ${stock > 0 ? `
            <select class="input-select" 
            onchange="updateQuantity(this, 0, '${data.variantId}')">
              ${Array.from({ length: Math.min(stock, 20) },
                (_, i) =>`<option value="${i + 1}" 
                ${i + 1 === data.quantity ? "selected" : ""}>${i + 1}</option>`
              ).join("")}
            </select>
            ` : `<span class="badge bg-danger">AGOTADO</span>`}
            </div>
          </div>
        </div>
        <div class="col-md-1">
          <i class="bi bi-trash remove-btn" 
          onclick="deleteProduct('${data.variantId}')"></i>
        </div>
      </div>`;
    }

  container.innerHTML =
    html || "<p>No hay productos disponibles en el carrito.</p>";
  countElement.textContent = `${totalItems} ${
    totalItems === 1 ? "producto" : "productos"
  }`;
  totalElement.textContent = `$${formatPrice(total)}`;

  const clearCartContainer = document.getElementById("clear-cart-container");
  if (clearCartContainer) {
    if (totalItems > 0) {
      clearCartContainer.innerHTML = `
        <button id="clear-cart-btn" class="btn btn-danger">
            <i class="bi bi-trash"></i> Vaciar
        </button>`;
      clearCartContainer.style.display = "block";
      document.getElementById("clear-cart-btn").addEventListener("click", handleClearCart);
    } else {
      clearCartContainer.innerHTML = "";
      clearCartContainer.style.display = "none";
    }
  }
}

export { loadCartPage };
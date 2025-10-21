import { checkAuth, getRealStock } from '../utils/utils.js';
import { loadCartPreview } from './loadCartPreview.js';
import { fetchCartItems } from '../utils/apis.js';
import { calculateItem } from '../utils/calculateItem.js'; 
import { showToast } from '../utils/toastify.js';
import { sweetAlert } from '../utils/sweetAlert2.js';

window.updateQuantity = async function(element, change, productId, color) {
  try {
    const stockReal = await getRealStock(productId, color);

    const newQuantity = element.tagName === 'SELECT'
      ? parseInt(element.value) : Math.max(1, parseInt(element.value) + change);
    const finalQuantity = Math.min(newQuantity, stockReal);
    const isRemove = finalQuantity <= 0;

    const authData = await checkAuth();
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemIndex = cart.findIndex(item => item.colorSeleccionado === color && item.producto_id === productId);

    if (itemIndex >= 0) {
      isRemove ? cart.splice(itemIndex, 1) : cart[itemIndex].cantidad = finalQuantity;
    }

    if (!authData.authenticated) {
      localStorage.setItem('carrito', JSON.stringify(cart));
    }

    if (authData.authenticated) {
      const action = isRemove ? 'remove-item' : 'update-quantity';
      const body = { producto_id: productId, colorSeleccionado: color,
        ...(action === 'update-quantity' && { cantidad: finalQuantity })
      };

      const response = await fetch(`/cart/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      if (!response.ok) throw new Error(`Error al ${action} item`);
    }

    if (element) {
      isRemove ? element.closest('.cart-item')?.remove() : totalForItem(productId, color);
    }

    totalCart();
    await loadCartPreview();

  } catch (error) {
    console.error('Error en updateQuantity:', error);
    showToast("Error al actualizar la cantidad. Intente nuevamente.", "#e74c3c", "alert-circle");
    loadCartPage();
  }
};

window.totalForItem = function (id, color) {
  const itemElement = document.querySelector(`.cart-item[data-id="${id}"][data-color="${color}"]`);
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
    const authData = await checkAuth();
    
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

    const container = document.getElementById('cart-items-container');
    const countElement = document.getElementById('cart-items-count');
    const totalElement = document.getElementById('cart-total');

    if (!container || !countElement || !totalElement) return;

    let html = '';
    let total = 0;
    let totalItems = 0;

    for (const item of cart) {
        const stock = await getRealStock(item.id || item.producto_id, item.colorSeleccionado);
        if (stock <= 0) continue;

        const data = calculateItem(item, stock);

        total += data.total;
        totalItems += data.cantidad;
    
      html += `
      <div class="cart-item" data-id="${data.productId}" data-color="${data.color}">
      <a href="/product/${data.productId}${data.color ? `?color=${encodeURIComponent(data.color)}` : ''}">
        <img src="${item.imagen}" alt="${item.nombre}" class="product-imagen">
        <div class="product-info">
          <h5>${item.nombre} ${data.especificaciones}</h5>
          <b>Precio:</b>
          <span class="product-price">
            <b>$${formatPrice(data.precioFinal)}</b>
            ${data.descuento > 0 ? `
            <del class="product-old-price">$${formatPrice(data.precioAntesDescuento)}</del>
            <span class="sale">-${data.descuento.toFixed(2)}%</span>` : ''}
        </span>
          <div class="item-total">
            <span><strong>Total:</strong></span>
            $${formatPrice(data.total)}
          </div>
          </a>
        </div>
        <div class="product-items">
          <span class="label">Color</span>
          <div class="color-item">
            ${data.color ? `<span>${data.color}</span>` : '<span>No disponible</span>'}
          </div>
        </div>
        <div data-id="${data.productId}" data-color="${data.color}">
          <div class="qty-cantidad">
            <span>Cantidad</span>
            <div class="input-number product-quantity">
              <select class="input-select" 
                onchange="updateQuantity(this, 0, '${data.productId}', '${data.color}')">
                ${Array.from({length: Math.min(stock, 20)}, (_, i) =>
                  `<option value="${i+1}" ${i+1 === data.cantidad ? 'selected' : ''}>${i+1}</option>`
              ).join('')}
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-1">
          <i class="bi bi-trash remove-btn" onclick="deleteProduct('${data.productId}', '${data.color}')"></i>
        </div>
      </div>`;
    }

  container.innerHTML = html || '<p>No hay productos disponibles en el carrito.</p>';
  countElement.textContent = `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`;
  totalElement.textContent = `$${formatPrice(total)}`;

  const clearCartContainer = document.getElementById('clear-cart-container');
    if (clearCartContainer) {
        if (totalItems > 0) {
            clearCartContainer.innerHTML = `
                <button id="clear-cart-btn" class="btn btn-danger">
                    <i class="bi bi-trash"></i> Vaciar
                </button>`;
            clearCartContainer.style.display = 'block';
            document.getElementById('clear-cart-btn').addEventListener('click', handleClearCart);
        } else {
            clearCartContainer.innerHTML = '';
            clearCartContainer.style.display = 'none';
        }
    }
}

export { loadCartPage };
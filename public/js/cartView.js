import { checkAuth } from './utils.js';
import { getRealStock, updateItem } from './utils.js';
import { loadCartPreview } from './loadCartPreview.js';

window.updateQuantity = async function(element, change, productId, color) {
  try {
    const stockReal = await getRealStock(productId, color);
    
    const newQuantity = element.tagName === 'SELECT' 
      ? parseInt(element.value) : Math.max(1, parseInt(element.value) + change);
    
    const finalQuantity = Math.min(newQuantity, stockReal);
    
    await updateItem({
      productId, color, newQuantity: finalQuantity,
      element: document.querySelector(`.cart-item[data-id="${productId}"][data-color="${color}"]`)
    });

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

async function loadCartPage() {
  let cart = JSON.parse(localStorage.getItem('carrito')) || [];
  
  try {
    const authData = await checkAuth();
    if (authData.authenticated) {
      const response = await fetch('/cart/items', { credentials: 'include' });
      if (response.ok) {
        const { success, items } = await response.json();
        if (success && items) {
          cart = [...cart, ...items.filter(serverItem => 
            !cart.some(item => 
              (item.id === serverItem.producto_id || item.producto_id === serverItem.producto_id) &&
              item.colorSeleccionado === serverItem.colorSeleccionado
            )
          )];
        }
      }
    }
  } catch (error) {
    console.error("Error al obtener carrito:", error);
  }

  const container = document.getElementById('cart-items-container');
  const countElement = document.getElementById('cart-items-count');
  const totalElement = document.getElementById('cart-total');
  
  if (!container || !countElement || !totalElement) return;

  if (cart.length === 0) {
    container.innerHTML = '<p>No hay productos en el carrito.</p>';
    countElement.textContent = '0 productos';
    totalElement.textContent = '$0.00';
    return;
  }

  let html = '';
  let total = 0;
  let totalItems = 0;
  
  for (const item of cart) {
    const productId = item.id || item.producto_id;
    const color = item.colorSeleccionado;
    const stock = await getRealStock(productId, color);
    if (stock <= 0) continue;

    const price = Number(item.precio) || 0;
    const discount = Number(item.descuento) || 0;
    const finalPrice = discount > 0 ? price * (1 - discount/100) : price;
    const quantity = Math.min(item.cantidad || 1, stock);
    const itemTotal = finalPrice * quantity;
    
    total += itemTotal;
    totalItems += quantity;
    
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
              ${Array.from({length: Math.min(stock, 20)}, (_, i) => 
                `<option value="${i+1}" ${i+1 === quantity ? 'selected' : ''}>${i+1}</option>`
              ).join('')}
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-1">
        <i class="bi bi-trash remove-btn" onclick="deleteProduct('${productId}', '${color}')"></i>
      </div>
    </div>`;
  }

  container.innerHTML = html || '<p>No hay productos disponibles en el carrito.</p>';
  countElement.textContent = `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`;
  totalElement.textContent = `$${formatPrice(total)}`;
}

export { loadCartPage };
import { checkAuth } from './utils.js';
import {updateCartCount} from './cart.js'

async function getRealStock(productId, color) {
  try {
    const response = await fetch(`/api/productos/stock?id=${productId}&color=${encodeURIComponent(color)}`);
    if (!response.ok) throw new Error('Error al verificar stock');
    const data = await response.json();
    return data.stock || 0;
  } catch (error) {
    console.error('Error al obtener stock:', error);
    return 0;
  }
}

window.updateQuantity = async function updateQuantity(element, change, productId, color) {
  // Obtener stock actual
  const stockReal = await getRealStock(productId, color);
  
  let newQuantity;
  if (element.tagName === 'SELECT') {
    newQuantity = parseInt(element.value);
  } else {
    const currentValue = parseInt(element.value);
    newQuantity = Math.max(1, currentValue + change);
  }

  // Validar contra stock disponible
  newQuantity = Math.min(newQuantity, stockReal);
  
  if (newQuantity <= 0) {
    // Eliminar producto si no hay stock
    await deleteProduct(productId, color);
    return;
  }

  // Actualizar carrito local
  let cart = JSON.parse(localStorage.getItem('carrito')) || [];
  const itemIndex = cart.findIndex(item => 
    (item.id === productId || item.producto_id === productId) && 
    item.colorSeleccionado === color
  );

  if (itemIndex >= 0) {
    cart[itemIndex].cantidad = newQuantity;
    localStorage.setItem('carrito', JSON.stringify(cart));
  }

  // Sincronizar con servidor si está autenticado
  try {
    const authData = await checkAuth();
    
    if (authData.authenticated) {
      const response = await fetch('/cart/update-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          producto_id: productId,
          colorSeleccionado: color,
          cantidad: newQuantity
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al actualizar cantidad en servidor');
      }
    }
  } catch (error) {
    console.error('Error al actualizar cantidad:', error);
    // Revertir cambios locales si falla la sincronización
    if (itemIndex >= 0) {
      cart[itemIndex].cantidad = Math.max(1, newQuantity - change);
      localStorage.setItem('carrito', JSON.stringify(cart));
    }
    return;
  }

  updateItemTotalPrice(productId, color);
  updateCartTotal();
  updateCartCount(); // Asegurarse de actualizar el contador
};

function updateItemTotalPrice(id, color) {
const itemElement = document.querySelector(`.cart-item[data-id="${id}"][data-color="${color}"]`);
    if (!itemElement) return;

    const priceElement = itemElement.querySelector('.product-price b');
    const quantitySelect = itemElement.querySelector('select');
    const totalElement = itemElement.querySelector('.item-total');

    if (priceElement && quantitySelect && totalElement) {
        const priceText = priceElement.textContent.replace('Precio: $', '').trim();
        const unitPrice = parsePrice(priceText);
        const quantity = parseInt(quantitySelect.value);
        const totalPrice = unitPrice * quantity;

        totalElement.innerHTML = `<span><strong>Total:</strong></span> $${formatPrice(totalPrice)}`;
    }
}

function parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9.-]+/g,""));
}

function updateCartTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;

    items.forEach(item => {
        const totalElement = item.querySelector('.item-total');
        if (totalElement) {
            const priceText = totalElement.textContent.split('$')[1];
            const itemTotal = parsePrice(priceText);
            total += itemTotal;
        }
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
      const serverResponse = await fetch('/cart/items', { credentials: 'include' });
      if (serverResponse.ok) {
        const serverData = await serverResponse.json();
        if (serverData.success && serverData.items) {
          // Combinar carrito local con servidor
          const serverCart = serverData.items;
          const mergedCart = [...cart];
          
          serverCart.forEach(serverItem => {
            const exists = mergedCart.some(item => 
              (item.id === serverItem.producto_id || item.producto_id === serverItem.producto_id) &&
              item.colorSeleccionado === serverItem.colorSeleccionado
            );
            if (!exists) {
              mergedCart.push({
                id: serverItem.producto_id,
                producto_id: serverItem.producto_id,
                ...serverItem
              });
            }
          });
          
          cart = mergedCart;
          localStorage.setItem('carrito', JSON.stringify(mergedCart));
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

  if (cart.length > 0) {
    let html = '';
    let total = 0;
    let totalItems = 0;
    
    // Procesar cada item del carrito
    for (const item of cart) {
      const productId = item.id || item.producto_id;
      const color = item.colorSeleccionado;
      
      // Obtener stock actual para cada producto
      const stock = await getRealStock(productId, color);
      if (stock <= 0) continue; // Saltar productos agotados

      const price = Number(item.precio) || 0;
      const discount = Number(item.descuento) || 0;
      const finalPrice = discount > 0 ? price * (1 - discount/100) : price;
      const quantity = Math.min(item.cantidad || 1, stock);
      const itemTotal = finalPrice * quantity;
      
      total += itemTotal;
      totalItems += quantity;

      // Generar opciones de cantidad
      let quantityOptions = '';
      const maxQuantity = Math.min(stock, 20); // Límite máximo de 20 por producto
      for (let i = 1; i <= maxQuantity; i++) {
        quantityOptions += `<option value="${i}" ${i === quantity ? 'selected' : ''}>${i}</option>`;
      }

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
                ${quantityOptions}
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
  } else {
    container.innerHTML = '<p>No hay productos en el carrito.</p>';
    countElement.textContent = '0 productos';
    totalElement.textContent = '$0.00';
  }
}

// Función para formatear precios
function formatPrice(price) {
  return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export {loadCartPage};
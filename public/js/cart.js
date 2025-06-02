import { checkAuth } from './utils.js';
import { loadCartPage } from './cartView.js';
import { cargarCarrito } from './cartPreview.js';

window.deleteProduct = deleteProduct;
window.formatPrice = formatPrice;

async function fetchCart(action, data = {}) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    };
    return await fetch(`/cart/${action}`, options);
}

function showToast(message, backgroundColor = "#27ae60", icon = "check-circle") {
  Toastify({
    text: `<i data-feather="${icon}" style="vertical-align: middle; margin-right: 8px;"></i> ${message}`,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor,
    close: true,
    escapeMarkup: false,
    className: "toast-notification",
  }).showToast();

setTimeout(() => {
    feather.replace();
  }, 100);
}

async function addToCart(product) {
  const { id, nombre, precio, cantidad = 1, color, descuento = 0, imagen } = product;
  
  try {
    const { authenticated } = await checkAuth();
    let stockReal;

    if (authenticated) {
      // Usuario autenticado - verificar stock en el servidor
      try {
        const stockResponse = await fetch(`/cart/stock?id=${id}&color=${encodeURIComponent(color)}`);
        if (!stockResponse.ok) {
          throw new Error('Error al verificar stock');
        }
        stockReal = (await stockResponse.json()).stock || 0;
      } catch (error) {
        console.error('Error al verificar stock:', error);
        showToast("Error al verificar disponibilidad", "#e74c3c", "alert-circle");
        return;
      }
    } else {
      // Usuario no autenticado - usar el stock del botón (si está disponible)
      stockReal = product.stock || 0;
    }

    if (stockReal <= 0) {
      showToast("Este producto está agotado. Haz clic para ver otras variantes disponibles.", "#e74c3c", "info");
      return;
    }

    const safeQty = Math.min(parseInt(cantidad) || 1, stockReal);
    const cartItem = {
      id, 
      producto_id: id, 
      nombre, 
      precio, 
      cantidad: safeQty, 
      colorSeleccionado: color, 
      descuento, 
      imagen
    };

    if (!authenticated) {
      const localCart = JSON.parse(localStorage.getItem("carrito")) || [];
      const existingIndex = localCart.findIndex(
        item => (item.id === id || item.producto_id === id) && item.colorSeleccionado === color
      );

      if (existingIndex !== -1) {
        const newQty = Math.min(localCart[existingIndex].cantidad + safeQty, stockReal);
        if (newQty <= 0) {
          localCart.splice(existingIndex, 1);
        } else {
          localCart[existingIndex].cantidad = newQty;
        }
      } else {
        localCart.unshift(cartItem);
      }

      localStorage.setItem("carrito", JSON.stringify(localCart));
      showToast("Producto agregado al carrito local.", "#27ae60", "check-circle");
    } else {
      const response = await fetchCart("add", cartItem);
      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Error al agregar al carrito", "#e74c3c", "info");
        return;
      }
      
      showToast("Producto agregado al carrito.", "#27ae60", "check-circle");
    }

    setTimeout(() => (window.location.href = "/cart"), 1000);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    showToast("Error al agregar al carrito", "#e74c3c", "alert-circle");
  }
}

window.addEventListener('load', async () => {
    const localCart = JSON.parse(localStorage.getItem('carrito')) || [];
    if (!localCart.length) return;

    try {
        const { authenticated } = await checkAuth();
        if (!authenticated) return;

        const res = await fetchCart('sync', { items: localCart });
        if (res.ok) localStorage.removeItem('carrito');
    } catch (error) {
        console.error('Sync Error:', error);
    }
    cargarCarrito();
});

async function deleteProduct(id, color) {
    const itemElement = document.querySelector(`.cart-item[data-id="${id}"][data-color="${color}"]`);
    if (itemElement) { 
        itemElement.remove();
    }

    const countElement = document.querySelector('.qty-cart');
    if (countElement) {
        countElement.textContent = parseInt(countElement.textContent) - 1;
    }
    
    try {
        const { authenticated } = await checkAuth();

    if (!authenticated) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => !((item.id === id) && item.colorSeleccionado === color));
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
        await fetch('/cart/remove-item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ producto_id: id, colorSeleccionado: color }),
            credentials: 'include'
        });
    }

        await cargarCarrito();
    } catch (err) {
        console.error('Error al eliminar producto:', err);
    }
    loadCartPage();
}

function formatPrice(price) {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
    loadCartPage();
});

document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;

    const getImage = () => {
        if (btn.dataset.imagen) return btn.dataset.imagen;
        const slider = $('#product-main-img');
        return slider.length ? slider.find('.slick-current img').attr('src') : '';
    };

    await addToCart({
        id: btn.dataset.id,
        nombre: btn.dataset.nombre,
        precio: parseFloat(btn.dataset.precio),
        cantidad: document.getElementById('cantidad')?.value || 1,
        color: btn.dataset.color,
        descuento: parseFloat(btn.dataset.descuento) || 0,
        stock: parseInt(btn.dataset.stock) || 0,
        imagen: getImage()
    });
});

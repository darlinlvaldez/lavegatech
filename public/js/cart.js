async function addToCart(id, nombre, precio, cantidad, color, descuento, stock, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cantidadNumerica = parseInt(cantidad);
    
    let stockActual;
    try {
        const cantidadInput = document.getElementById('cantidad');
        stockActual = cantidadInput ? parseInt(cantidadInput.max) : stock;
    } catch {
        stockActual = stock;
    }
    
    const cantidadFinal = Math.min(cantidadNumerica, stockActual);
    
    const productoExistente = carrito.find(item => 
        item.id === id && 
        item.colorSeleccionado === color
    );

    if (productoExistente) {
        productoExistente.cantidad = Math.min(
            productoExistente.cantidad + cantidadFinal, 
            stockActual
        );
    } else {
        carrito.push({ 
            id, nombre, precio, cantidad: cantidadFinal, colorSeleccionado: color, 
            descuento, stock: stockActual, imagen
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    try {
    const response = await fetch('/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            producto_id: id,
            colorSeleccionado: color,
            cantidad: cantidadFinal,
            nombre: nombre,
            precio: precio,
            descuento: descuento,
            imagen: imagen,
            stock: stock
        }),
        credentials: 'include'
    });

    if (response.status === 401) {
        console.log('Usuario no autenticado, manteniendo datos en localStorage.');
    } else if (response.ok) {
        localStorage.removeItem('carrito');
    } else {
        const error = await response.json();
        console.error('Error al sincronizar carrito:', error.message);
    }

    } catch (error) {
        console.error('Error de red al sincronizar carrito:', error);
    }

    cargarCarrito();
    updateCart();
}

function loadCartPage() {
    if (window.location.pathname.includes('/cart')) {
        cargarCarrito();
    }
}

window.addEventListener('load', async () => {
  const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carritoLocal.length === 0) return;

  try {
    const response = await fetch('/cart/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: carritoLocal }),
      credentials: 'include'
    });

    if (response.status === 401) {
      console.log('Usuario no autenticado. Carrito local no se sincroniza.');
      return;
    }

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        localStorage.removeItem('carrito');
        await cargarCarrito();
        updateCart();
      }
    } else {
      const error = await response.json();
      console.error('Error en la sincronización del carrito:', error.message);
    }
  } catch (error) {
    console.error('Error al sincronizar carrito:', error);
  }
});

function updateCart() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contadorCarrito = document.querySelector('.qty-cart');
    contadorCarrito.textContent = carrito.length;

    cargarCarrito();
}

async function deleteProduct(id, color) {
  try {
    const carrito = (JSON.parse(localStorage.getItem('carrito')) || [])
      .filter(item => !(item.id === id && item.colorSeleccionado === color));
    localStorage.setItem('carrito', JSON.stringify(carrito));

    await fetch('/cart/remove-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto_id: id, colorSeleccionado: color }),
      credentials: 'include'
    });

  } catch (err) {
    console.error('Error al eliminar producto:', err);
  } finally {
    await cargarCarrito();
    loadCartPage();
  }
}

async function updateQuantity(input, change = 0, productId = null, color = null) {
    const max = parseInt(input.max);
    const value = input.value = Math.max(1, Math.min(parseInt(input.value) + change, max));

    if (!(productId && color)) return value;

    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const item = cart.find(i => i.id === productId && i.colorSeleccionado === color);
    if (item) {
        item.cantidad = value;
        localStorage.setItem('carrito', JSON.stringify(cart));
    }

    try {
        const res = await fetch('/cart/update-quantity', { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ itemId: productId, colorSeleccionado: color, cantidad: value }),
            credentials: 'include'
        });

        if (res.status === 401) {
            console.log('No autenticado: solo se actualizó localStorage.');
        } else if (!res.ok) {
            throw new Error('Error en el servidor al actualizar cantidad.');
        }
    } catch (err) {
        console.error('Error actualizando cantidad:', err);
    }

    await cargarCarrito();
    return value;
}

function cambiarImagen(productId, color) {
    const imagenProducto = document.getElementById('imagenProducto');
    const nuevaImagen = document.querySelector(`#product-imgs img[alt="${color}"]`);
    
    if (nuevaImagen) {
        imagenProducto.src = nuevaImagen.src;
    }
}

async function changeColor(selectOrEvent, productId) {
    const color = selectOrEvent.value;
    const encodedColor = encodeURIComponent(color);

    cambiarImagen(productId, color);

    history.replaceState({ color }, '', `/product/${productId}?color=${encodedColor}`);

    const select = document.getElementById('colorSeleccionado');
    if (select && select.value !== color) {
        select.value = color;
    }

    const stockColor = await obtenerStock(productId, color);
    const cantidadInput = document.getElementById('cantidad');

    cantidadInput.max = stockColor;
    cantidadInput.value = 1;

    document.getElementById('stockDisponible').textContent = `Cantidad disponible: ${stockColor}`;
}

async function obtenerStock(productId, color) {
    try {
        const response = await fetch(`/stock/${productId}/${encodeURIComponent(color)}`);
        if (!response.ok) {
            throw new Error(`Error al obtener stock: ${response.statusText}`);
        }
        const data = await response.json();
        return data.stock;
    } catch (error) {
        console.error('Error obteniendo stock:', error);
        return 0;
    }
}

function syncColorFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const color = urlParams.get('color');
    if (color) {
        const decodedColor = decodeURIComponent(color);
        const colorSelect = document.getElementById('colorSeleccionado');
        if (colorSelect) {
            colorSelect.value = decodedColor;
            colorSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
}

document.addEventListener('DOMContentLoaded', syncColorFromURL);

window.addEventListener('popstate', () => setTimeout(syncColorFromURL, 50));

document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
    loadCartPage();
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = btn.dataset.id;
        const nombre = btn.dataset.nombre;
        const precio = parseFloat(btn.dataset.precio);
        const descuento = parseFloat(btn.dataset.descuento) || 0;
        const stock = parseInt(btn.dataset.stock) || 0;
  
        let cantidad = 1;
        let color = btn.dataset.color || '';
        let imagen = btn.dataset.imagen || '';
  
        const cantidadInput = document.getElementById('cantidad');
        if (cantidadInput) {
          cantidad = parseInt(cantidadInput.value) || 1;
        }
        const colorSelect = document.getElementById('colorSeleccionado');
        if (colorSelect) {
          color = colorSelect.value;
        }
        const imagenProducto = document.getElementById('imagenProducto');
        if (imagenProducto) {
          imagen = imagenProducto.src;
        }
  
        addToCart(id, nombre, precio, cantidad, color, descuento, stock, imagen);
      });
    });
  
    const cantidadInput = document.getElementById('cantidad');
    const qtyUp = document.getElementById('qty-up');
    const qtyDown = document.getElementById('qty-down');
    
    if (cantidadInput && qtyUp && qtyDown) {
      qtyUp.addEventListener('click', function() {
        let value = parseInt(cantidadInput.value) || 1;
        let max = parseInt(cantidadInput.max);
        cantidadInput.value = Math.min(value + 1, max);
      });
      qtyDown.addEventListener('click', function() {
        let value = parseInt(cantidadInput.value) || 1;
        cantidadInput.value = Math.max(value - 1, 1);
      });
      cantidadInput.addEventListener('input', function() {
        let value = parseInt(cantidadInput.value) || 1;
        let max = parseInt(cantidadInput.max);
        cantidadInput.value = Math.max(1, Math.min(value, max));
      });
    }
  });  
async function addToCart(id, nombre, precio, cantidad = 1, color, descuento = 0, stock, imagen) {
    const stockActual = await obtenerStock(id, color); 

    let authenticated = false;
    try {
        const res = await fetch('/api/auth/status', { method: 'GET', credentials: 'include' });
        const data = await res.json();
        authenticated = !!data.authenticated;
    } catch (e) {
        console.error('Error autenticación:', e);
    }

    if (!authenticated) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const cantidadFinal = parseInt(cantidad) || 1;
        const producto = carrito.find(p => p.id === id && p.colorSeleccionado === color);

        if (producto) {
            producto.cantidad = Math.min(producto.cantidad + cantidadFinal, stockActual);
        } else {
            carrito.push({ id, nombre, precio, cantidad: cantidadFinal, 
                colorSeleccionado: color, descuento, stock: stockActual, imagen});
        }
        
        window.location.href = '/cart';
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito(); 
        return;
    }

    try {
        const res = await fetch('/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ producto_id: id, nombre, precio, cantidad, 
                colorSeleccionado: color, descuento, stock: stockActual, imagen })
        });

        if (!res.ok) throw new Error('Error al agregar al carrito');
        
        window.location.href = '/cart';
        await cargarCarrito();
    } catch (e) {
        console.error('Error:', e);
    }
}

window.addEventListener('load', async () => {
    const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
    if (!carritoLocal.length) return;

    try {
        const res = await fetch('/api/auth/status', { method: 'GET', credentials: 'include' });
        const data = await res.json();

        if (!data.authenticated) return console.log('No autenticado. No se sincroniza carrito.');

        const syncRes = await fetch('/cart/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ items: carritoLocal }),
            credentials: 'include'
        });

        const result = await syncRes.json();
        if (syncRes.ok && result.success) {
            localStorage.removeItem('carrito'); 
            await cargarCarrito();
        } else {
            console.error('Sync fallida:', result.message);
        }
    } catch (e) {
        console.error('Error al sincronizar:', e);
    }
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
        const res = await fetch('/api/auth/status', { credentials: 'include' });
        const { authenticated } = await res.json();

        if (!authenticated) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito = carrito.filter(item => 
                !((item.id === id || item.producto_id === id) && 
                item.colorSeleccionado === color)
            );
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
    const cantidadSelect = document.getElementById('cantidad');
    
    cantidadSelect.innerHTML = '';
    
    const maxOptions = Math.min(stockColor); 
    for(let i = 1; i <= maxOptions; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        cantidadSelect.appendChild(option);
    }

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
        if (colorSelect) {colorSelect.value = decodedColor;
            colorSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
}

document.addEventListener('DOMContentLoaded', syncColorFromURL);

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
      let color = btn.dataset.color;
      let imagen = btn.dataset.imagen;

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
});  
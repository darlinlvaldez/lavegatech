async function addToCart(id, nombre, precio, cantidad = 1, color, descuento = 0, stock, imagen) {
    const stockActual = window.productData?.stocksPorColor?.[color];

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

        if (!data.authenticated) return //console.log('No autenticado. No se sincroniza carrito.');

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
            !((item.id === id) && item.colorSeleccionado === color));
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
    const slickInstance = $('#product-main-img').slick('getSlick');
    const slides = $('#product-main-img img');

    for (let i = 0; i < slides.length; i++) {
        if (slides[i].alt === color) {
            slickInstance.slickGoTo(i);
            break;
        }
    }
}

async function changeColor(selectOrEvent, productId) {
  let color;
  
  if (typeof selectOrEvent === 'object' && 'value' in selectOrEvent) {
    color = selectOrEvent.value;
  } else if (typeof selectOrEvent === 'string') {
    color = selectOrEvent;
  } else { return;
  }

  const encodedColor = encodeURIComponent(color);

  if ($('#colorSeleccionado').val() !== color) {
    $('#colorSeleccionado').val(color);
  }

  cambiarImagen(productId, color);

  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.dataset.color = color;
  }
  
  history.replaceState({ color }, '', `/product/${productId}?color=${encodedColor}`);

  const stockColor = window.productData.stocksPorColor[color] || 0;

  const cantidadSelect = document.getElementById('cantidad');
  if (cantidadSelect) {
    cantidadSelect.innerHTML = '';
    const maxOptions = Math.min(stockColor); 
    for(let i = 1; i <= maxOptions; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      cantidadSelect.appendChild(option);
    }
  }

  const stockElement = document.getElementById('stockDisponible');
  if (stockElement) {
    stockElement.textContent = `Cantidad disponible: ${stockColor}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const productRoot = document.getElementById('product-root');
    
    window.productData = {
        stocksPorColor: JSON.parse(productRoot.dataset.productStocks || '{}'),
        productId: productRoot.dataset.productId
    };
});

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
      const color = btn.dataset.color;

      let cantidad = 1;
      let imagen = btn.dataset.imagen;
    
      if (!imagen) {
        const currentSlide = $('#product-main-img').slick('slickCurrentSlide');
        const currentImg = $('#product-main-img .slick-slide').eq(currentSlide).find('img');
        if (currentImg.length) {
          imagen = currentImg.attr('src');
        }
    }
    
    const cantidadInput = document.getElementById('cantidad');
    if (cantidadInput) {
        cantidad = parseInt(cantidadInput.value);
    }

      addToCart(id, nombre, precio, cantidad, color, descuento, stock, imagen); 
    });
  });
});  
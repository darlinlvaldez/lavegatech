async function addToCart(id, nombre, precio, cantidad = 1, color, descuento = 0, stock, imagen) {
    const stockDisponible = window.productData?.stocksPorColor?.[color] || stock || 1;
    const cantidadFinal = Math.min(parseInt(cantidad) || 1, stockDisponible);

    try {
        const authRes = await fetch('/api/auth/status', { 
            method: 'GET', 
            credentials: 'include' 
        });
        const authData = await authRes.json();
        const authenticated = !!authData.authenticated;

        if (!authenticated) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const productoExistente = carrito.find(p => p.id === id && p.colorSeleccionado === color);

            if (productoExistente) {
                productoExistente.cantidad = Math.min(
                    productoExistente.cantidad + cantidadFinal, 
                    stockDisponible);
            } else {carrito.push({id, nombre, precio, cantidad: cantidadFinal, colorSeleccionado: color, 
                descuento, stock: stockDisponible, imagen});
            }
            
            localStorage.setItem('carrito', JSON.stringify(carrito));
            await cargarCarrito();
            window.location.href = '/cart';
            return;
        }

        const res = await fetch('/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({producto_id: id, nombre, precio, cantidad: cantidadFinal,
                colorSeleccionado: color, descuento, stock: stockDisponible, imagen})
            });
            
            if (!res.ok) {const errorData = await res.json();
            throw new Error(errorData.message || 'Error al agregar al carrito');
        } 
        
        await cargarCarrito();
        window.location.href = '/cart';
    } catch (error) {console.error('Error en addToCart:', error);
        console.error('Error en addToCart:', error);
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

function formatPrice(price) {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();
    loadCartPage();
});

document.addEventListener('click', function(event) {
    const btn = event.target.closest('.add-to-cart-btn');
    if (!btn) return;

    const id = btn.dataset.id;
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);
    const descuento = parseFloat(btn.dataset.descuento) || 0;
    const stock = parseInt(btn.dataset.stock) || 0;
    const color = btn.dataset.color;
    let imagen = btn.dataset.imagen;

    // Solo busca la imagen en slides si es necesario (para páginas de producto)
    if (!imagen && $('#product-main-img').length) {
        const currentSlide = $('#product-main-img').slick('slickCurrentSlide');
        const currentImg = $('#product-main-img .slick-slide').eq(currentSlide).find('img');
        if (currentImg.length) imagen = currentImg.attr('src');
    }

    let cantidad = 1;
    const cantidadInput = document.getElementById('cantidad');
    if (cantidadInput) cantidad = parseInt(cantidadInput.value);

    addToCart(id, nombre, precio, cantidad, color, descuento, stock, imagen);
});
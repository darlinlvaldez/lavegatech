import { checkAuth } from './utils.js';

async function cargarCarrito() {
    let carrito = [];
    const cartList = document.getElementById('cart-list');
    const carritoCount = document.getElementById('carrito-count');
    const cartSummary = document.getElementById('cart-summary');
    const cartSubtotal = document.getElementById('cart-subtotal');

    // 1. Primero intentar con el carrito del servidor (solo si autenticado)
    try {
        const authData = await checkAuth();
        if (authData.authenticated) {
            const res = await fetch('/cart/items', { 
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            // Verificar si la respuesta es JSON
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await res.json();
                if (data.success && Array.isArray(data.items)) {
                    carrito = await processCartItems(data.items, true);
                }
            } else {
                // Si no es JSON, probablemente es un error o redirección
                const text = await res.text();
                console.error('Respuesta inesperada del servidor:', text.substring(0, 100));
            }
        }
    } catch (error) {
        console.error('Error al cargar carrito del servidor:', error);
    }

    // 2. Si no hay carrito del servidor, usar localStorage
    if (carrito.length === 0) {
        const localCart = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = await processCartItems(localCart, false);
    }

    // 3. Mostrar carrito
    renderCart(carrito, cartList, carritoCount, cartSummary, cartSubtotal);
}

async function processCartItems(items, isServerCart) {
    const verifiedItems = [];
    
    for (const item of items) {
        try {
            const productId = item.id || item.producto_id;
            const color = item.colorSeleccionado || item.colorSeleccionado;
            
            if (!productId) continue;

            const stockRes = await fetch(`/api/productos/stock?id=${productId}&color=${encodeURIComponent(color)}`);
            const stockData = await stockRes.json();
            
            if (stockData.stock > 0) {
                verifiedItems.push(item);
            } else if (isServerCart) {
                // Solo intentar eliminar si es del servidor
                try {
                    await fetch('/cart/remove-item', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            producto_id: productId,
                            colorSeleccionado: color
                        }),
                        credentials: 'include'
                    });
                } catch (error) {
                    console.error('Error al eliminar producto agotado:', error);
                }
            }
        } catch (error) {
            console.error('Error al verificar stock:', error);
            verifiedItems.push(item); // Mantener el item si hay error
        }
    }

    // Para el carrito local, filtrar después de verificar
    if (!isServerCart) {
        const localCart = JSON.parse(localStorage.getItem('carrito')) || [];
        const newCart = localCart.filter(item => 
            verifiedItems.some(vi => 
                (vi.id === item.id || vi.producto_id === item.id) && 
                vi.colorSeleccionado === item.colorSeleccionado
            )
        );
        localStorage.setItem('carrito', JSON.stringify(newCart));
    }

    return verifiedItems;
}

function renderCart(carrito, cartList, carritoCount, cartSummary, cartSubtotal) {
    if (carrito.length === 0) {
        if (cartList) cartList.innerHTML = '<p>No hay productos en el carrito.</p>';
        if (carritoCount) carritoCount.textContent = '0';
        if (cartSummary) cartSummary.textContent = '0 producto(s) seleccionado(s)';
        if (cartSubtotal) cartSubtotal.textContent = 'SUBTOTAL: $0.00';
        return;
    }

    let total = 0;
    let html = '';

    carrito.forEach(item => {
        const precio = parseFloat(item.precio) || 0;
        const descuento = parseFloat(item.descuento) || 0;
        const precioConDescuento = descuento > 0 ? precio * (1 - descuento / 100) : precio;
        total += precioConDescuento * item.cantidad;

        const productId = item.id || item.producto_id;
        const color = item.colorSeleccionado || item.colorSeleccionado;

        html += `
            <div class="product-widget">
                <a href="/product/${productId}${color ? `?color=${encodeURIComponent(color)}` : ''}">
                    <div class="product-img">
                        <img src="${item.imagen}" alt="${item.nombre}">
                    </div>
                    <div class="product-body">
                        <h3 class="product-nombres">${item.nombre}</h3></a>
                        <h4 class="product-precios">
                            <span class="qty-cart">${item.cantidad}x</span> 
                            $${formatPrice(precioConDescuento)}
                        </h4>
                    </div>
                    <button class="delete" onclick="deleteProduct('${productId}', '${color}')">
                        <i class="fa fa-close"></i>
                    </button>
            </div>
        `;
    });

    if (cartList) cartList.innerHTML = html;
    if (carritoCount) carritoCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (cartSummary) cartSummary.textContent = `${carrito.length} producto(s) seleccionado(s)`;
    if (cartSubtotal) cartSubtotal.textContent = `SUBTOTAL: $${formatPrice(total)}`;
}

export { cargarCarrito };
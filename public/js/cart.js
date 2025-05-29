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

async function addToCart(product) {
    const { id, nombre, precio, cantidad = 1, color, descuento = 0, stock, imagen } = product;
    const safeStock = window.productData?.stocksPorColor?.[color] || stock || 0;

    if (safeStock <= 0) {
        Toastify({
            text: "Este producto no está disponible en el color seleccionado.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#e74c3c",
            stopOnFocus: true
        }).showToast();
        return;
    }

    const safeQty = Math.min(parseInt(cantidad), safeStock);

    const cartItem = {
        producto_id: id, nombre, precio, cantidad: safeQty, 
        colorSeleccionado: color, descuento, stock: safeStock,imagen
    };

    try {
        const { authenticated } = await checkAuth();

        if (!authenticated) {
            const localCart = JSON.parse(localStorage.getItem('carrito')) || [];
            const existing = localCart.find(item => item.id === id && item.colorSeleccionado === color);

            if (existing) {
                existing.cantidad = Math.min(existing.cantidad + safeQty, safeStock);
            } else {
                localCart.unshift({ ...cartItem, id });
            }

            localStorage.setItem('carrito', JSON.stringify(localCart));
        } else {
            await fetchCart('add', cartItem);
        }

        Toastify({
            text: "Producto agregado al carrito.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#27ae60",
            stopOnFocus: true
        }).showToast();

        setTimeout(() => {
            window.location.href = '/cart';
        }, 800); 
    } catch (error) {
        console.error('Checkout Error:', error);
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
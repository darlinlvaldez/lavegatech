import { fetchFav, checkAuth, updateFavCount } from './utils.js';
import { removeFromFav, loadFavPage } from './favView.js';

window.removeFromFav = removeFromFav;

async function toggleFavorite(button) {
    if (button.disabled) return;
    button.disabled = true;

    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = button.getAttribute('data-product-price');
    const productDiscount = button.getAttribute('data-product-discount');
    const productImage = button.getAttribute('data-product-image');
    const colorSelected = button.dataset.productColor || document.querySelector('.color-selected')?.textContent || null;
    const isAlreadyAdded = button.classList.contains('added');

    try {
        const authData = await checkAuth();
        if (!authData.authenticated) {
            return;
        }

        if (isAlreadyAdded) {
            await removeFromFav(productId, colorSelected);
            button.classList.remove('added');
            button.innerHTML = '<i class="fa fa-heart-o"></i><span class="tooltipp">Lista de deseo</span>';
        } else {
            await fetchFav('/fav/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    producto_id: productId,
                    colorSeleccionado: colorSelected,
                    nombre: productName,
                    precio: productPrice,
                    descuento: productDiscount,
                    imagen: productImage
                })
            });

            button.classList.add('added');
            button.innerHTML = '<i class="fa fa-heart"></i><span class="tooltipp">Agregado</span>';
        }

        await checkFavorites();
    } catch (error) {
        console.error('Error en toggleFavorite:', error);
    } finally {
        button.disabled = false;
    }
}

async function checkFavorites() {
    try {
        const authData = await checkAuth();
        let favorites = [];
        
        if (authData.authenticated) {
            const data = await fetchFav('/fav/items');
            if (data.success && data.items) favorites = data.items;
        }

        document.querySelectorAll('.add-to-wishlist').forEach(button => {
            const productId = button.getAttribute('data-product-id');
            const color = button.dataset.productColor || null;
            const isFav = favorites.some(item => item.id == productId && item.colorSeleccionado == color);
            
            if (isFav) {
                button.innerHTML = '<i class="fa fa-heart"></i><span class="tooltipp">Agregado</span>';
                button.classList.add('added');
            }
        });

        updateFavCount(favorites.length);
    } catch (error) {
        console.error("Error al verificar favoritos:", error);
        updateFavCount(0);
    }
}

function setupEventListeners() {
    document.querySelectorAll('[name="color"], .color-option').forEach(element => {
        element.addEventListener('click', function() {
            const selectedColor = this.value || this.textContent;
            document.querySelector('.add-to-wishlist').dataset.productColor = selectedColor;
        });
    });

    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', () => toggleFavorite(button));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadFavPage();
    checkFavorites();
});
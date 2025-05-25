import { fetchFav, checkAuth, updateFavCount } from './utils.js';
import { removeFromFav, loadFavPage } from './favView.js';

window.removeFromFav = removeFromFav;

const setButtonState = (button, isFavorite) => {
    const icon = isFavorite ? 'fa-heart' : 'fa-heart-o';
    const tooltip = isFavorite ? 'Agregado' : 'Favoritos';
    button.innerHTML = `<i class="fa ${icon}"></i><span class="tooltipp">${tooltip}</span>`;
    if (isFavorite) {
        button.classList.add('added');
    } else {
        button.classList.remove('added');
    }
};

async function toggleFavorite(button) {
    if (button.disabled) return;
    button.disabled = true;

    try {
        const productId = button.dataset.productId;
        const productName = button.dataset.productName;
        const productPrice = button.dataset.productPrice;
        const productDiscount = button.dataset.productDiscount;
        let productImage = button.dataset.productImage;
        const colorSelected = button.dataset.productColor;
        const isAlreadyAdded = button.classList.contains('added');

        if (!productImage && document.getElementById('product-main-img')) {
            const slider = $('#product-main-img');
            if (slider.length) productImage = slider.find('.slick-current img').attr('src');
        }

        const authData = await checkAuth();
        if (!authData.authenticated) {
            window.location.href = "/login"; 
            return;
        }

        if (isAlreadyAdded) {
            await removeFromFav(productId, colorSelected);
            setButtonState(button, false);
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
                    imagen: productImage,
                    stockPorColor: window.productData?.stocksPorColor?.[colorSelected] || 1
                })
            });
            setButtonState(button, true);
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
            const productId = button.dataset.productId;
            const currentColor = button.dataset.productColor;
            const isFav = favorites.some(item => 
                item.id == productId && item.colorSeleccionado == currentColor
            );
            setButtonState(button, isFav);
        });
        updateFavCount(favorites.length);
    } catch (error) {
        console.error("Error al verificar favoritos:", error);
        updateFavCount(0);
    }
}

function setupEventListeners() {
    document.querySelectorAll('[name="color"], .color-option, #colorSeleccionado').forEach(element => {
        element.addEventListener('change', function() {
            const selectedColor = this.value || this.textContent || this.dataset.color;
            document.querySelectorAll('.add-to-wishlist').forEach(button => {
                button.dataset.productColor = selectedColor;
            });
            checkFavorites();
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

export { checkFavorites };
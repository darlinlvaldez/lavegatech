import { fetchFav, checkAuth, updateFavCount } from './utils.js';
import { loadFavPage } from './loadFavPage.js';

window.removeFromFav = removeFromFav;

const setButtonState = (button, isFavorite) => {
    const iconClass = isFavorite ? 'fa-solid' : 'fa-regular';
    const iconName = 'fa-heart';
    const tooltip = isFavorite ? 'Agregado' : 'Favoritos';
    button.innerHTML = `<i class="${iconClass} ${iconName}"></i><span class="tooltipp">${tooltip}</span>`;
    
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
        const color = button.dataset.productColor;
        const isAlreadyAdded = button.classList.contains('added');

        const authData = await checkAuth();
        if (!authData.authenticated) {
            window.location.href = "/login"; 
            return;
        }

        if (isAlreadyAdded) {
            await removeFromFav(productId, color);
            setButtonState(button, false);
        } else {
            await fetchFav('/fav/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    producto_id: productId,
                    colorSeleccionado: color
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
                item.producto_id == productId && item.colorSeleccionado == currentColor
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
            const selectedColor = this.dataset.color;
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

async function removeFromFav(productId, color, varianteId) {
  const authData = await checkAuth();
  if (!authData.authenticated) return;

  try {
    const data = await fetchFav('/fav/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        producto_id: productId, 
        colorSeleccionado: color,
        variante_id: varianteId
      })
    });

    if (data.success) {
      updateFavCount(data.count || 0);
      loadFavPage();
    }
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error);
  }
}


export { checkFavorites };
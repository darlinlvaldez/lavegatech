import { apiFetch, getAuthStatus } from '../../store/fav/apiFav.js';
import { loadFavPage } from './loadFavPage.js';

window.removeFromFav = removeFromFav;
window.toggleFavorite = toggleFavorite;

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
    const productId = Number(button.dataset.productId);
    const variantId = Number(button.dataset.variantId);
    const isAlreadyAdded = button.classList.contains('added');

    if (!Number.isInteger(productId) || !Number.isInteger(variantId)) {
      return;
    }

    const authData = await getAuthStatus();
    if (!authData.authenticated) {
      window.location.href = "/login";
      return;
    }

    if (isAlreadyAdded) {
      await removeFromFav(productId, variantId);
      setButtonState(button, false);
    } else {
      await apiFetch('/api/fav/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, variantId })
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
    const authData = await getAuthStatus();
    let favorites = [];

    if (authData.authenticated) {
      const data = await apiFetch('/api/fav/items');
      if (data.success && data.items) {
        favorites = data.items;
      }
    }

    document.querySelectorAll('.add-to-wishlist').forEach(button => {
      const productId = Number(button.dataset.productId);
      const variantId = Number(button.dataset.variantId);

      const isFav = favorites.some(item =>
        item.productId === productId && item.variantId === variantId
      );

      setButtonState(button, isFav);
    });

    updateFavCount(favorites.length);
  } catch (error) {
    console.error("Error al verificar favoritos:", error);
    updateFavCount(0);
  }
}

async function removeFromFav(productId, variantId) {
  const authData = await getAuthStatus();
  if (!authData.authenticated) return;

  try {
    const data = await apiFetch('/api/fav/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, variantId })
    });

    if (data.success) {
      updateFavCount(data.count || 0);
      loadFavPage();
    }
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFavPage();
  checkFavorites();

  document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', () => toggleFavorite(button));
  });
});

export function updateFavCount(count) {
    document.querySelectorAll('.qty-fav').forEach(el => el.textContent = count);
}

export { checkFavorites };
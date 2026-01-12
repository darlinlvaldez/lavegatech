import { getAuthStatus } from '../../store/fav/apiFav.js';
import { loadCartPreview } from './loadCartPreview.js';
import { loadCartPage } from './cartView.js';

async function deleteProduct(variantId) {
  try {
    const { authenticated } = await getAuthStatus();

    if (!authenticated) {
      let cart = JSON.parse(localStorage.getItem("carrito")) || [];
      cart = cart.filter(item => item.variantId !== variantId);
      localStorage.setItem("carrito", JSON.stringify(cart));
    } else {
      await fetch("/cart/remove-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
        credentials: "include",
      });
    }

    await loadCartPreview();
    loadCartPage();

  } catch (err) {
    console.error("Error al eliminar producto:", err);
  }
}

window.deleteProduct = deleteProduct;

export { deleteProduct };
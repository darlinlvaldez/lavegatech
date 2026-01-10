import { checkAuth } from '../../utils/utils.js';
import { loadCartPreview } from './loadCartPreview.js';
import { loadCartPage } from './cartView.js';

async function deleteProduct(id, color) {
  try {
    const { authenticated } = await checkAuth();

    if (!authenticated) {
      let cart = JSON.parse(localStorage.getItem("carrito")) || [];
      cart = cart.filter(
        item => !(item.productId === id && item.selectedColor === color)
      );
      localStorage.setItem("carrito", JSON.stringify(cart));
    } else {
      await fetch("/cart/remove-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, selectedColor: color }),
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
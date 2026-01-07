import { checkAuth } from '../../utils/utils.js';
import { loadCartPreview } from './loadCartPreview.js';
import { loadCartPage } from './cartView.js';

async function deleteProduct(id, color) {
  try {
    const { authenticated } = await checkAuth();

    if (!authenticated) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito = carrito.filter(
        item => !(item.productId === id && item.selectedColor === color)
      );
      localStorage.setItem("carrito", JSON.stringify(carrito));
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
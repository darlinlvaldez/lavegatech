import { getAuthStatus } from '../../store/fav/apiFav.js';
import { loadCartPage } from "./cartView.js";
import { loadCartPreview } from "./loadCartPreview.js";
import { showToast } from "../../utils/toastify.js";

export async function fetchCart(action, data = {}) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };

  return await fetch(`/api/cart/${action}`, options);
}

async function addToCart(product) {
  const { id, variantId, color, quantity = 1, name,  price,
    image, specs, discount, tax, stock } = product;

  try {
    const requestedQty = Math.max(1, parseInt(quantity) || 1);

    if (stock <= 0) {
      showToast("Producto agotado", "info");
      return;
    }

    const safeQty = Math.min(requestedQty, stock);

    const cartItem = { productId: id, variantId, selectedColor: color, quantity: safeQty, 
      name, price, tax: tax || 0, discount: discount || 0, realStock: stock, image, specs };

    const { authenticated } = await getAuthStatus();

    if (!authenticated) {
      const localCart = JSON.parse(localStorage.getItem("carrito")) || [];

      const existingIndex = localCart.findIndex(
        item => item.variantId === variantId
      );

      if (existingIndex !== -1) {
        localCart[existingIndex].quantity += safeQty;
      } else {
        localCart.unshift(cartItem);
      }

      localStorage.setItem("carrito", JSON.stringify(localCart));
    } else {
      const response = await fetchCart("add", cartItem);
      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "No se pudo agregar", "error");
        return;
      }
    }

    sessionStorage.setItem(
      "toastSuccess",
      JSON.stringify({ message: "Agregado al carrito" })
    );

    window.location.href = "/api/cart";

  } catch (err) {
    console.error(err);
    showToast("Ha ocurrido un error. Inténtelo de nuevo.", "error");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadCartPreview();
  loadCartPage();
});

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".add-to-cart-btn");
  if (!btn) return;

  const getImage = () => {
    const slider = $("#product-main-img");
    if (!slider.length) return "";

    const currentImg = slider.find(".slick-current img");
    return currentImg.length ? currentImg.attr("src") : "";
  };

  await addToCart({
    id: btn.dataset.id,
    variantId: btn.dataset.variantId,
    specs: btn.dataset.specs,
    quantity: document.getElementById("productQuantity")?.value || 1,
    color: btn.dataset.color,
    stock: parseInt(btn.dataset.stock) || 0,
    name: btn.dataset.name,
    price: parseFloat(btn.dataset.price),
    discount: parseFloat(btn.dataset.discount) || 0,
    tax: parseFloat(btn.dataset.tax) || 0,
    image: getImage(),
  });
});
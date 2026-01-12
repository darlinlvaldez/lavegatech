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

  return await fetch(`/cart/${action}`, options);
}

async function addToCart(product) {
  const { id, variantId, color, quantity = 1, name, price, image, specs, discount, tax } = product;

  try {
    const { authenticated } = await getAuthStatus();
    let stockReal;

    if (authenticated) {
      const stockResponse = await fetch(
        `/cart/stock?variantId=${variantId}`
      );
      if (!stockResponse.ok) throw new Error();
      stockReal = (await stockResponse.json()).stock || 0;
    } else {
      const colorStock = window.productData?.stockByColor?.[color];
      stockReal = colorStock !== undefined ? colorStock : product.stock || 0;
    }

    if (stockReal <= 0) {
      showToast("Este producto está agotado", "#e74c3c", "info");
      return;
    }

    const safeQty = Math.min(parseInt(quantity) || 1, stockReal);

    const cartItem = { productId: id, variantId, selectedColor: color, 
      quantity: safeQty, name, price, tax: tax || 0, 
      discount: discount || 0, image, specs };

    if (!authenticated) {
      const localCart = JSON.parse(localStorage.getItem("carrito")) || [];
      const existingIndex = localCart.findIndex(
        (item) => item.productId === id && item.variantId === variantId
      );

      if (existingIndex !== -1) {
        const newQty = Math.min(
          localCart[existingIndex].quantity + safeQty,
          stockReal
        );
        if (newQty <= 0) {
          localCart.splice(existingIndex, 1);
        } else {
          localCart[existingIndex].quantity = newQty;
        }
      } else {
        localCart.unshift(cartItem);
      }

      localStorage.setItem("carrito", JSON.stringify(localCart));
    } else {
      const response = await fetchCart("add", cartItem);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
    }

    showToast("Producto agregado al carrito.", "#27ae60", "check-circle");
    setTimeout(() => (window.location.href = "/cart"), 1000);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    showToast( "Ocurrió un error al procesar tu solicitud. Intenta de nuevo.",
      "#e74c3c", "alert-circle"
    );
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
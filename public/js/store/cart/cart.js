import { checkAuth } from "../../utils/utils.js";
import { loadCartPage } from "./cartView.js";
import { loadCartPreview } from "./cartPreview.js";
import { showToast } from "../../utils/toastify.js";

window.deleteProduct = deleteProduct;

async function fetchCart(action, data = {}) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };

  return await fetch(`/cart/${action}`, options);
}

async function addToCart(product) {
  const { id, variantId, color, quantity = 1, name, price, image, ram, storage, discount, tax } = product;

  try {
    const { authenticated } = await checkAuth();
    let stockReal;

    if (authenticated) {
      const stockResponse = await fetch(
        `/cart/stock?id=${id}&color=${encodeURIComponent(color)}`
      );
      if (!stockResponse.ok) throw new Error();
      stockReal = (await stockResponse.json()).stock || 0;
    } else {
      const colorStock = window.productData?.stockByColor?.[color];
      stockReal = colorStock !== undefined ? colorStock : product.stock || 0;
    }

    if (stockReal <= 0) {
      showToast("Este producto está agotado. Haz clic para ver otras variantes disponibles.",
        "#e74c3c", "info");
      return;
    }

    const safeQty = Math.min(parseInt(quantity) || 1, stockReal);

    const cartItem = { productId: id, variantId, selectedColor: color, 
      quantity: safeQty, name, price, tax: tax || 0, 
      discount: discount || 0, image, ram, storage };

    if (!authenticated) {
      const localCart = JSON.parse(localStorage.getItem("carrito")) || [];
      const existingIndex = localCart.findIndex(
        (item) => item.productId === id && item.selectedColor === color
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

window.addEventListener("load", async () => {
  const localCart = JSON.parse(localStorage.getItem("carrito")) || [];
  if (!localCart.length) return;

  try {
    const { authenticated } = await checkAuth();
    if (!authenticated) return;

    const res = await fetchCart("sync", { items: localCart }); 

    if (res.ok) {
      localStorage.removeItem("carrito"); 
    }
  } catch (error) {
    console.error("Sync Error:", error);
  }

  loadCartPreview();
});

async function deleteProduct(id, color) {
  const itemElement = document.querySelector(
    `.cart-item[data-id="${id}"][data-color="${color}"]`
  );
  if (itemElement) {
    itemElement.remove();
  }

  const countElement = document.querySelector(".qty-cart");
  if (countElement) {
    countElement.textContent = parseInt(countElement.textContent) - 1;
  }

  try {
    const { authenticated } = await checkAuth();

    if (!authenticated) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito = carrito.filter(
        (item) => !(item.productId === id && item.selectedColor === color)
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
  } catch (err) {
    console.error("Error al eliminar producto:", err);
  }
  loadCartPage();
}

document.addEventListener("DOMContentLoaded", function () {
  loadCartPreview();
  loadCartPage();
});

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".add-to-cart-btn");
  if (!btn) return;

  const getImage = () => {
    if (btn.dataset.image) return btn.dataset.image;
    const slider = $("#product-main-img");
    return slider.length ? slider.find(".slick-current img").attr("src") : "";
  };

  await addToCart({
    id: btn.dataset.id,
    variantId: btn.dataset.variantId,
    ram: btn.dataset.ram,
    storage: btn.dataset.storage,
    quantity: document.getElementById("quantity")?.value || 1,
    color: btn.dataset.color,
    stock: parseInt(btn.dataset.stock) || 0,
    name: btn.dataset.name,
    price: parseFloat(btn.dataset.price),
    discount: parseFloat(btn.dataset.discount) || 0,
    tax: parseFloat(btn.dataset.tax) || 0,
    image: getImage(),
  });
});
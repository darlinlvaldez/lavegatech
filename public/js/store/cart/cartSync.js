import { loadCartPreview } from "./loadCartPreview.js";
import { checkAuth } from "../../utils/utils.js";
import { fetchCart } from "./cart.js";

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
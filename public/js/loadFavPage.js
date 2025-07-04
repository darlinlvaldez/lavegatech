import { fetchFav, checkAuth } from "./utils.js";
import { generateFavItemHTML } from "./favView.js";
import { handleClearFav } from "./fav.js";

async function loadFavPage() {
  try {
    const authData = await checkAuth();
    let favItems = [];

    if (authData.authenticated) {
      const data = await fetchFav("/fav/items");
      if (data.success) {
        favItems = data.items;
      }
    }

    const favContainer = document.getElementById("fav-items-container");
    if (!favContainer) return;

    const clearFavContainer = document.getElementById("clear-fav-container");

    if (favItems.length > 0) {
      clearFavContainer.innerHTML = `
      <button id="clear-fav-btn" class="btn btn-danger">
      <i class="bi bi-trash"></i> Vaciar
      </button>`;

      clearFavContainer.style.display = "block";

      document.getElementById("clear-fav-btn").addEventListener("click", handleClearFav);

      favContainer.innerHTML = favItems.map((item) => generateFavItemHTML(item)).join("");
    } else {
      clearFavContainer.innerHTML = "";
      clearFavContainer.style.display = "none";
      favContainer.innerHTML = "<p>No hay productos en tu lista de deseos.</p>";
    }

    document.getElementById("fav-items-count").textContent = `${favItems.length} 
    ${favItems.length === 1 ? "producto" : "productos"}`;
  } catch (error) {
    console.error("Error loading fav page:", error);
  }
}

export { loadFavPage };
import { fetchFav, checkAuth, updateFavCount } from "./utils.js";

async function loadFavPage() {
    const container = document.getElementById('fav-items-container');
    const countElement = document.getElementById('fav-items-count');
    if (!container || !countElement) return;

    let favs = [];
    const authData = await checkAuth();

    if (authData.authenticated) {
      try {
        const serverData = await fetchFav("/fav/items");
        if (serverData.success && serverData.items) favs = serverData.items;
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      }
    }
  
    updateFavCount(favs.length);
    renderButton(favs);
}

export { loadFavPage };
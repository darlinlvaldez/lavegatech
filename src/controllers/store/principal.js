import principal from '../../models/principal.js';
import rating from "../../models/rating.js";

principal.productosController = async (req, res) => {
  try {
    const { categoria } = req.query;
    
    const productos = await principal.obtenerProductos(categoria);
    const categorias = await principal.obtenerCategorias();
    const recomendados = await principal.obtenerRecomendados();
    
    const listas = [productos, recomendados];

    for (let lista of listas) {
      for (let producto of lista) {
        const avg = await rating.getAverageRating(producto.id);
        producto.averageRating = parseFloat(avg) || 0;
        
        producto.esMovil = producto.categoria?.toLowerCase() === "moviles";
      }
    }

    res.render("index", { productos, categorias, recomendados });
  } catch (err) {
    console.error("Error al obtener datos", err);
    res.status(500).send("Error al cargar los datos.");
  }
};

principal.searchController = async (req, res) => {
  try {
      const { q: query } = req.query;
      const productos = await principal.buscarProductos(query);
      res.json(productos);
  } catch (error) {
      console.error('Error en la búsqueda:', error);
      res.status(500).json({ error: 'Error en la búsqueda' });
  }
}

export default principal;
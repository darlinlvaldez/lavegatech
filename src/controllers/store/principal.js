import principal from '../../models/store/principal.js';
import { filterRecentProducts } from '../../utils/filterRecent.js';

principal.productosController = async (req, res) => {
  try {
    const { categoria } = req.query;
    
    const productos = await principal.obtenerProductos(categoria);
    const categorias = await principal.obtenerCategorias();
    const recomendados = await principal.obtenerRecomendados();
    const productosRecientes = filterRecentProducts(productos, 30);
    
     productos.forEach((p) => {
       p.esMovil = p.categoria?.toLowerCase() === "moviles";
     });

    res.render("index", { productos, categorias, recomendados, productosRecientes });
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
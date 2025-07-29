import store from '../models/store.js';
import rating from "../models/rating.js";
import db from "../database/mobiles.js";

store.storeController = async (req, res) => {
  try {
    // Parámetros de filtro (igual que antes)
    const pagina = req.params.pagina ? parseInt(req.params.pagina) : 1;
    const limite = req.query.limite ? parseInt(req.query.limite) : 9;
    const orden = req.query.orden ? parseInt(req.query.orden) : 0;
    const categorias = req.query.categoria ? req.query.categoria.split(',').map(Number) : [];
    const marcas = req.query.marca ? req.query.marca.split(',').map(String) : [];
    const precioMin = req.query.precioMin ? parseFloat(req.query.precioMin) : null;
    const precioMax = req.query.precioMax ? parseFloat(req.query.precioMax) : null;

    // Obtener precio mínimo y máximo reales
    const rangoPrecios = await store.obtenerRangoPrecios();
    const defaultMin = rangoPrecios.minPrecio || 0;
    const defaultMax = rangoPrecios.maxPrecio || 100000;

    const marcasCompatibles = await store.cantidadMarcas(categorias);
    const marcasCompatiblesIds = marcasCompatibles.map(m => m.marca_id.toString());

    const marcasFiltradas = marcas.filter(marca => marcasCompatiblesIds.includes(marca));

    const [productos, totalProduct, cantCategoria, cantMarcas] = await Promise.all([
      store.obtenerStore(pagina, limite, orden, categorias, marcasFiltradas, precioMin, precioMax),
      store.totalProductos(categorias, marcasFiltradas, precioMin, precioMax),
      store.cantidadCategoria(),
      store.cantidadMarcas(categorias)
    ]);

    for (let producto of productos) {
      const avg = await rating.getAverageRating(producto.id);
      producto.averageRating = parseFloat(avg) || 0;

      producto.esMovil = producto.categoria?.toLowerCase() === "moviles";
    }

    res.render("store/store", {
      productos,
      totalProduct,
      limite,
      pagina,
      orden,
      categorias,
      marcas: marcasFiltradas,
      marcasFiltradas,
      cantCategoria,
      cantMarcas,
      precioMin,
      precioMax,
      defaultMin,
      defaultMax,
      req
    });
  } catch (err) {
    console.error('Error al obtener datos de productos:', err);
    res.status(500).json('Error al cargar los datos.');
  }
};

store.obtenerRangoPrecios = async () => {
  const query = `SELECT MIN(precio) AS minPrecio, MAX(precio) AS maxPrecio FROM productos`;
  try {
    const [results] = await db.query(query);
    return results[0]; // { minPrecio: 123, maxPrecio: 456789 }
  } catch (err) {
    throw new Error("Error al obtener rango de precios: " + err.message);
  }
};


export default store;
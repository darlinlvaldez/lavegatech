import store from '../../models/store/store.js';
import { itsNewProduct } from "../../utils/filterRecent.js";

store.storeController = async (req, res) => {
  try {
    const pagina = req.params.pagina ? parseInt(req.params.pagina) : 1;
    const limite = req.query.limite ? parseInt(req.query.limite) : 9;
    const orden = req.query.orden ? parseInt(req.query.orden) : 0;
    const categorias = req.query.categoria ? req.query.categoria.split(',').map(Number) : [];
    const marcas = req.query.marca ? req.query.marca.split(',').map(String) : [];
    const precioMin = req.query.precioMin ? parseFloat(req.query.precioMin) : null;
    const precioMax = req.query.precioMax ? parseFloat(req.query.precioMax) : null;

    const rangoPrecios = await store.getPriceRange();
    const defaultMin = rangoPrecios.minPrecio;
    const defaultMax = rangoPrecios.maxPrecio;

    const marcasCompatibles = await store.brandsQuantity(categorias);
    const marcasCompatiblesIds = marcasCompatibles.map(m => m.marca_id.toString());

    const marcasFiltradas = marcas.filter(marca => marcasCompatiblesIds.includes(marca));

    const [productos, totalProduct, cantCategoria, cantMarcas] = await Promise.all([
      store.getStore(pagina, limite, orden, categorias, marcasFiltradas, precioMin, precioMax),
      store.totalProducts(categorias, marcasFiltradas, precioMin, precioMax),
      store.categoriesQuantity(),
      store.brandsQuantity(categorias)
    ]);

    productos.forEach((p) => {
      p.category = p.categoria; 
      p.itsMobile = p.category?.toLowerCase() === "moviles";
      p.itsNew = itsNewProduct(p.fecha_publicacion, 30);
    });

    res.render("store/store", {productos, totalProduct, limite, pagina, orden, categorias,
      marcas: marcasFiltradas, marcasFiltradas, cantCategoria, cantMarcas, precioMin,
      precioMax, defaultMin, defaultMax, req
    });
  } catch (err) {
    console.error('Error al obtener datos de productos:', err);
    res.status(500).json('Error al cargar los datos.');
  }
};

export default store;
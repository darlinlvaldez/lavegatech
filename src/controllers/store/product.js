import product from "../../models/store/product.js";
import rating from "../../models/store/rating.js";
import comparison from "../../models/store/comparison.js";
import principal from '../../models/store/principal.js';
import { filterRecentProducts } from '../../utils/filterRecent.js';

product.detallesController = async (req, res) => {
  try {
    const { id } = req.params;
    const { color, paginaReviews = 1, limiteReviews = 3 } = req.query;

    const producto = await product.obtenerDetalles(id);

    if (!producto) {
      return res.status(404).render("error", { message: "Producto no encontrado" });
    }
    
    const categorias = await principal.obtenerCategorias();

    producto.esMovil = producto.categoria?.toLowerCase() === "moviles";

    const colorActual = color && producto.imagenesPorColor[decodeURIComponent(color)]
    ? decodeURIComponent(color): producto.colores[0];

    if (!color && producto.colores.length > 0) {
      return res.redirect( `/product/${id}?color=${encodeURIComponent(colorActual)}`);
    }

    const varianteActual = producto.variantesPorColor[colorActual];

    const totalReviews = await rating.countByProductId(id);

    const reviews = await rating.findByProductId(id, paginaReviews, limiteReviews);

    const totalPagesReviews = Math.ceil(totalReviews / limiteReviews);

    const averageRating = parseFloat(await rating.getAverageRating(id)) || 0;
    const ratingDistribution = await rating.getRatingDistribution(id);

    const productRelacionados = await product.obtenerRelacionados(
      id, producto.categoriaId);

    const dispositivos = await comparison.getDevice([id]);

    const productosRecientes = filterRecentProducts(productos, 30);
    
    res.render("store/product", {
      producto: {
        ...producto,
        categorias,
        variante_id: varianteActual,
        reviews,
        averageRating: averageRating || 0,
        ratingDistribution,
        totalReviews,
        totalPagesReviews,
        productosRecientes,
        currentPageReviews: parseInt(paginaReviews),
        limiteReviews: parseInt(limiteReviews),
      },
      dispositivos,
      productRelacionados,
      imagenesPorColor: producto.imagenesPorColor,
      colorSeleccionado: colorActual,
      stocksPorColor: producto.stocksPorColor,
      variantesPorColor: producto.variantesPorColor,
      currentUrl: req.originalUrl,
      colores: producto.colores,
      user: req.session.user || null,
    });
  } catch (error) {
    console.error("Error al obtener detalles del producto:", error);
    res.status(500).render("error", { message: error.message });
  }
};

export default product;
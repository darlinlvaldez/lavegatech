import productDetails from "../../models/store/product.js";
import rating from "../../models/store/rating.js";
import comparison from "../../models/store/comparison.js";
import principal from '../../models/store/principal.js';
import { itsNewProduct } from "../../utils/filterRecent.js";

const productController = {};

productController.productDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { color, pageReviews = 1, limitReviews = 3 } = req.query;

    const product = await productDetails.getProductDetails(id);

    if (!product) {
      return res.status(404).render("error", { message: "Producto no encontrado" });
    }

    const categories = await principal.getCategories();

    const colorActual =
      color && product.imagenesPorColor[decodeURIComponent(color)]
        ? decodeURIComponent(color) : product.colores[0];

    if (!color && product.colores.length > 0) {
      return res.redirect(
        `/product/${id}?color=${encodeURIComponent(colorActual)}`
      );
    }

    const varianteActual = product.variantesPorColor[colorActual];

    const [
      totalReviews, reviews, averageRating, ratingDistribution,
      productRelated, dispositivos
    ] = await Promise.all([
      rating.countByProductId(id),
      rating.findByProductId(id, pageReviews, limitReviews),
      rating.getAverageRating(id),
      rating.getRatingDistribution(id),
      productDetails.getRelated(id, product.categoriaId),
      comparison.getDevice([id]),
    ]);

    const normalize = (data) => {
      const list = Array.isArray(data) ? data : [data];

      list.forEach((p) => {
        p.category = p.categoria;
        p.itsMobile = p.category?.toLowerCase() === "moviles";
        p.itsNew = itsNewProduct(p.fecha_publicacion, 30);
      });
    };

    normalize(product); 
    normalize(productRelated); 

    const totalPagesReviews = Math.ceil(totalReviews / limitReviews);

    res.render("store/product", {
      product: {
        ...product,
        categories,
        variante_id: varianteActual,
        reviews,
        averageRating: Number(averageRating) || 0,
        ratingDistribution,
        totalReviews,
        totalPagesReviews,
        currentPageReviews: parseInt(pageReviews),
        limitReviews: parseInt(limitReviews),
      },
      dispositivos,
      productRelated,
      imagenesPorColor: product.imagenesPorColor,
      colorSeleccionado: colorActual,
      stocksPorColor: product.stocksPorColor,
      variantesPorColor: product.variantesPorColor,
      currentUrl: req.originalUrl,
      colores: product.colores,
      user: req.session.user || null,
    });
  } catch (error) {
    console.error("Error al obtener detalles del producto:", error);
    res.status(500).render("error", { message: error.message });
  }
};

export default productController;
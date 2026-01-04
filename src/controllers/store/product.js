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

    const currentColor =
      color && product.imagesByColor[decodeURIComponent(color)]
        ? decodeURIComponent(color) : product.colors[0];

    if (!color && product.colors.length > 0) {
      return res.redirect(
        `/product/${id}?color=${encodeURIComponent(currentColor)}`
      );
    }

    const currentVariant = product.variantsByColor[currentColor];

    const [totalReviews, reviews, averageRating, ratingDistribution,
      productRelated, devices] = await Promise.all
      ([rating.countByProductId(id),
      rating.findByProductId(id, pageReviews, limitReviews),
      rating.getAverageRating(id),
      rating.getRatingDistribution(id),
      productDetails.getRelated(id, product.categoryId),
      comparison.getDevice([id])]);

    const normalize = (data) => {
      const list = Array.isArray(data) ? data : [data];

      list.forEach((p) => {
        p.itsMobile = p.category?.toLowerCase() === "moviles";
        p.itsNew = itsNewProduct(p.publicationDate, 30);
      });
    };

    normalize(product); 
    normalize(productRelated); 

    const totalPagesReviews = Math.ceil(totalReviews / limitReviews);

    res.render("store/product", {
      product: {
        ...product,
        categories,
        variantId: currentVariant,
        reviews,
        averageRating: Number(averageRating) || 0,
        ratingDistribution,
        totalReviews,
        totalPagesReviews,
        currentPageReviews: parseInt(pageReviews),
        limitReviews: parseInt(limitReviews),
      },
      devices,
      productRelated,
      imagesByColor: product.imagesByColor,
      selectedColor: currentColor,
      stockByColor: product.stockByColor,
      variantsByColor: product.variantsByColor,
      currentUrl: req.originalUrl,
      colors: product.colors,
      user: req.session.user || null,
    });
  } catch (error) {
    console.error("Error al obtener detalles del producto:", error);
    res.status(500).render("error", { message: error.message });
  }
};

export default productController;
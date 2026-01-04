import store from '../../models/store/store.js';
import { itsNewProduct } from "../../utils/filterRecent.js";

store.storeController = async (req, res) => {
  try {
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 9;
    const sortBy = req.query.sortBy ? parseInt(req.query.sortBy) : 0;
    const categories = req.query.category ? req.query.category.split(',').map(Number) : [];
    const brands = req.query.brand ? req.query.brand.split(',').map(String) : [];
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;

    const priceRange = await store.getPriceRange();
    const defaultMin = priceRange.minPrice;
    const defaultMax = priceRange.maxPrice;

    const compatibleBrands = await store.brandsQuantity(categories);
    const compatibleBrandsIds = compatibleBrands.map(m => m.brandId.toString());

    const filteredBrands = brands.filter(brand => compatibleBrandsIds.includes(brand));

    const [products, totalProduct, categoryCount, brandCount] = await Promise.all([
      store.getStore(page, limit, sortBy, categories, filteredBrands, minPrice, maxPrice),
      store.totalProducts(categories, filteredBrands, minPrice, maxPrice),
      store.categoriesQuantity(),
      store.brandsQuantity(categories)
    ]);

    products.forEach((p) => {
      p.itsMobile = p.category?.toLowerCase() === "moviles";
      p.itsNew = itsNewProduct(p.publicationDate, 30);
    });

    res.render("store/store", {products, totalProduct, limit, page, sortBy, categories,
      brands: filteredBrands, filteredBrands, categoryCount, brandCount, minPrice,
      maxPrice, defaultMin, defaultMax, req
    });
  } catch (err) {
    console.error('Error al obtener datos de productos:', err);
    res.status(500).json('Error al cargar los datos.');
  }
};

export default store;
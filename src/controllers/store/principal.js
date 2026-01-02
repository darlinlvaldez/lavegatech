import principal from '../../models/store/principal.js';
import { itsNewProduct } from '../../utils/filterRecent.js';

principal.productsController = async (req, res) => {
  try {
    const { category } = req.query;
    
    const products = await principal.getProducts(category);
    const categories = await principal.getCategories();
    const recommended = await principal.getRecommended();

    const normalize = (list) => {
      list.forEach(p => {
        p.category = p.categoria;
        p.itsMobile = p.category?.toLowerCase() === "moviles";
        p.itsNew = itsNewProduct(p.fecha_publicacion, 30);
      });
    };

    normalize(products);
    normalize(recommended);

    const recentProduct = products.filter(p => p.itsNew);

    res.render("index", { products: recentProduct, categories, recommended });
  } catch (err) {
    console.error("Error al obtener datos", err);
    res.status(500).send("Error al cargar los datos.");
  }
};

principal.searchController = async (req, res) => {
  try {
      const { q: query } = req.query;
      const products = await principal.searchProducts(query);
      res.json(products);
  } catch (error) {
      console.error('Error en la búsqueda:', error);
      res.status(500).json({ error: 'Error en la búsqueda' });
  }
}

export default principal;
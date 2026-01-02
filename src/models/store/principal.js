import db from "../../database/mobiles.js";
import productsBase from "../store/utils/getProduct.js";

const principal = {};

principal.searchProducts = async (query) => {
  const where = `p.nombre LIKE ?`;
  const params = [`%${query}%`];
  const limit = "LIMIT 10";

  return productsBase.getProductsBase({ where, limit, params });
};

principal.getProducts = async (category) => {
  let where = "";
  const params = [];

  if (category) {
    const categoria = category; 
    where = "c.categoria = ?";
    params.push(categoria);
  }

  return productsBase.getProductsBase({ where, params });
};

principal.getCategories = async () => {
  const query = `SELECT *, categoria AS category FROM categorias`;
  try {
    const [results] = await db.query(query);
    return results;
  } catch (err) {
    throw new Error("Error al obtener las categorías: " + err.message);
  }
};

principal.getRecommended = async () => {
  const limit = "LIMIT 20";
  return productsBase.getProductsBase({ limit });
};

export default principal;
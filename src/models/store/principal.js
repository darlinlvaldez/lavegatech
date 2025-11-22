import db from "../../database/mobiles.js";
import productosBase from "../store/utils/getProduct.js";

const principal = {};

principal.buscarProductos = async (query) => {
  const where = `p.nombre LIKE ?`;
  const params = [`%${query}%`];
  const limit = "LIMIT 10";

  return productosBase.obtenerProductosBase({ where, limit, params });
};

principal.obtenerProductos = async (categoria) => {
  let where = "";
  const params = [];

  if (categoria) {
    where = "c.categoria = ?";
    params.push(categoria);
  }

  return productosBase.obtenerProductosBase({ where, params });
};

principal.obtenerCategorias = async () => {
  const query = `SELECT * FROM categorias`;
  try {
    const [results] = await db.query(query);
    return results;
  } catch (err) {
    throw new Error("Error al obtener las categorías: " + err.message);
  }
};

principal.obtenerRecomendados = async () => {
  const limit = "LIMIT 20";
  return productosBase.obtenerProductosBase({ limit });
};

export default principal;
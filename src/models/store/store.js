import db from "../../database/mobiles.js";
import productsBase from "../store/utils/getProduct.js";

const store = {};

const constructWhereClause = (categories = [], brands = [], minPrice = null, precioMax = null) => {
  const condiciones = [];
  const params = [];

  const hasCategories = categories.length > 0;
  const hasBrands = brands.length > 0;

  if (hasCategories) {
    const placeholders = categories.map(() => '?').join(',');
    condiciones.push(`p.categoria_id IN (${placeholders})`);
    params.push(...categories);
  }

  if (hasBrands) {
    const placeholders = brands.map(() => '?').join(',');

    if (hasCategories) {
      condiciones.push(`(
        p.marca_id IN (${placeholders})
        OR p.categoria_id NOT IN (
          SELECT DISTINCT mc.categoria_id
          FROM marca_categoria mc 
          WHERE mc.marca_id IN (${placeholders})
        )
      )`);
      
      params.push(...brands, ...brands);

    } else {
      condiciones.push(`p.marca_id IN (${placeholders})`);
      params.push(...brands);
    }
  }

  const finalPrice = `(p.precio * (1 + p.impuesto/100) * (1 - p.descuento/100))`;

  if (minPrice !== null && !isNaN(minPrice)) {
    condiciones.push(`${finalPrice} >= ?`);
    params.push(minPrice);
  }

  if (precioMax !== null && !isNaN(precioMax)) {
    condiciones.push(`${finalPrice} <= ?`);
    params.push(precioMax);
  }

  return {
    where: condiciones.length > 0 ? condiciones.join(" AND ") : "",
    params
  };
};

store.getStore = async (page = 1, limit = 9, sortBy = 0, categories = [], brands = [], minPrice, precioMax) => {
  const offset = (page - 1) * limit;

  const { where, params } = constructWhereClause(categories, brands, minPrice, precioMax);

  const orderByClause = {
    1: "ORDER BY p.fecha_publicacion ASC",
    2: "ORDER BY p.precio ASC",     
    3: "ORDER BY p.precio DESC",
    4: "ORDER BY p.descuento DESC",
  }[sortBy] || "ORDER BY p.fecha_publicacion DESC";

  const limitClause = `LIMIT ${limit} OFFSET ${offset}`;

  return productsBase.getProductsBase({
    where,
    order: orderByClause,
    limit: limitClause,
    params
  });
};

store.totalProducts = async (categories = [], brands = [], minPrice, precioMax) => {
  const { where, params } = constructWhereClause(categories, brands, minPrice, precioMax);

 const whereClause = `
    WHERE 
      p.activo = 1
      AND c.activo = 1
      AND m.activo = 1
      ${where ? `AND ${where}` : ""}
  `;

  const query = `
    SELECT COUNT(DISTINCT p.id) AS total
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    JOIN p_marcas m ON p.marca_id = m.id
    ${whereClause}
  `;

  try {
    const [results] = await db.query(query, params);
    return results[0].total;
  } catch (err) {
    throw new Error("Error al obtener el total de productos: " + err.message);
  }
};

store.getPriceRange = async () => {
  const query = `
       SELECT 
      MIN(p.precio * (1 + p.impuesto/100) * (1 - p.descuento/100)) AS minPrice, 
      MAX(p.precio * (1 + p.impuesto/100) * (1 - p.descuento/100)) AS maxPrice 
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    JOIN p_marcas m ON p.marca_id = m.id
    WHERE 
      p.activo = 1
      AND c.activo = 1
      AND m.activo = 1
  `;
  
  try {
    const [results] = await db.query(query);
    return results[0];
  } catch (err) {
    throw new Error("Error al obtener rango de precios: " + err.message);
  }
};

store.categoriesQuantity = async () => {
    const query = `
    SELECT  
      c.id AS category_id, 
      c.categoria AS category, 
      COUNT(DISTINCT p.id) AS cantidad
    FROM categorias c
    JOIN productos p ON c.id = p.categoria_id
    JOIN p_marcas m ON p.marca_id = m.id
    WHERE 
      c.activo = 1
      AND p.activo = 1
      AND m.activo = 1
    GROUP BY c.id
    HAVING cantidad > 0`;

    try {
        const [results] = await db.query(query);
        return results;
    } catch (err) {
        throw new Error("Error al obtener la cantidad de productos por categoría: " + err.message);
    }
};

store.brandsQuantity = async (categories = []) => {
  let where = "";
  let params = [];

  if (categories.length > 0) {
    const placeholders = categories.map(() => '?').join(',');
    where = `AND mc.categoria_id IN (${placeholders})`;
    params.push(...categories);
  }

  const query = `
    SELECT
      m.id AS brand_id,
      m.nombre AS brand,
      COUNT(DISTINCT p.id) AS cantidad
    FROM p_marcas m
    JOIN marca_categoria mc ON m.id = mc.marca_id
    JOIN productos p 
      ON p.marca_id = m.id 
     AND p.categoria_id = mc.categoria_id
    JOIN categorias c ON c.id = p.categoria_id
    WHERE
      m.activo = 1
      AND p.activo = 1
      AND c.activo = 1
      ${where}
    GROUP BY m.id, m.nombre
    HAVING cantidad > 0
    ORDER BY m.nombre
  `;

  try {
    const [results] = await db.query(query, params);
    return results;
  } catch (err) {
    throw new Error("Error al obtener las marcas y cantidad de productos: " + err.message);
  }
};

export default store;
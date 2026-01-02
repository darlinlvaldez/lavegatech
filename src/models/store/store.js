import db from "../../database/mobiles.js";
import productosBase from "../store/utils/getProduct.js";

const store = {};

const construirWhereClause = (categorias = [], marcas = [], precioMin = null, precioMax = null) => {
  const condiciones = [];
  const params = [];

  const tieneCategorias = categorias.length > 0;
  const tieneMarcas = marcas.length > 0;

  if (tieneCategorias) {
    const placeholders = categorias.map(() => '?').join(',');
    condiciones.push(`p.categoria_id IN (${placeholders})`);
    params.push(...categorias);
  }

  if (tieneMarcas) {
    const placeholders = marcas.map(() => '?').join(',');

    if (tieneCategorias) {
      condiciones.push(`(
        p.marca_id IN (${placeholders})
        OR p.categoria_id NOT IN (
          SELECT DISTINCT mc.categoria_id
          FROM marca_categoria mc 
          WHERE mc.marca_id IN (${placeholders})
        )
      )`);
      
      params.push(...marcas, ...marcas);

    } else {
      condiciones.push(`p.marca_id IN (${placeholders})`);
      params.push(...marcas);
    }
  }

  const precioFinal = `(p.precio * (1 + p.impuesto/100) * (1 - p.descuento/100))`;

  if (precioMin !== null && !isNaN(precioMin)) {
    condiciones.push(`${precioFinal} >= ?`);
    params.push(precioMin);
  }

  if (precioMax !== null && !isNaN(precioMax)) {
    condiciones.push(`${precioFinal} <= ?`);
    params.push(precioMax);
  }

  return {
    where: condiciones.length > 0 ? condiciones.join(" AND ") : "",
    params
  };
};

store.obtenerStore = async (pagina = 1, limite = 9, orden = 0, categorias = [], marcas = [], precioMin, precioMax) => {
  const offset = (pagina - 1) * limite;

  const { where, params } = construirWhereClause(categorias, marcas, precioMin, precioMax);

  const orderByClause = {
    1: "ORDER BY p.fecha_publicacion ASC",
    2: "ORDER BY p.precio ASC",     
    3: "ORDER BY p.precio DESC",
    4: "ORDER BY p.descuento DESC",
  }[orden] || "ORDER BY p.fecha_publicacion DESC";

  const limitClause = `LIMIT ${limite} OFFSET ${offset}`;

  return productosBase.getProductsBase({
    where,
    order: orderByClause,
    limit: limitClause,
    params
  });
};

store.totalProductos = async (categorias = [], marcas = [], precioMin, precioMax) => {
  const { where, params } = construirWhereClause(categorias, marcas, precioMin, precioMax);

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

store.obtenerRangoPrecios = async () => {
  const query = `
       SELECT 
      MIN(p.precio * (1 + p.impuesto/100) * (1 - p.descuento/100)) AS minPrecio, 
      MAX(p.precio * (1 + p.impuesto/100) * (1 - p.descuento/100)) AS maxPrecio 
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

store.cantidadCategoria = async () => {
    const query = `
    SELECT  
      c.id AS categoria_id, 
      c.categoria, 
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

store.cantidadMarcas = async (categorias = []) => {
  let where = "";
  let params = [];

  if (categorias.length > 0) {
    const placeholders = categorias.map(() => '?').join(',');
    where = `AND mc.categoria_id IN (${placeholders})`;
    params.push(...categorias);
  }

  const query = `
    SELECT
      m.id AS marca_id,
      m.nombre AS marca,
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
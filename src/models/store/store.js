import db from "../../database/mobiles.js";
import productosBase from "../store/utils/getProduct.js";

const store = {};

const construirWhereClause = (categorias = [], marcas = [], precioMin = null, precioMax = null) => {
  const condiciones = [];

  const tieneCategorias = categorias.length > 0;
  const tieneMarcas = marcas.length > 0;

  if (tieneCategorias) {
    condiciones.push(`p.categoria_id IN (${categorias.join(",")})`);
  }

  if (tieneMarcas) {
    if (tieneCategorias) {
      condiciones.push(`(
        p.marca_id IN (${marcas.join(",")})
        OR p.categoria_id NOT IN (
        SELECT DISTINCT mc.categoria_id
        FROM marca_categoria mc 
        WHERE mc.marca_id IN (${marcas.join(",")})))`);
    } else {
      condiciones.push(`p.marca_id IN (${marcas.join(",")})`);
    }
  }

  const precioFinal = `(p.precio * (1 + p.impuesto/100) * (1 - p.descuento/100))`;
  
  if (precioMin !== null && !isNaN(precioMin)) {
    condiciones.push(`${precioFinal} >= ${precioMin}`);
  }

  if (precioMax !== null && !isNaN(precioMax)) {
    condiciones.push(`${precioFinal} <= ${precioMax}`);
  }

  return condiciones.length > 0 ? condiciones.join(" AND ") : "";
};

store.obtenerStore = async (pagina = 1, limite = 9, orden = 0, categorias = [], marcas = [], precioMin, precioMax) => {
  const offset = (pagina - 1) * limite;

  const whereClause = construirWhereClause(categorias, marcas, precioMin, precioMax);

  const orderByClause = {
    1: "ORDER BY p.fecha_publicacion ASC",
    2: "ORDER BY p.precio ASC",     
    3: "ORDER BY p.precio DESC",
    4: "ORDER BY p.descuento DESC",
  }[orden] || "ORDER BY p.fecha_publicacion DESC";

  const limitClause = `LIMIT ${limite} OFFSET ${offset}`;

  return productosBase.obtenerProductosBase({
    where: whereClause,
    order: orderByClause,
    limit: limitClause,
    params: []
  });
};

store.totalProductos = async (categorias = [], marcas = [], precioMin, precioMax) => {
    const whereConditions = construirWhereClause(categorias, marcas, precioMin, precioMax);
    const whereClause = whereConditions ? `WHERE p.activo = 1 AND ${whereConditions}` : "WHERE p.activo = 1";

    const query = `
    SELECT COUNT(*) as total
    FROM productos p
    ${whereClause}`;

    try {
        const [results] = await db.query(query);
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
    WHERE p.activo = 1`;
  
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
    COUNT(CASE WHEN p.activo = 1 THEN p.id END) AS cantidad
    FROM categorias c
    LEFT JOIN productos p ON c.id = p.categoria_id
    GROUP BY c.id`;

    try {
        const [results] = await db.query(query);
        return results;
    } catch (err) {
        throw new Error("Error al obtener la cantidad de productos por categoría: " + err.message);
    }
};

store.cantidadMarcas = async (categorias = []) => {
    const whereClause = categorias.length > 0 ? `WHERE mc.categoria_id IN (${categorias.join(",")})`: '';
    
    const query = 
    `SELECT
    m.id AS marca_id,
    m.nombre AS marca,
    COUNT(DISTINCT CASE WHEN p.activo = 1 THEN p.id END) AS cantidad
    FROM p_marcas m
    INNER JOIN marca_categoria mc ON m.id = mc.marca_id
    LEFT JOIN productos p ON p.marca_id = m.id 
    ${categorias.length > 0 ? 'AND p.categoria_id = mc.categoria_id' : ''}
    ${whereClause}
    GROUP BY m.id, m.nombre
    HAVING cantidad > 0
    ORDER BY m.nombre`;
    
    try {
        const [results] = await db.query(query);
        return results;
    } catch (err) { 
        throw new Error("Error al obtener las marcas y cantidad de productos: " + err.message);
    }
};
  
export default store;
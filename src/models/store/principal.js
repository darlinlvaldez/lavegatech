import db from "../../database/mobiles.js";
import {impuestoDescuento} from "../../utils/applyRate.js";

const principal = {};

principal.buscarProductos = async (query) => {
  let searchQuery = ` 
  SELECT
  p.id,
  p.nombre,
  p.precio,
  p.impuesto,
  p.descuento,
  p.fecha_publicacion,
  c.categoria,
  v.color AS colores, 
  v.img AS imagenes,
  r.capacidad AS ram,
  a.capacidad AS almacenamiento,
  CONCAT(r.capacidad, '+', a.capacidad) AS especificaciones
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id
  LEFT JOIN p_variantes v ON p.id = v.producto_id 
  LEFT JOIN ram r ON p.ram_id = r.id
  LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
  WHERE (p.nombre LIKE ? OR p.descripcion LIKE ?) AND p.activo = 1
  GROUP BY p.id
  LIMIT 10`;

  const params = [`%${query}%`, `%${query}%`];

  try {
    const [results] = await db.query(searchQuery, params);
    return impuestoDescuento(results);
  } catch (err) {
    throw new Error("Error al buscar productos: " + err.message);
  }
};

principal.obtenerProductos = async (categoria) => {
  const query = `
  SELECT 
  p.id,
  p.nombre,
  p.precio,
  p.impuesto,
  p.descuento,
  p.fecha_publicacion,
  c.categoria,
  v.color, 
  v.stock,
  v.img AS imagen,
  r.capacidad AS ram,
  a.capacidad AS almacenamiento,
  CONCAT(r.capacidad, '+', a.capacidad) AS especificaciones
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id
  LEFT JOIN p_variantes v ON p.id = v.producto_id
  LEFT JOIN ram r ON p.ram_id = r.id
  LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
  WHERE p.activo = 1
  ${categoria ? `WHERE c.categoria = ?` : ''}
  GROUP BY p.id
  `;
  
  try {
    const params = categoria ? [categoria] : [];
    const [results] = await db.query(query, params);
    return impuestoDescuento(results);
  } catch (err) {
    throw new Error("Error al obtener los productos: " + err.message);
  }
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
  const query = `
  SELECT 
  p.id,
  p.nombre,
  p.precio,
  p.impuesto,
  p.descuento,
  p.fecha_publicacion,
  c.categoria,
  v.color, 
  v.stock,
  v.img AS imagen,
  r.capacidad AS ram,
  a.capacidad AS almacenamiento,
  CONCAT(r.capacidad, '+', a.capacidad) AS especificaciones
  FROM productos p
  JOIN categorias c ON p.categoria_id = c.id
  LEFT JOIN p_variantes v ON p.id = v.producto_id 
  LEFT JOIN ram r ON p.ram_id = r.id
  LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
  WHERE p.activo = 1  
  GROUP BY p.id 
  LIMIT 20;`;
  
  try {
    const [results] = await db.query(query);

    return impuestoDescuento(results);
    
  } catch (err) {
      console.error("Error al obtener productos recomendados:", err);
      return [];
  }
};

export default principal;
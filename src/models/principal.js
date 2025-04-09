import db from "../database/mobiles.js";

export const buscarProductos = async (query, categoria) => {
  let searchQuery = `
    SELECT 
        p.id,
        p.nombre,
        p.precio,
        p.descuento,
        p.fecha,
        c.categoria,
        GROUP_CONCAT(DISTINCT v.color) AS colores, 
        GROUP_CONCAT(DISTINCT v.img) AS imagenes
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN variantes v ON p.id = v.producto_id 
    WHERE p.nombre LIKE ? OR p.descripcion LIKE ?
`;

  
  const params = [`%${query}%`, `%${query}%`];
  
  if (categoria && categoria !== '0') {
      searchQuery += ' AND c.categoria = ?';
      params.push(categoria);
  }
  
  searchQuery += ' GROUP BY p.id LIMIT 10';
  
  try {
      const [results] = await db.query(searchQuery, params);
      return results;
  } catch (err) {
      throw new Error("Error al buscar productos: " + err.message);
  }
};

export const obtenerProductos = async (categoria) => {
  const query = `
     SELECT 
    p.id,
    p.nombre,
    p.precio,
    p.descuento,
    p.fecha,
    c.categoria,
    MAX(v.color) AS color, 
    MAX(v.stock) AS stock,
    MAX(v.img) AS imagen
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN variantes v ON p.id = v.producto_id 
${categoria ? `WHERE c.categoria = ?` : ''}
GROUP BY p.id

  `;
  
  try {
      const params = categoria ? [categoria] : [];
      const [results] = await db.query(query, params);
      return results;
  } catch (err) {
      throw new Error("Error al obtener los productos: " + err.message);
  }
};

export const obtenerCategorias = async () => {
  const query = `SELECT * FROM categorias`;
  
  try {
    const [results] = await db.query(query);
    return results;
  } catch (err) {
    throw new Error("Error al obtener las categorías: " + err.message);
  }
};

export const obtenerRecomendados = async () => {
  const query = `
      SELECT 
          p.id,
          p.nombre,
          p.precio,
          p.descuento,
          p.fecha,
          c.categoria,
          MAX(v.color) AS color, 
        MAX(v.stock) AS stock,
        MAX(v.img) AS imagen
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN variantes v ON p.id = v.producto_id 
      GROUP BY p.id 
      LIMIT 20;
  `;
  
  try {
      const [results] = await db.query(query);
      return results;
  } catch (err) {
      console.error("Error al obtener productos recomendados:", err);
      return [];
  }
};
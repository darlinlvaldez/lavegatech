import db from "../database/mobiles.js";

const principal = {};

principal.buscarProductos = async (query) => {
  let searchQuery = `
    SELECT 
      p.id,
      p.nombre,
      p.precio,
      p.descuento,
      p.fecha,
      c.categoria,
      v.color AS colores, 
      v.img AS imagenes
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN variantes v ON p.id = v.producto_id 
    WHERE p.nombre LIKE ? OR p.descripcion LIKE ?
    GROUP BY p.id
    LIMIT 10
  `;

  const params = [`%${query}%`, `%${query}%`];

  try {
    const [results] = await db.query(searchQuery, params);
    return results;
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
          p.descuento,
          p.fecha,
          c.categoria,
          v.color, 
          v.stock,
          p.img_principal AS imagen
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
          p.descuento,
          p.fecha,
          c.categoria,
          v.color, 
          v.stock,
          v.img AS imagen
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

export default principal;
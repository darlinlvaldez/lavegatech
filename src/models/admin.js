import db from "../database/mobiles.js";

const adminProductosModel = {};

adminProductosModel.obtenerTodos = async () => {
  const query = `
    SELECT 
      p.id, 
      p.nombre, 
      p.precio, 
      p.descripcion, 
      p.descuento, 
      c.categoria AS categoria, 
      m.nombre AS marca, 
      p.fecha
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN p_marcas m ON p.marca_id = m.id
    ORDER BY p.id DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

adminProductosModel.agregar = async ({nombre, precio, descripcion, 
    descuento, categoria, marca}) => {
        
    const query = `INSERT INTO productos 
    (nombre, precio, descripcion, descuento, categoria_id, marca_id) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    
    const [result] = await db.query(query, [nombre, precio, descripcion, 
        descuento, categoria, marca]);

  return result.insertId;
};

adminProductosModel.actualizar = async ({id, nombre, precio, descripcion, 
    descuento,categoria, marca, fecha}) => {
    const query = `UPDATE productos 
    SET nombre = ?, precio = ?, descripcion = ?,
    descuento = ?, categoria_id = ?, marca_id = ?, fecha = ?
    WHERE id = ?`;
    
    const [result] = await db.query(query, [nombre, precio, 
    descripcion, descuento, categoria, marca, fecha, id]);

  return result.affectedRows;
};

adminProductosModel.eliminar = async (id) => {
  const query = `DELETE FROM productos WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return result.affectedRows;
};

export default adminProductosModel;

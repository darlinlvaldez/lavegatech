import db from "../database/mobiles.js";

const admin = {};

// Productos

admin.obtenerItems = async () => {
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

admin.agregarItems = async ({nombre, precio, descripcion, 
    descuento, categoria, marca}) => {
        
    const query = `INSERT INTO productos 
    (nombre, precio, descripcion, descuento, categoria_id, marca_id) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    
    const [result] = await db.query(query, [nombre, precio, descripcion, 
        descuento, categoria, marca]);

  return result.insertId;
};

admin.actualizarItems = async ({id, nombre, precio, descripcion, 
    descuento, categoria, marca, fecha}) => {
    const query = `UPDATE productos 
    SET nombre = ?, precio = ?, descripcion = ?,
    descuento = ?, categoria_id = ?, marca_id = ?, fecha = ?
    WHERE id = ?`;
    
    const [result] = await db.query(query, [nombre, precio, 
    descripcion, descuento, categoria, marca, fecha, id]);

  return result.affectedRows;
};

admin.eliminarItems = async (id) => {
  const query = `DELETE FROM productos WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return result.affectedRows;
};

admin.obtenerCategorias = async () => {
  const [rows] = await db.query("SELECT id, categoria FROM categorias ORDER BY categoria");
  return rows;
};

admin.obtenerMarcas = async () => {
  const [rows] = await db.query("SELECT id, nombre FROM p_marcas ORDER BY nombre");
  return rows;
};

// Variantes

admin.obtenerVariantes = async () => {
  const query = `
    SELECT 
      v.id,
      v.color,
      v.stock,
      v.img,
      p.nombre AS producto
    FROM p_variantes v
    JOIN productos p ON v.producto_id = p.id
    ORDER BY v.id DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

admin.agregarVariante = async ({ producto_id, color, stock, img }) => {
  const [result] = await db.query(
    "INSERT INTO p_variantes (producto_id, color, stock, img) VALUES (?, ?, ?, ?)",
    [producto_id, color, stock, img]
  );
  return result.affectedRows > 0;
};

admin.eliminarVariante = async (id) => {
  const [result] = await db.query("DELETE FROM p_variantes WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

admin.actualizarVariante = async ({ id, color, stock, img, producto_id }) => {
  const [result] = await db.query(
    "UPDATE p_variantes SET color = ?, stock = ?, img = ?, producto_id = ? WHERE id = ?",
    [color, stock, img, producto_id, id]
  );
  return result.affectedRows > 0;
};

// Usuarios

admin.obtenerUsuarios = async () => {
  const query = `
    SELECT id, username, email, is_active, created_at
    FROM usuarios
    ORDER BY created_at DESC
  `;
  const [rows] = await db.query(query);
  return rows;
};

admin.estadoUsuario = async (id, isActive) => {
  const [result] = await db.query("UPDATE usuarios SET is_active = ? WHERE id = ?", [isActive, id]);
  return result.affectedRows > 0;
};

// Pedidos
admin.obtenerPedidos = async () => {
  const [rows] = await db.query("SELECT * FROM pedidos ORDER BY fecha_creacion DESC");
  return rows;
};

admin.obtenerPedidoId = async (id) => {
  const [rows] = await db.query("SELECT * FROM pedidos WHERE id = ?", [id]);
  return rows[0]; 
};

admin.productoPedido = async (orderId) => {
  const [rows] = await db.query("SELECT * FROM detalles_pedido WHERE order_id = ?", [orderId]);
  return rows;
};


export default admin;
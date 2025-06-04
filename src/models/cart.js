import db from "../database/mobiles.js";

const cart = {};

cart.addItem = async ({usuario_id, producto_id, colorSeleccionado, cantidad, descuento, precio, imagen, nombre}) => {
  await db.query(
    `INSERT INTO cart (usuario_id, producto_id, colorSeleccionado, cantidad, descuento, precio, imagen, nombre) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [usuario_id, producto_id, colorSeleccionado, cantidad, descuento, precio, imagen, nombre]
  );
};

cart.updateQuantity = async (identifier, usuario_id, value, colorSeleccionado = null) => {
  if (typeof identifier === 'number') {
    await db.query("UPDATE cart SET cantidad = ? WHERE id = ? AND usuario_id = ?",
      [value, identifier, usuario_id]);
  } else {
    await db.query(
      "UPDATE cart SET cantidad = ? WHERE usuario_id = ? AND producto_id = ? AND colorSeleccionado = ?",
      [value, usuario_id, identifier, colorSeleccionado]);
  }
};

cart.removeItem = async (id, usuario_id) => {
  await db.query("DELETE FROM cart WHERE id = ? AND usuario_id = ?", 
    [id, usuario_id]);
};

cart.clearCart = async (usuario_id) => {
  await db.query("DELETE FROM cart WHERE usuario_id = ?", [usuario_id]);
};

cart.itemExists = async (usuario_id, producto_id, colorSeleccionado) => {
  const [rows] = await db.query(
    "SELECT id, producto_id, cantidad FROM cart WHERE usuario_id = ? AND producto_id = ? AND colorSeleccionado = ?",
    [usuario_id, producto_id, colorSeleccionado]
  );
  return rows.length > 0 ? rows[0] : null;
};

cart.getByUserId = async (usuario_id) => {
  const [rows] = await db.query(
    `SELECT 
    c.id AS carrito_id, c.producto_id, c.colorSeleccionado, c.cantidad,
    c.fecha_agregado, c.descuento, c.precio, c.imagen, c.nombre, 
    v.stock AS stock_real,
    p.categoria_id,
    CASE 
    WHEN v.stock IS NULL OR v.stock < c.cantidad THEN 0 
    ELSE 1 
    END AS stock_suficiente
    FROM cart c 
    JOIN productos p ON c.producto_id = p.id 
    LEFT JOIN variantes v ON c.producto_id = v.producto_id AND c.colorSeleccionado = v.color
    WHERE c.usuario_id = ? 
    ORDER BY c.fecha_agregado DESC`,
    [usuario_id]
  );
  
  for (const item of rows) {
    if (item.stock_real !== null && item.cantidad > item.stock_real) {
      await cart.updateQuantity(item.carrito_id, usuario_id, item.stock_real);
      item.cantidad = item.stock_real;
    }
  }

  return rows;
};

cart.getCartToPay = async (usuario_id) => {
  const [rows] = await db.query(
  "SELECT c.id as cart_id, c.producto_id, c.colorSeleccionado, c.cantidad," +
  "c.descuento, c.precio, c.imagen, c.nombre, " +
  "p.categoria_id, c.fecha_agregado " +
  "FROM cart c " +
  "JOIN productos p ON c.producto_id = p.id " +
  "WHERE c.usuario_id = ? " +
  "ORDER BY c.fecha_agregado DESC",[usuario_id]
  );
  return rows;
};

cart.getCount = async (usuario_id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) as count FROM cart WHERE usuario_id = ?",
    [usuario_id]);
  return rows[0].count;
};

cart.getRealStock = async (producto_id, color) => {
  const [rows] = await db.query(
    "SELECT stock FROM variantes WHERE producto_id = ? AND color = ?",
    [producto_id, color]);
  return rows[0]?.stock || 0;
};

export default cart;
import db from "../database/mobiles.js";

const cart = {};

cart.addItem = async ({usuario_id, producto_id, colorSeleccionado, cantidad, 
  descuento, precio, imagen, nombre, stock}) => {
    await db.query(`INSERT INTO cart (usuario_id, producto_id, colorSeleccionado,
      cantidad, descuento, precio, imagen, nombre, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [usuario_id, producto_id, colorSeleccionado, cantidad, descuento, precio, imagen, nombre, stock]);
};

cart.updateQuantity = async (id, usuario_id, cantidad) => {
  await db.query(
    "UPDATE cart SET cantidad = ? WHERE id = ? AND usuario_id = ?",
    [cantidad, id, usuario_id]
  );
};

cart.removeItem = async (id, usuario_id) => {
  await db.query("DELETE FROM cart WHERE id = ? AND usuario_id = ?", [
    id, usuario_id]);
};

cart.itemExists = async (usuario_id, producto_id, colorSeleccionado) => {
  const [rows] = await db.query(
    "SELECT id, cantidad FROM cart WHERE usuario_id = ? AND producto_id = ? AND colorSeleccionado = ?",
    [usuario_id, producto_id, colorSeleccionado]
  );
  return rows.length > 0 ? rows[0] : null;
};

cart.getByUserId = async (usuario_id) => {
  const [rows] = await db.query(
    "SELECT id, producto_id as id, colorSeleccionado, cantidad, " +
    "descuento, precio, imagen, nombre, stock " +
    "FROM cart WHERE usuario_id = ?",
    [usuario_id]
  );
  return rows;
};

cart.getCount = async (usuario_id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) as count FROM cart WHERE usuario_id = ?",
    [usuario_id]
  );
  return rows[0].count;
};

cart.incrementQuantity = async (id, usuario_id, cantidad) => {
  await db.query(
    "UPDATE cart SET cantidad = cantidad + ? WHERE id = ? AND usuario_id = ?",
    [cantidad, id, usuario_id]
  );
};

export default cart;
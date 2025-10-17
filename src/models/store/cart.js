import db from "../../database/mobiles.js";

const cart = {};

cart.addItem = async ({ usuario_id, producto_id, variante_id, cantidad }) => {
  await db.query(
    `INSERT INTO carrito (usuario_id, producto_id, variante_id, cantidad) 
     VALUES (?, ?, ?, ?)`,
    [usuario_id, producto_id, variante_id, cantidad]
  );
};

cart.getVariant = async (producto_id, color) => {
  const [rows] = await db.query(
    `SELECT id, stock FROM p_variantes WHERE producto_id = ? AND color = ?`,
    [producto_id, color]
  );
  return rows[0] || null;
};

cart.updateQuantity = async (identifier, usuario_id, value) => {
  if (typeof identifier === 'number') {
    await db.query(
      "UPDATE carrito SET cantidad = ? WHERE id = ? AND usuario_id = ?",
      [value, identifier, usuario_id]
    );
  }
};

cart.removeItem = async (id, usuario_id) => {
  await db.query("DELETE FROM carrito WHERE id = ? AND usuario_id = ?", 
    [id, usuario_id]);
};

cart.clearCart = async (usuario_id) => {
  await db.query("DELETE FROM carrito WHERE usuario_id = ?", [usuario_id]);
};

cart.itemExists = async (usuario_id, producto_id, variante_id) => {
  const [rows] = await db.query( 
    `SELECT id, cantidad FROM carrito 
     WHERE usuario_id = ? AND producto_id = ? AND variante_id = ?`,
    [usuario_id, producto_id, variante_id]
  );
  return rows[0] || null;
};

cart.getByUserId = async (usuario_id) => {
  const [rows] = await db.query(`
    SELECT 
      c.id AS carrito_id, 
      c.producto_id, 
      c.variante_id,  
      c.cantidad, 
      c.fecha_agregado,
      p.nombre, p.precio, p.descuento, p.categoria_id,
      v.color AS colorSeleccionado, v.img AS imagen, v.stock AS stock_real,
      r.capacidad AS ram,
      a.capacidad AS almacenamiento,
      CONCAT(r.capacidad, '+', a.capacidad) AS especificaciones
    FROM carrito c
    JOIN productos p ON c.producto_id = p.id
    JOIN p_variantes v ON c.variante_id = v.id
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    WHERE c.usuario_id = ?
    ORDER BY c.fecha_agregado DESC
  `, [usuario_id]);

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
    `SELECT 
      c.id AS cart_id,
      c.producto_id,
      c.cantidad,
      p.nombre,
      p.precio,
      p.descuento,
      p.categoria_id,
      c.fecha_agregado,
      r.capacidad AS ram,
      a.capacidad AS almacenamiento,
      CONCAT(r.capacidad, '+', a.capacidad) AS especificaciones,
      v.color AS colorSeleccionado,
      v.img AS imagen,
      v.stock
    FROM carrito c
    JOIN productos p ON c.producto_id = p.id
    LEFT JOIN p_variantes v ON c.variante_id = v.id
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    WHERE c.usuario_id = ?
    ORDER BY c.fecha_agregado DESC`,
    [usuario_id]
  );
  return rows;
};

cart.getCount = async (usuario_id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) as count FROM carrito WHERE usuario_id = ?",
    [usuario_id]);
  return rows[0].count;
};

cart.getRealStock = async (producto_id, color) => {
  const [rows] = await db.query(
    "SELECT stock FROM p_variantes WHERE producto_id = ? AND color = ?",
    [producto_id, color]);
  return rows[0]?.stock || 0;
};

export default cart;
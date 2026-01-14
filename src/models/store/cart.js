import db from "../../database/mobiles.js";
import {applyTaxDiscount} from "../../utils/applyRate.js";

const cart = {};

cart.addItem = async ({ userId, productId, variantId, quantity }) => {
  await db.query(
    `INSERT INTO carrito (usuario_id, producto_id, variante_id, cantidad) 
     VALUES (?, ?, ?, ?)`,
    [userId, productId, variantId, quantity]
  );
};

cart.updateQuantity = async (identifier, userId, value) => {
  if (typeof identifier === 'number') {
    await db.query(
      "UPDATE carrito SET cantidad = ? WHERE id = ? AND usuario_id = ?",
      [value, identifier, userId]
    );
  }
};

cart.removeItem = async (id, userId) => {
  await db.query("DELETE FROM carrito WHERE id = ? AND usuario_id = ?", 
    [id, userId]);
};

cart.clearCart = async (userId) => {
  await db.query("DELETE FROM carrito WHERE usuario_id = ?", [userId]);
};

cart.itemExists = async (userId, variantId) => {
  const [rows] = await db.query(
    `SELECT id, cantidad AS quantity 
     FROM carrito 
     WHERE usuario_id = ? AND variante_id = ?`,
    [userId, variantId]
  );
  return rows[0] || null;
};

cart.getByUserId = async (userId) => {
  const [rows] = await db.query(`
    SELECT 
      c.id AS cartId, 
      c.producto_id AS productId, 
      c.variante_id AS variantId,  
      c.cantidad AS quantity, 
      c.fecha_agregado,
      p.nombre AS name, 
      p.precio AS price, 
      p.descuento AS discount, 
      p.categoria_id AS categoryId, 
      p.impuesto AS tax,
      v.color AS selectedColor, 
      v.img AS image, 
      v.stock AS realStock,
      r.capacidad AS ram,
      a.capacidad AS storage,
      CONCAT(r.capacidad, '+', a.capacidad) AS specs
    FROM carrito c
    JOIN productos p ON c.producto_id = p.id AND p.activo = 1
    JOIN p_variantes v ON c.variante_id = v.id AND v.activo = 1
    JOIN p_marcas m ON p.marca_id = m.id AND m.activo = 1
    JOIN categorias cat ON p.categoria_id = cat.id AND cat.activo = 1
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    WHERE c.usuario_id = ? AND p.activo = 1
    ORDER BY c.fecha_agregado DESC
  `, [userId]);

  const finalPrice = applyTaxDiscount(rows);

  for (const item of finalPrice) {
    if (item.realStock !== null && item.quantity > item.realStock) {
      await cart.updateQuantity(item.cartId, userId, item.realStock);
      item.quantity = item.realStock;
    }
  }

  return finalPrice;
};

cart.getCartToPay = async (userId) => {
  const [rows] = await db.query(
    `SELECT 
      c.id AS cartid,
      c.producto_id AS productId,
      c.cantidad AS quantity,
      p.nombre AS name,
      v.id AS varianteId,
      p.precio AS originalPrice,
      p.impuesto AS tax,
      p.descuento AS discount,
      p.categoria_id AS categoryId,
      c.fecha_agregado,
      r.capacidad AS ram,
      a.capacidad AS storage,
      CONCAT(r.capacidad, '+', a.capacidad) AS specs,
      v.color AS selectedColor,
      v.img AS image,
      v.stock
    FROM carrito c
    JOIN productos p ON c.producto_id = p.id AND p.activo = 1
    JOIN p_variantes v ON c.variante_id = v.id AND v.activo = 1
    JOIN p_marcas m ON p.marca_id = m.id AND m.activo = 1
    JOIN categorias cat ON p.categoria_id = cat.id AND cat.activo = 1
    LEFT JOIN ram r ON p.ram_id = r.id
    LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
    WHERE c.usuario_id = ? AND c.cantidad > 0 AND v.stock > 0 AND p.activo = 1
    ORDER BY c.fecha_agregado DESC`,
    [userId]
  );
  
  return rows;
};

cart.getCount = async (userId) => {
  const [rows] = await db.query(
    `SELECT COUNT(*) as count
    FROM carrito c
    JOIN productos p ON c.producto_id = p.id
    WHERE c.usuario_id = ? AND p.activo = 1`,
    [userId]);
  return rows[0].count;
};

export default cart;
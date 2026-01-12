import db from "../../database/mobiles.js";
import {applyTaxDiscount} from "../../utils/applyRate.js";

const fav = {};

fav.addItem = async ({userId, productId, variantId}) => {
    await db.query(
        `INSERT INTO fav (usuario_id, producto_id, variante_id) 
         VALUES (?, ?, ?)`,
        [userId, productId, variantId]
    );
};

fav.removeItem = async (userId, productId, variantId) => {
    await db.query(
        `DELETE FROM fav 
         WHERE usuario_id = ? AND producto_id = ? AND variante_id = ?`,
        [userId, productId, variantId]
    );
};

fav.clearAll = async (userId) => {
  await db.query("DELETE FROM fav WHERE usuario_id = ?", [userId]);
};

fav.itemExists = async (userId, productId, variantId) => {
    const [rows] = await db.query(
        `SELECT id FROM fav 
         WHERE usuario_id = ? AND producto_id = ? AND variante_id = ?`,
        [userId, productId, variantId]
    );
    return rows.length > 0;
};

fav.getByUserId = async (userId) => {
    const [rows] = await db.query(
        `SELECT 
        f.id,
        p.id AS productId,
        p.nombre AS name,
        p.descripcion AS description,
        p.precio AS price,
        p.impuesto AS tax,
        p.descuento AS discount,
        p.categoria_id AS categoryId,
        p.marca_id AS brandId,
        v.id AS variantId,
        v.color AS selectedColor,
        v.img as image,
        v.stock AS stockByColor,
        r.capacidad AS ram, 
        a.capacidad AS storage,
        CONCAT(r.capacidad, '+', a.capacidad) AS specs
        FROM fav f
        JOIN productos p ON f.producto_id = p.id AND p.activo = 1
        JOIN p_variantes v ON f.variante_id = v.id AND v.activo = 1
        JOIN p_marcas m ON p.marca_id = m.id AND m.activo = 1
        JOIN categorias cat ON p.categoria_id = cat.id AND cat.activo = 1
        LEFT JOIN ram r ON p.ram_id = r.id
        LEFT JOIN almacenamiento a ON p.almacenamiento_id = a.id
        WHERE f.usuario_id = ? AND p.activo = 1
        ORDER BY f.fecha_agregado DESC`,
    [userId]
    );

    const finalPrice = applyTaxDiscount(rows);

    return finalPrice;
};

fav.getCount = async (userId) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) as count FROM fav WHERE usuario_id = ? ",
    [userId]
  );
  return rows[0].count;
};

export default fav;
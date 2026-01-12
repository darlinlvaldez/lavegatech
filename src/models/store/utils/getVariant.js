import db from "../../../database/mobiles.js";

const variant = {};

variant.getById = async (variantId, productId = null) => {
  let sql = `
    SELECT id, producto_id, stock, activo
    FROM p_variantes
    WHERE id = ?
  `;
  const params = [variantId];

  if (productId !== null) {
    sql += ' AND producto_id = ?';
    params.push(productId);
  }

  const [rows] = await db.query(sql, params);
  return rows[0] || null;
};

export default variant;
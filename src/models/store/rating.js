import db from "../../database/mobiles.js";

const rating = {};

rating.create = async ({productId, userId, rating, review}) => {
  const [result] = await db.execute(
    "INSERT INTO clasificacion (producto_id, usuario_id, calificacion, comentario) VALUES (?, ?, ?, ?)",
    [productId, userId, rating, review]
  );
  return result;
};

rating.userHasPurchased = async (userId, productId) => {
  const [rows] = await db.execute(`
    SELECT 1
    FROM pedidos p
    JOIN detalles_pedido dp ON dp.pedido_id = p.id
    WHERE p.usuario_id = ?
      AND dp.producto_id = ?
      AND p.estado IN ('pagado', 'completado', 'entregado')
    LIMIT 1
  `, [userId, productId]);

  return rows.length > 0;
};

rating.findByProductId = async (productId, page = 1, limit = 3, userId = null) => {
  const offset = (page - 1) * limit;

  const query = `
    SELECT 
    c.id,
    c.calificacion AS rating,
    c.comentario AS review,
    c.fecha_creacion,
    c.fecha_actualizacion,
    u.username,
    CASE WHEN c.usuario_id = ? THEN 0 ELSE 1 END as orden_personal,
    c.usuario_id = ? as isAuthor
    FROM clasificacion c
    JOIN usuarios u ON c.usuario_id = u.id
    WHERE c.producto_id = ?
    ORDER BY orden_personal, c.fecha_creacion DESC
    LIMIT ? OFFSET ?
    `;

  const [rows] = await db.execute(query, [
    userId ?? -1, userId ?? -1, productId, limit, offset]);

  return rows;
};

rating.updateReview = async (id, userId, review, rating) => {
    const [result] = await db.execute(
        "UPDATE clasificacion SET comentario = ?, calificacion = ? WHERE id = ? AND usuario_id = ?",
        [review, rating, id, userId]
    );
    return result;
};

rating.countByProductId = async (productId) => {
  const [rows] = await db.execute(
    "SELECT COUNT(*) as total FROM clasificacion WHERE producto_id = ?",
    [productId]
  );
  return rows[0].total;
};

rating.getAverageRating = async (productId) => {
  const [rows] = await db.execute(
    "SELECT AVG(calificacion) as averageRating FROM clasificacion WHERE producto_id = ?",
    [productId]
  );
  return rows[0].averageRating || 0;
};

rating.getRatingDistribution = async (productId) => {
  const [rows] = await db.execute(
    `SELECT calificacion AS rating, COUNT(*) AS count 
       FROM clasificacion 
       WHERE producto_id = ? 
       GROUP BY calificacion`,
    [productId]
  );
  return rows;
};

rating.userHasReviewed = async (productId, userId) => {
  const [rows] = await db.execute(
    "SELECT 1 FROM clasificacion WHERE producto_id = ? AND usuario_id = ? LIMIT 1",
    [productId, userId]
  );
  return rows.length > 0;
};

export default rating;
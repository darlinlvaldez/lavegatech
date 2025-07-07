import db from "../database/mobiles.js";

const rating = {};

rating.create = async ({producto_id, usuario_id, calificacion, comentario}) => {
  const [result] = await db.execute(
    "INSERT INTO ratings (producto_id, usuario_id, calificacion, comentario) VALUES (?, ?, ?, ?)",
    [producto_id, usuario_id, calificacion, comentario]
  );
  return result;
};

rating.findByProductId = async (producto_id, pagina = 1, limite = 3, usuario_id = null) => {
  const offset = (pagina - 1) * limite;

  const query = `
    SELECT r.*, u.username,
      CASE WHEN r.usuario_id = ? THEN 0 ELSE 1 END as orden_personal,
      r.usuario_id = ? as isAuthor
    FROM ratings r 
    JOIN usuarios u ON r.usuario_id = u.id 
    WHERE r.producto_id = ? 
    ORDER BY orden_personal, r.fecha_creacion DESC
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.execute(query, [
    usuario_id ?? -1, usuario_id ?? -1, producto_id, limite, offset]);

  return rows;
};

rating.updateReview = async (id, usuario_id, comentario, calificacion) => {
    const [result] = await db.execute(
        "UPDATE ratings SET comentario = ?, calificacion = ? WHERE id = ? AND usuario_id = ?",
        [comentario, calificacion, id, usuario_id]
    );
    return result;
};

rating.countByProductId = async (producto_id) => {
  const [rows] = await db.execute(
    "SELECT COUNT(*) as total FROM ratings WHERE producto_id = ?",
    [producto_id]
  );
  return rows[0].total;
};

rating.getAverageRating = async (producto_id) => {
  const [rows] = await db.execute(
    "SELECT AVG(calificacion) as promedio FROM ratings WHERE producto_id = ?",
    [producto_id]
  );
  return rows[0].promedio || 0;
};

rating.getRatingDistribution = async (producto_id) => {
  const [rows] = await db.execute(
    `SELECT calificacion, COUNT(*) as count 
       FROM ratings 
       WHERE producto_id = ? 
       GROUP BY calificacion`,
    [producto_id]
  );
  return rows;
};

rating.userHasReviewed = async (producto_id, usuario_id) => {
  const [rows] = await db.execute(
    "SELECT 1 FROM ratings WHERE producto_id = ? AND usuario_id = ? LIMIT 1",
    [producto_id, usuario_id]
  );
  return rows.length > 0;
};

export default rating;
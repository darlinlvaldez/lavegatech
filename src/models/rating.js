import db from "../database/mobiles.js";

const rating = {};

rating.create = async ({producto_id, usuario_id, calificacion, comentario}) => {
  const [result] = await db.execute(
    "INSERT INTO ratings (producto_id, usuario_id, calificacion, comentario) VALUES (?, ?, ?, ?)",
    [producto_id, usuario_id, calificacion, comentario]
  );
  return result;
};

rating.findByProductId = async (producto_id, pagina = 1, limite = 3) => {
  const offset = (pagina - 1) * limite;
  const [rows] = await db.execute(
    `SELECT r.*, u.username 
     FROM ratings r 
     JOIN usuarios u ON r.usuario_id = u.id 
     WHERE producto_id = ? 
     ORDER BY fecha_creacion DESC
     LIMIT ? OFFSET ?`,
    [producto_id, limite, offset]
  );
  return rows;
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
import db from "../database/mobiles.js";

const admin = {};

admin.findByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [username]);
  return rows[0]; 
};

admin.obtenerAdmins = async () => {
  const [rows] = await db.query(
    "SELECT id, username, created_at, is_active FROM admin"
  );
  return rows;
};

admin.agregarAdmin = async ({ username, password }) => {
  await db.query(`
    INSERT INTO admin (username, password)
    VALUES (?, ?)`,
    [username, password]
  );

  const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [username]);
  return rows[0];
};

admin.actualizarAdmin = async (id, { username, password }) => {
  if (password) {
    await db.query(`
      UPDATE admin SET username = ?, password = ?
      WHERE id = ?`,
      [username, password, id]
    );
  } else {
    await db.query(`
      UPDATE admin SET username = ?
      WHERE id = ?`,
      [username, id]
    );
  }
};

admin.estadoAdmin = async (id, is_active) => {
  const [result] = await db.query(
    `UPDATE admin SET is_active = ? WHERE id = ?`,
    [is_active, id]
  );
  return result.affectedRows > 0;
};

admin.eliminarAdmin = async (id) => {
  return await db.query(`DELETE FROM admin WHERE id = ?`, [id]);
};

export default admin;
import db from "../../database/mobiles.js";

const admin = {};

admin.findByUsername = async (username) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE username = ? AND rol != 'cliente'",
    [username]
  );
  return rows[0];
};

admin.getAdmins = async () => {
  const [rows] = await db.query(
    "SELECT id, username, email, rol, activo, fecha_creacion FROM usuarios WHERE rol != 'cliente'"
  );
  return rows;
};

admin.createAdmin = async ({ username, password, rol }) => {
  const [result] = await db.query(`
    INSERT INTO usuarios (username, email, password, rol, activo)
    VALUES (?, NULL, ?, ?, 1)
  `, [username, password, rol]);

  return { id: result.insertId };
};

admin.updateAdmin = async (id, { username, password, rol }) => {
  if (password) {
    await db.query(`
      UPDATE usuarios SET username = ?, password = ?, rol = ?
      WHERE id = ?
    `, [username, password, rol, id]);
  } else {
    await db.query(`
      UPDATE usuarios SET username = ?, rol = ?
      WHERE id = ?
    `, [username, rol, id]);
  }
};

admin.deleteAdmin = async (id) => {
  return await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
};

admin.setAdminState = async (id, activo) => {
  const [result] = await db.query(
    "UPDATE usuarios SET activo = ? WHERE id = ?",
    [activo, id]
  );
  return result.affectedRows > 0;
};

export default admin;
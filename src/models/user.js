import db from "../database/mobiles.js";

const user = {};

user.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0];
};

user.userExists = async (email) => {
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows.length > 0;
};

user.insertUser = async ({ username, email, password }) => {
  await db.query("INSERT INTO usuarios (username, email, password, is_verified) VALUES (?, ?, ?, 1)",
  [username, email, password]);
};

user.updatePassword = async (email, hashedPassword) => {
  await db.query("UPDATE usuarios SET password = ? WHERE email = ?", [hashedPassword, email]);
};

export default user;
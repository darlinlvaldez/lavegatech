import db from "../../database/mobiles.js";

const user = {};

// LOGIN AND REGISTER

user.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0];
};

user.userExists = async (email) => {
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows.length > 0;
};

user.insertUser = async ({ username, email, password }) => {
  await db.query(
    "INSERT INTO usuarios (username, email, password, is_active) VALUES (?, ?, ?, 1)",
    [username, email, password]);

  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0];
};

user.forgotPassword = async (email, hashedPassword) => {
  await db.query("UPDATE usuarios SET password = ? WHERE email = ?", [hashedPassword, email]);
};

// USER PROFILE

user.updateUsername = async (id, newUsername) => {
  await db.query("UPDATE usuarios SET username = ? WHERE id = ?", [newUsername, id]);
};

user.updateEmail = async (id, newEmail) => {
  await db.query("UPDATE usuarios SET email = ? WHERE id = ?", [newEmail, id]);
};

user.updatePassword = async (id, hashedPassword) => {
  await db.query("UPDATE usuarios SET password = ? WHERE id = ?", [hashedPassword, id]);
};

user.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows[0];
};

export default user;
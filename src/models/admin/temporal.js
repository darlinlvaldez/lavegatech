import bcrypt from "bcrypt";
import db from "../../database/mobiles.js";

const username = "darlin";
const password = "darlin";
const rol = "superadmin";

const hash = await bcrypt.hash(password, 10);

await db.query(`
  INSERT INTO usuarios (username, password, rol, activo)
  VALUES (?, ?, ?, 1)
`, [username, hash, rol]);

console.log("Admin creado!");
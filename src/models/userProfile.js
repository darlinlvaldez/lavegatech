import db from '../database/mobiles.js'

const userProfile = {};

userProfile.findById = async (id) => {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows[0];
  };
  
  userProfile.updateUsername = async (id, newUsername) => {
    await db.query("UPDATE usuarios SET username = ? WHERE id = ?", [newUsername, id]);
  };
  
  userProfile.updateEmail = async (id, newEmail) => {
    await db.query("UPDATE usuarios SET email = ? WHERE id = ?", [newEmail, id]);
  };
  
  userProfile.updatePasswordById = async (id, hashedPassword) => {
    await db.query("UPDATE usuarios SET password = ? WHERE id = ?", [hashedPassword, id]);
  };
  
export default userProfile;
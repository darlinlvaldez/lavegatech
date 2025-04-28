import bcrypt from 'bcrypt';
import userModel from '../models/userProfile.js';

const userProfile = {};

userProfile.updateUsername = async (req, res) => {
    const { user } = req.session;
    const { newUsername } = req.body;
  
    if (!user) return res.redirect('/login');
    if (!newUsername) return res.status(400).send('El nombre no puede estar vacío.');
  
    await userModel.updateUsername(user.id, newUsername);
    req.session.user.username = newUsername;
    res.redirect('/account'); 
  };
  
  userProfile.updateEmail = async (req, res) => {
    const { user } = req.session;
    const { newEmail } = req.body;
  
    if (!user) return res.redirect('/login');
    if (!newEmail) return res.status(400).send('El correo no puede estar vacío.');
  
    await userModel.updateEmail(user.id, newEmail);
    req.session.user.email = newEmail;
    res.redirect('/account');
  };
  
  userProfile.updatePassword = async (req, res) => {
    const { user } = req.session;
    const { oldPassword, newPassword, confirmPassword } = req.body;
  
    if (!user) return res.redirect('/login');
    if (!newPassword || newPassword !== confirmPassword)
      return res.status(400).send('La nueva contraseña no coincide.');
  
    const foundUser = await userModel.findById(user.id);
    const match = await bcrypt.compare(oldPassword, foundUser.password);
    if (!match) return res.status(400).send('Contraseña actual incorrecta.');
  
    const saltRounds = 10;
    const hashed = await bcrypt.hash(newPassword, saltRounds);
    await userModel.updatePasswordById(user.id, hashed);
    res.redirect('/account');
  };

export default userProfile;
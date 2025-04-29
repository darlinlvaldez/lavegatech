import bcrypt from "bcrypt";
import user from "../models/auth.js";
import emailService from '../services/email.js';
import code from '../utils/generateCode.js';

const auth = {};

auth.updateUsername = async (req, res) => {
  const sessionUser = req.session.user;
  const { newUsername } = req.body;

  if (!sessionUser) return res.redirect('/login');
  if (!newUsername) return res.status(400).send('El nombre no puede estar vacío.');

  await user.updateUsername(sessionUser.id, newUsername);
  req.session.user.username = newUsername;
  res.redirect('/account');
};

// Cambiar email: primer paso (enviar código)
auth.updateEmail = async (req, res) => {
  const sessionUser = req.session.user;
  const { newEmail } = req.body;
  if (!sessionUser) return res.status(401).send('No autorizado.');

  const verificationCode = code.generateCode();

  code.pendingUsers.set(newEmail, {
    code: verificationCode,
    expiresAt: Date.now() + 10 * 60 * 1000,
    userId: sessionUser.id
  });

  try {
    await emailService.sendVerification(newEmail, verificationCode);
    res.status(200).send('Código enviado al nuevo correo.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar correo.');
  }
};

auth.verifyEmailCode = async (req, res) => {
  const { newEmail, codeInput } = req.body;
  const result = code.validateCode(code.pendingUsers, newEmail, codeInput);

  if (result.error) return res.status(400).send(result.error);

  try {
    await user.updateEmail(result.data.userId, newEmail);
    code.pendingUsers.delete(newEmail);
    req.session.user.email = newEmail; 
    res.status(200).send('Correo actualizado exitosamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error actualizando el correo.');
  }
};

auth.updatePassword = async (req, res) => {
  const sessionUser = req.session.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!sessionUser) return res.redirect('/login');
  if (!newPassword || newPassword !== confirmPassword)
    return res.status(400).send('La nueva contraseña no coincide.');

  const foundUser = await user.findById(sessionUser.id);
  if (!foundUser) return res.status(404).send('Usuario no encontrado.');

  const match = await bcrypt.compare(oldPassword, foundUser.password);
  if (!match) return res.status(400).send('Contraseña actual incorrecta.');

  const saltRounds = 10;
  const hashed = await bcrypt.hash(newPassword, saltRounds);
  await user.updatePassword(sessionUser.id, hashed);
  res.redirect('/account');
};

export default auth;
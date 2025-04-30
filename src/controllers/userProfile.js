import bcrypt from "bcrypt";
import user from "../models/auth.js";
import emailService from '../services/email.js';
import code from '../utils/generateCode.js';
import { ERROR_MESSAGES } from '../utils/error.js';  // Importamos los mensajes de error

const auth = {};

auth.updateUsername = async (req, res) => {
  const sessionUser = req.session.user;
  const { newUsername } = req.body;

  try {
    if (sessionUser.username === newUsername) {
      return res.status(400).send(ERROR_MESSAGES.PASSWORDS_DONT_MATCH);
    }

    if (!newUsername) return res.status(400).send(ERROR_MESSAGES.MISSING_FIELDS);

    await user.updateUsername(sessionUser.id, newUsername);
    req.session.user.username = newUsername;
    res.redirect('/account');
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
  }
};

auth.updateEmail = async (req, res) => {
  const sessionUser = req.session.user;
  const { newEmail } = req.body;
  
  try {
    if (!sessionUser) return res.status(401).send(ERROR_MESSAGES.LOGIN_ERROR);

    if (sessionUser.email === newEmail) {
      return res.status(400).send(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const alreadyExists = await user.userExists(newEmail);
    if (alreadyExists) {
      return res.status(400).send(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

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
      res.status(500).send(ERROR_MESSAGES.EMAIL_SEND_ERROR);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
  }
};

auth.resendCode = async (req, res) => {
  const { email } = req.body;
  const now = Date.now();
  const existing = code.pendingUsers.get(email); 

  try {
    if (existing?.lastSent && now - existing.lastSent < 3 * 60 * 1000) {
      const remaining = Math.ceil((3 * 60 * 1000 - (now - existing.lastSent))) / 1000;
      return res.status(429).json({ 
        error: ERROR_MESSAGES.RESEND_COOLDOWN.replace("{seconds}", remaining) 
      });
    }

    const newCode = code.generateCode();
    code.pendingUsers.set(email, { 
      code: newCode,
      expiresAt: now + 10 * 60 * 1000,
      lastSent: now,
      userId: existing?.userId 
    });

    try {
      await emailService.sendEmail(
        email,
        'Nuevo código de verificación',
        `Tu nuevo código es: ${newCode}`
      );
      res.status(200).json({ message: 'Código reenviado exitosamente' });
    } catch (error) {
      console.error('Error al reenviar código:', error);
      res.status(500).json({ error: ERROR_MESSAGES.RESEND_ERROR });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
  }
};

auth.verifyEmailCode = async (req, res) => {
  const { newEmail, codeInput } = req.body;
  
  try {
    const result = code.validateCode(code.pendingUsers, newEmail, codeInput);

    if (result.error) return res.status(400).send(result.error);

    await user.updateEmail(result.data.userId, newEmail);
    code.pendingUsers.delete(newEmail);
    req.session.user.email = newEmail; 
    res.status(200).send('Correo actualizado exitosamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
  }
};

auth.updatePassword = async (req, res) => {
  const sessionUser = req.session.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    if (!sessionUser) return res.redirect('/login');
    if (!newPassword || newPassword !== confirmPassword)
      return res.status(400).send(ERROR_MESSAGES.PASSWORDS_DONT_MATCH);

    const foundUser = await user.findById(sessionUser.id);
    if (!foundUser) return res.status(404).send(ERROR_MESSAGES.USER_NOT_FOUND);

    const match = await bcrypt.compare(oldPassword, foundUser.password);
    if (!match) return res.status(400).send(ERROR_MESSAGES.WRONG_PASSWORD);

    const saltRounds = 10;
    const hashed = await bcrypt.hash(newPassword, saltRounds);
    await user.updatePassword(sessionUser.id, hashed);
    res.redirect('/account');
  } catch (error) {
    console.error(error);
    res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
  }
};

export default auth;
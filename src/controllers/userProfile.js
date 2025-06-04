import bcrypt from "bcrypt";
import user from "../models/auth.js";
import emailService from '../services/email.js';
import code from '../utils/generateCode.js';
import {ERROR_MESSAGES} from '../utils/error.js';
import {CODE_EXPIRATION, RESEND_COOLDOWN} from '../utils/generateCode.js';

const auth = {};

auth.updateUsername = async (req, res) => {
  const sessionUser = req.session.user;
  const { newUsername } = req.body;

  try {    
    if (!newUsername) return res.status(400).json({ error: ERROR_MESSAGES.MISSING_FIELDS });

    await user.updateUsername(sessionUser.id, newUsername);
    req.session.user.username = newUsername;
    res.status(200).json({ success: true, redirectUrl: '/account' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR });
  }
};

auth.updateEmail = async (req, res) => {
  const sessionUser = req.session.user;
  const { newEmail } = req.body;
  
  try {
    if (!sessionUser) return res.status(401).json({ error: ERROR_MESSAGES.LOGIN_ERROR });

    if (sessionUser.email === newEmail) {
      return res.status(400).json({ error: ERROR_MESSAGES.EMAIL_REPEATED });
    }

    const alreadyExists = await user.userExists(newEmail);
    if (alreadyExists) {
      return res.status(400).json({ error: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS });
    }

    const verificationCode = code.generateCode();
    code.pendingUsers.set(newEmail, {
      code: verificationCode, expiresAt: Date.now() + CODE_EXPIRATION, userId: sessionUser.id});

    try {
      await emailService.sendVerification(newEmail, verificationCode);
      res.status(200).json({ success: true, message: 'Código enviado al nuevo correo.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: ERROR_MESSAGES.EMAIL_SEND_ERROR });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR });
  }
};

auth.resendCode = async (req, res) => {
  const { email, type = 'profile' } = req.body;
  const now = Date.now();
  const store = code.pendingUsers;

  try {
    const existing = store.get(email);
    
    if (existing?.lastSent && (now - existing.lastSent < RESEND_COOLDOWN)) {
      const remaining = Math.ceil((RESEND_COOLDOWN - (now - existing.lastSent)) / 1000);
      return res.status(429).json({
        error: ERROR_MESSAGES.RESEND_COOLDOWN.replace('{seconds}', remaining),
        resendTimer: remaining});
    }

    const newCode = code.generateCode();
    const expiresAt = now + CODE_EXPIRATION;

    store.set(email, {
      ...existing, code: newCode, expiresAt, lastSent: now,
      userId: existing?.userId});

    await emailService.sendEmail( 
      email, 'Nuevo código de verificación', `Tu nuevo código es: ${newCode}`);

    res.json({success: true, message: 'Código reenviado exitosamente',
      resendTimer: Math.ceil(RESEND_COOLDOWN / 1000)
    });

  } catch (error) {
    console.error('Error en resendCode:', error);
    res.status(500).json({error: ERROR_MESSAGES.RESEND_ERROR});
  }
};

auth.verifyEmailCode = async (req, res) => {
  const { newEmail, codeInput } = req.body;
  
  try {
    const result = code.validateCode(code.pendingUsers, newEmail, codeInput);

    if (result.error) return res.status(400).json({ error: result.error });

    await user.updateEmail(result.data.userId, newEmail);
    code.pendingUsers.delete(newEmail);
    req.session.user.email = newEmail; 
    res.status(200).json({ success: true, message: 'Correo actualizado exitosamente.', redirectUrl: '/account' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR });
  }
};

auth.updatePassword = async (req, res) => {
  const sessionUser = req.session.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    if (!sessionUser) return res.status(401).json({ error: ERROR_MESSAGES.LOGIN_ERROR });
    if (!newPassword || newPassword !== confirmPassword)
      return res.status(400).json({ error: ERROR_MESSAGES.PASSWORDS_DONT_MATCH });

    const foundUser = await user.findById(sessionUser.id);
    if (!foundUser) return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });

    const match = await bcrypt.compare(oldPassword, foundUser.password);
    if (!match) return res.status(400).json({ error: ERROR_MESSAGES.INCORRECT_PASSWORD });

    const saltRounds = 10;
    const hashed = await bcrypt.hash(newPassword, saltRounds);
    await user.updatePassword(sessionUser.id, hashed);
    res.status(200).json({ success: true, redirectUrl: '/account' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR });
  }
};

export default auth;
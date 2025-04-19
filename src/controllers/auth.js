import db from '../database/mobiles.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'darlinlvaldez@gmail.com',
    pass: 'stkj cxpx vveb mcon'
  }
});

const generateCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

const pendingUsers = new Map();

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('login/register', {
      error: 'Las contraseñas no coinciden.',
      email,
      username
    });
  }

  const [existing] = await db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
  if (existing.length) {
    return res.render('login/register', {
      error: 'Este correo ya está registrado.',
      email,
      username
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateCode();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  pendingUsers.set(email, { username, hashedPassword, code: verificationCode, expiresAt });

  await transporter.sendMail({
    from: 'La Vega Tech <nilradlvaldez@gmail.com>',
    to: email,
    subject: 'Verificación de correo',
    text: `Tu código de verificación es: ${verificationCode}. Este código expirará en 10 minutos.`
  });

  res.redirect(`/verify?email=${email}`);
};

export const showVerificationForm = (req, res) => {
  const { email } = req.query;
  res.render('login/verify', { email });
};

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const pending = pendingUsers.get(email);

  if (!pending) {
    return res.render('login/verify', { email, error: 'El código ha expirado o no se ha solicitado uno.' });
  }  

  const isExpired = Date.now() > pending.expiresAt;

  if (isExpired) {
    pendingUsers.delete(email);
    return res.render('login/verify', { email, error: 'El código ha expirado. Reenvíalo de nuevo.' });
  }

  if (pending.code !== code) {
    return res.render('login/verify', { email, error: 'Código inválido.' });
  }

  await db.query(
    `INSERT INTO usuarios (username, email, password, is_verified, verification_code) VALUES (?, ?, ?, 1, NULL)`,
    [pending.username, email, pending.hashedPassword]
  );

  pendingUsers.delete(email);

  res.redirect('/login');
};

export const resendCode = async (req, res) => {
    const { email } = req.body;
    const newCode = generateCode();
  
    await db.query(`UPDATE usuarios SET verification_code = ? WHERE email = ?`, [newCode, email]);
  
    await transporter.sendMail({
      from: 'la Vega Tech <darlinlvalde@gmail.com>',
      to: email,
      subject: 'Nuevo código de verificación',
      text: `Tu nuevo código es: ${newCode}`
    });
  
    res.redirect(`/verify?email=${email}&info=reenviado`);
  };

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    const [rows] = await db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
    if (!rows.length) {
      return res.render('login/login', { error: 'Correo no registrado', email });
    }
  
    const user = rows[0];
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login/login', { error: 'Contraseña incorrecta', email });
    }
  
    if (!user.is_verified) {
      return res.render('login/login', { error: 'Primero debes verificar tu correo', email });
    }
  
    return res.redirect('/');
  };

const resetPending = new Map();

export const recuperarPassword = async (req, res) => {
  const { email } = req.body;

  const [users] = await db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
  if (!users.length) {
    return res.render('login/email', { error: 'Correo no registrado', email });
  }

  const verificationCode = generateCode();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  resetPending.set(email, { code: verificationCode, expiresAt });

  await transporter.sendMail({
    from: 'La Vega Tech <darlinlvaldez@gmail.com>',
    to: email,
    subject: 'Código para recuperación de contraseña',
    text: `Tu código para restablecer la contraseña es: ${verificationCode}. Este código expirará en 10 minutos.`
  });

  res.render('login/code', { email, error: null });
};

export const verificarCodigoReset = (req, res) => {
  const { email, code } = req.body;
  const pending = resetPending.get(email);

  if (!pending) {
    return res.render('login/code', { email, error: 'El código ha expirado o no se ha solicitado uno.' });
  }

  if (Date.now() > pending.expiresAt) {
    resetPending.delete(email);
    return res.render('login/code', { email, error: 'El código ha expirado. Solicita uno nuevo.' });
  }

  if (pending.code !== code) {
    return res.render('login/code', { email, error: 'Código inválido.' });
  }

  res.render('login/newpass', { email, error: null });
};

export const reenviarCodigoReset = async (req, res) => {
  const { email } = req.body;
  const newCode = generateCode();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  resetPending.set(email, { code: newCode, expiresAt });

  await transporter.sendMail({
    from: 'La Vega Tech <darlinlvaldez@gmail.com>',
    to: email,
    subject: 'Nuevo código para recuperación de contraseña',
    text: `Tu nuevo código es: ${newCode}`
  });

  res.render('login/code', { email, error: null });
};

export const resetearPassword = async (req, res) => {
  const { email, password, confirm } = req.body;

  if (password !== confirm) {
    return res.render('login/newpass', { email, error: 'Las contraseñas no coinciden.' });
  }

  const pending = resetPending.get(email);
  if (!pending) {
    return res.render('login/email', { error: 'No hay solicitud de recuperación activa.', email });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(`UPDATE usuarios SET password = ? WHERE email = ?`, [hashedPassword, email]);

  resetPending.delete(email);

  res.redirect('/login');
};
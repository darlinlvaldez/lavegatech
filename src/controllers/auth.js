import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import config from '../../config.js';
import user from '../models/user.js';

const auth = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_SENDER,
    pass: config.EMAIL_PASSWORD
  }
});

const generateCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();
const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({ from: `La Vega Tech <${config.EMAIL_SENDER}>`, to, subject, text });
};

const renderError = (res, view, error, extras = {}) => {
  return res.render(view, { error, ...extras });
};

const hashPassword = password => bcrypt.hash(password, 10);

const validateCode = (map, email, code) => {
  const pending = map.get(email);
  if (!pending) return { error: 'El código ha expirado.' };
  if (Date.now() > pending.expiresAt) {map.delete(email);
    return { error: 'El código ha expirado. Solicita uno nuevo.'};
  }
  if (pending.code !== code) return { error: 'Código inválido.' };
  return { success: true, data: pending };
};

const pendingUsers = new Map();
const resetPending = new Map();

auth.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return renderError(res, 'login/register', 'Las contraseñas no coinciden.', { email, username });
  
  const alreadyExists = await user.userExists(email);
  if (alreadyExists)
    return renderError(res, 'login/register', 'Este correo ya está registrado.', { email, username });

  const hashedPassword = await hashPassword(password);
  const code = generateCode();
  pendingUsers.set(email, { username, hashedPassword, code, expiresAt: Date.now() + 10 * 60 * 1000 });

  await sendEmail(email, 'Verificación de correo', `Tu código de verificación es: ${code}. Expira en 10 minutos.`);
  res.redirect(`/verify?email=${email}`);
};

auth.showVerifyForm = (req, res) => res.render('login/verify', { email: req.query.email });

auth.verifyCode = async (req, res) => {
  const { email, code, type } = req.body;

  const store = type === 'reset' ? resetPending : pendingUsers;
  const result = validateCode(store, email, code);

  if (!result.success) {
    const view = type === 'reset' ? 'login/forgotPass/code' : 'login/verify';
    return renderError(res, view, result.error, { email });
  }

  if (type === 'reset') {
    return res.render('login/forgotPass/newpass', { email, error: null });
  }

  const { username, hashedPassword } = result.data;
  await user.insertUser({ username, email, password: hashedPassword });
  pendingUsers.delete(email);
  res.redirect('/login');
};

auth.resendCode = async (req, res) => {
  const { email, type } = req.body;
  const isReset = type === 'reset';

  const store = isReset ? resetPending : pendingUsers;
  const existing = store.get(email);
  const now = Date.now();

  if (existing && existing.lastSent && now - existing.lastSent < 3 * 60 * 1000) {
    const remaining = Math.ceil((3 * 60 * 1000 - (now - existing.lastSent)) / 1000);
    const msg = `Debes esperar ${remaining} segundos antes de reenviar el código.`;

    if (isReset) {
      return res.render('login/forgotPass/code', { email, error: msg });
    } else {
      return res.redirect(`/verify?email=${email}&info=espera`);
    }
  }

  const newCode = generateCode();
  const expiresAt = now + 10 * 60 * 1000;

  store.set(email, {...(existing || {}), code: newCode, expiresAt, lastSent: now});

  const subject = isReset
    ? 'Nuevo código para recuperación de contraseña'
    : 'Nuevo código de verificación';

  const text = `Tu nuevo código es: ${newCode}`;

  await sendEmail(email, subject, text);

  if (isReset) {
    return res.render('login/forgotPass/code', { email, error: null });
  } else {
    return res.redirect(`/verify?email=${email}&info=reenviado`);
  }
};

auth.login = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await user.getUserByEmail(email);
  if (!foundUser) return renderError(res, 'login/login', 'Correo no registrado', { email });
  
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) return renderError(res, 'login/login', 'Contraseña incorrecta', { email });
  if (!foundUser.is_verified) return renderError(res, 'login/login', 'Primero debes verificar tu correo', { email });

res.redirect('/');
};

auth.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const foundUser = await user.getUserByEmail(email);
  if (!foundUser) return renderError(res, 'login/forgotPass/email', 'Correo no registrado', { email });

  const code = generateCode();
  resetPending.set(email, { code, expiresAt: Date.now() + 10 * 60 * 1000 });
  await sendEmail(email, 'Código para recuperación de contraseña', `Tu código es: ${code}. Expira en 10 minutos.`);

  res.render('login/forgotPass/code', { email, error: null });
};

auth.updatePassword = async (req, res) => {
  const { email, password, confirm } = req.body;

  if (password !== confirm)
    return renderError(res, 'login/forgotPass/newpass', 'Las contraseñas no coinciden.', { email });

  if (!resetPending.get(email))
    return renderError(res, 'login/forgotPass/email', 'No hay solicitud de recuperación activa.', { email });

  const hashed = await hashPassword(password);
  await user.updatePassword(email, hashed);

  resetPending.delete(email);
  res.redirect('/login');
};

auth.formEmail = async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  if (!nombre || !correo || !asunto || !mensaje) {
    return res.render('store/contact', {
      error: 'Todos los campos son obligatorios.',
      nombre, correo, asunto, mensaje});
  }

  const mailOptions = {
    from: `"${nombre}" <${correo}>`,
    to: config.EMAIL_SENDER,
    subject: asunto,
    text: `Mensaje de ${nombre} <${correo}>:\n\n${mensaje}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/mobiles/contact');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return res.render('store/contact', {
      error: 'Ocurrió un error al enviar el correo.',
      nombre, correo, asunto, mensaje});
  }
};

export default auth;
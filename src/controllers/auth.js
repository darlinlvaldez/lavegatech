import bcrypt from 'bcrypt';
import config from '../../config.js';
import user from '../models/auth.js';
import emailService from '../services/email.js';
import code from '../utils/generateCode.js';
import { ERROR_MESSAGES } from '../utils/error.js';

const auth = {};

const renderError = (res, view, error, extras = {}) => {
  return res.render(view, { error, ...extras });
};

auth.register = async (req, res) => {
  try {
    const { username, email: correo, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return renderError(res, 'login/register', ERROR_MESSAGES.PASSWORDS_DONT_MATCH, { email: correo, username });

    const alreadyExists = await user.userExists(correo);
    if (alreadyExists)
      return renderError(res, 'login/register', ERROR_MESSAGES.EMAIL_ALREADY_EXISTS, { email: correo, username });

    const hashedPassword = await code.hashPassword(password);
    const generatedCode = await code.generateCode();

    code.pendingUsers.set(correo, {
      username,
      hashedPassword,
      code: generatedCode,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    await emailService.sendVerification(correo, generatedCode);
    res.redirect(`/verify?email=${correo}`);
  } catch (error) {
    console.error(error);
    return renderError(res, 'login/register', ERROR_MESSAGES.REGISTRATION_ERROR);
  }
};

auth.showVerifyForm = (req, res) => res.render('login/verify', { email: req.query.email });

auth.verifyCode = async (req, res) => {
  try {
    const { email, code: userCode, type } = req.body;
    const store = type === 'reset' ? code.resetPending : code.pendingUsers;
    const result = code.validateCode(store, email, userCode);

    if (!result.success) {
      const view = type === 'reset' ? 'login/forgotPass/code' : 'login/verify';
      return renderError(res, view, ERROR_MESSAGES.INVALID_CODE, { email });
    }

    if (type === 'reset') {
      return res.render('login/forgotPass/newpass', { email, error: null });
    }

    const { username, hashedPassword } = result.data;
    await user.insertUser({ username, email, password: hashedPassword });
    code.pendingUsers.delete(email);
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    const view = req.body.type === 'reset' ? 'login/forgotPass/code' : 'login/verify';
    return renderError(res, view, ERROR_MESSAGES.VERIFICATION_ERROR, { email: req.body.email });
  }
};

auth.resendCode = async (req, res) => {
  try {
    const { email, type } = req.body;
    const isReset = type === 'reset';
    const store = isReset ? code.resetPending : code.pendingUsers;
    const existing = store.get(email);
    const now = Date.now();

    if (existing && existing.lastSent && now - existing.lastSent < 3 * 60 * 1000) {
      const remaining = Math.ceil((3 * 60 * 1000 - (now - existing.lastSent)) / 1000);
      const msg = ERROR_MESSAGES.RESEND_COOLDOWN.replace('{seconds}', remaining);

      if (isReset) {
        return res.render('login/forgotPass/code', { email, error: msg });
      } else {
        return res.redirect(`/verify?email=${email}&info=espera`);
      }
    }

    const newCode = code.generateCode();
    const expiresAt = now + 10 * 60 * 1000;

    store.set(email, { ...(existing || {}), code: newCode, expiresAt, lastSent: now });

    const subject = isReset
      ? 'Nuevo código para recuperación de contraseña'
      : 'Nuevo código de verificación';

    const text = `Tu nuevo código es: ${newCode}`;
    await emailService.sendEmail(email, subject, text);

    if (isReset) {
      return res.render('login/forgotPass/code', { email, error: null });
    } else {
      return res.redirect(`/verify?email=${email}&info=reenviado`);
    }
  } catch (error) {
    console.error(error);
    const view = req.body.type === 'reset' ? 'login/forgotPass/code' : 'login/verify';
    return renderError(res, view, ERROR_MESSAGES.RESEND_ERROR, { email: req.body.email });
  }
};

auth.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await user.findByEmail(email);
    if (!foundUser) return renderError(res, 'login/login', ERROR_MESSAGES.USER_NOT_FOUND, { email });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return renderError(res, 'login/login', ERROR_MESSAGES.WRONG_PASSWORD, { email });

    if (!foundUser.is_verified)
      return renderError(res, 'login/login', ERROR_MESSAGES.UNVERIFIED_EMAIL, { email });

    req.session.user = {
      id: foundUser.id, email: foundUser.email, username: foundUser.username};

    res.redirect('/');
  } catch (error) {
    console.error(error);
    return renderError(res, 'login/login', ERROR_MESSAGES.LOGIN_ERROR);
  }
};

auth.email = async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await user.findByEmail(email);

    if (!foundUser)
      return renderError(res, 'login/forgotPass/email', ERROR_MESSAGES.USER_NOT_FOUND, { email });

    const codeUser = code.generateCode();
    code.resetPending.set(email, {
      code: codeUser,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    await emailService.sendEmail(
      email,
      'Código para recuperación de contraseña',
      `Tu código es: ${codeUser}. Expira en 10 minutos.`
    );

    res.render('login/forgotPass/code', { email, error: null });
  } catch (error) {
    console.error(error);
    return renderError(res, 'login/forgotPass/email', ERROR_MESSAGES.SERVER_ERROR);
  }
};

auth.forgotPassword = async (req, res) => {
  try {
    const { email, password, confirm } = req.body;

    if (password !== confirm)
      return renderError(res, 'login/forgotPass/newpass', ERROR_MESSAGES.PASSWORDS_DONT_MATCH, { email });

    if (!code.resetPending.get(email))
      return renderError(res, 'login/forgotPass/email', ERROR_MESSAGES.NO_RESET_REQUEST, { email });

    const hashed = await code.hashPassword(password);
    await user.forgotPassword(email, hashed);

    code.resetPending.delete(email);
    res.redirect('/login');
  } catch (error) {console.error(error);
    return renderError(res, 'login/forgotPass/newpass', ERROR_MESSAGES.PASSWORD_RESET_ERROR, 
    { email: req.body.email });
  }
};

auth.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};

auth.formEmail = async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  if (!nombre || !correo || !asunto || !mensaje) {
    return res.render('store/contact', {
      error: ERROR_MESSAGES.MISSING_FIELDS,
      nombre, correo, asunto, mensaje
    });
  }

  const formattedMessage = `Mensaje de ${nombre} <${correo}>:\n\n${mensaje}`;

  try {
    await emailService.sendEmail(config.EMAIL_SENDER, asunto, formattedMessage);
    res.redirect('/contact');
  } catch (error) {console.error('Error al enviar correo:', error);
    return res.render('store/contact', {error: ERROR_MESSAGES.EMAIL_SEND_ERROR,
      nombre, correo, asunto, mensaje});
    }
  };

export default auth;
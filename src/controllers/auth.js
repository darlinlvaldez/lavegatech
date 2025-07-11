import bcrypt from 'bcrypt';
import config from '../../config.js';
import user from '../models/auth.js';
import emailService from '../services/email.js';
import code from '../utils/generateCode.js';
import {ERROR_MESSAGES, renderError} from '../utils/error.js';
import {CODE_EXPIRATION, RESEND_COOLDOWN} from '../utils/generateCode.js';

const auth = {};

auth.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (req.validationError) {
      return renderError(res, 'login/register', null, { 
        email, username, validationErrors: req.validationError.fields});
    }
    
    if (password !== confirmPassword) {
      return renderError(res, 'login/register', ERROR_MESSAGES.PASSWORDS_DONT_MATCH, {
        email, username, validationErrors: {password: ERROR_MESSAGES.PASSWORDS_DONT_MATCH, 
          confirmPassword: ERROR_MESSAGES.PASSWORDS_DONT_MATCH}
      });
    }

    if (await user.userExists(email)) {
      return renderError(res, 'login/register', ERROR_MESSAGES.EMAIL_ALREADY_EXISTS, {
        email, username, validationErrors: { email: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS }
      });
    }

    const hashedPassword = await code.hashPassword(password);
    const generatedCode = code.generateCode();
    const userData = { username, hashedPassword, code: generatedCode,
      expiresAt: Date.now() + CODE_EXPIRATION, lastSent: Date.now()};

    code.pendingUsers.set(email, userData);
    await emailService.sendVerification(email, generatedCode);

    const cooldown = Math.ceil(RESEND_COOLDOWN / 1000);
    
    return res.render('login/verify', {email, type: 'verify', error: null, 
      validationErrors: {}, cooldown});

  } catch (error) {
    console.error(error);
    return renderError(res, 'login/register', ERROR_MESSAGES.REGISTRATION_ERROR, {
      email: req.body.email, username: req.body.username, validationErrors: {} 
    });
  }
};

auth.verifyCode = async (req, res) => {
  try {
    const { email, code: userCode, type } = req.body;
    const store = type === 'reset' ? code.resetPending : code.pendingUsers;

    if (req.validationError) {
      return renderError(res, 'login/verify', null, {
        email, type, validationErrors: req.validationError.fields});
    }

    const result = code.validateCode(store, email, userCode);
    if (!result.success) {
      return renderError(res, 'login/verify', ERROR_MESSAGES.INVALID_CODE, {
        email, type, validationErrors: {code: ERROR_MESSAGES.INVALID_CODE} });
    }

    if (type === 'reset') {
      return res.render('login/forgotPass/newpass', {
        email, error: null, validationErrors: {} });
    }

    const {username, hashedPassword} = result.data;
    const newUser = await user.insertUser({ username, email, password: hashedPassword });
    code.pendingUsers.delete(email);

    req.session.user = {id: newUser.id, username: newUser.username, email: newUser.email};

    return res.redirect('/');

  } catch (error) {
    console.error(error);
    return renderError(res, 'login/verify', ERROR_MESSAGES.VERIFICATION_ERROR, {
      email: req.body.email, type: req.body.type, validationErrors: {}
    });
  }
};

auth.resendCode = async (req, res) => {
  try {
    const {email, type} = req.body;
    const isReset = type === 'reset';
    const store = isReset ? code.resetPending : code.pendingUsers;
    const existing = store.get(email);
    const now = Date.now();

    if (req.validationError) {
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(400).json({ error: 'Error de validación', validationErrors: req.validationError.fields });
      }
      return renderError(res, 'login/verify', null, {
        email, type, validationErrors: req.validationError.fields
      });
    }

    if (existing && existing.lastSent && existing.lastSent !== 0 && (now - existing.lastSent < RESEND_COOLDOWN)) {
      const remaining = Math.ceil((RESEND_COOLDOWN - (now - existing.lastSent)) / 1000);
      const msg = ERROR_MESSAGES.RESEND_COOLDOWN.replace('{seconds}', remaining);
      
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(429).json({ error: msg, cooldown: remaining });
      }
      
      return renderError(res, 'login/verify', msg, {
        email, type, validationErrors: {}, cooldown: remaining
      });
    }

    const newCode = code.generateCode();
    const expiresAt = now + CODE_EXPIRATION;

    store.set(email, { ...existing, code: newCode, expiresAt, lastSent: now });

    const subject = isReset ? 'Nuevo código para recuperación de contraseña' : 'Nuevo código de verificación';
    await emailService.sendEmail(email, subject, `Tu nuevo código es: ${newCode}`);

    const cooldown = Math.ceil(RESEND_COOLDOWN / 1000);

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ success: true, cooldown });
    }

    return res.render('login/verify', {
      email, type, error: null, validationErrors: {}, 
      info: isReset ? null : 'reenviado', cooldown
    });

  } catch (error) {
    console.error(error);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(500).json({ error: ERROR_MESSAGES.RESEND_ERROR });
    }
    return renderError(res, 'login/verify', ERROR_MESSAGES.RESEND_ERROR, {
      email: req.body.email, type: req.body.type, validationErrors: {}
    });
  }
};

auth.login = async (req, res) => {
  try {
    if (req.validationError) {
      return renderError(res, 'login/login', null, {
        email: req.body.email, validationErrors: req.validationError.fields
      });
    }

    const { email, password } = req.body;

    const foundUser = await user.findByEmail(email);
    if (!foundUser) {
      return renderError(res, 'login/login', ERROR_MESSAGES.USER_NOT_FOUND, { 
        email,validationErrors: {email: ERROR_MESSAGES.USER_NOT_FOUND} });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return renderError(res, 'login/login', ERROR_MESSAGES.WRONG_PASSWORD, { 
        email, validationErrors: {password: ERROR_MESSAGES.WRONG_PASSWORD} }); 
    }

    if (!foundUser.is_active) {
      return renderError(res, 'login/login', ERROR_MESSAGES.ACCOUNT_BLOCKED, { 
        email, validationErrors: { email: ERROR_MESSAGES.ACCOUNT_BLOCKED} });
    }
      
    req.session.user = {id: foundUser.id, email: foundUser.email, username: foundUser.username};
      
  res.redirect('/');
} catch (error) {console.error(error);
  return renderError(res, 'login/login', ERROR_MESSAGES.LOGIN_ERROR, {
    email: req.body.email, validationErrors: {} });
  }
};
  
auth.email = async (req, res) => {
  try {
    const { email } = req.body;

    if (req.validationError) {
      return renderError(res, 'login/forgotPass/email', null, { 
        email, validationErrors: req.validationError.fields 
      });
    }

    if (!await user.findByEmail(email)) {
      return renderError(res, 'login/forgotPass/email', ERROR_MESSAGES.USER_NOT_FOUND, { 
        email, validationErrors: { email: ERROR_MESSAGES.USER_NOT_FOUND }
      });
    }

    const now = Date.now();
    const existing = code.resetPending.get(email);

    if (existing?.lastSent && now - existing.lastSent < RESEND_COOLDOWN) {
      const remaining = Math.ceil((RESEND_COOLDOWN - (now - existing.lastSent)) / 1000);
      const msg = ERROR_MESSAGES.RESEND_COOLDOWN.replace('{seconds}', remaining);

      return res.render('login/verify', {email, type: 'reset', 
        error: msg, validationErrors: {}, cooldown: remaining});
    }

    const codeUser = code.generateCode();
    const expiresAt = now + CODE_EXPIRATION;

    code.resetPending.set(email, {
      code: codeUser, expiresAt, lastSent: now
    });

    await emailService.sendEmail(email,
      'Código para recuperación de contraseña',
      `Tu código es: ${codeUser}. Expira en 10 minutos.`
    );

    const cooldown = Math.ceil(RESEND_COOLDOWN / 1000);

    return res.render('login/verify', {email, type: 'reset',
      error: null, validationErrors: {}, cooldown});

  } catch (error) {
    console.error(error);
    return renderError(res, 'login/forgotPass/email', ERROR_MESSAGES.SERVER_ERROR, {
      email: req.body.email, validationErrors: {}
    });
  }
};

auth.forgotPassword = async (req, res) => {
  try {
    const { email, password, confirm } = req.body;

    if (req.validationError) {
      return renderError(res, 'login/forgotPass/newpass', null, { 
        email, validationErrors: req.validationError.fields});
    }

    if (password !== confirm) {
      return renderError(res, 'login/forgotPass/newpass', ERROR_MESSAGES.PASSWORDS_DONT_MATCH, { 
        email, validationErrors: {password: ERROR_MESSAGES.PASSWORDS_DONT_MATCH,
          confirm: ERROR_MESSAGES.PASSWORDS_DONT_MATCH} });
       }

    if (!code.resetPending.get(email)) {
      return renderError(res, 'login/forgotPass/newpass', ERROR_MESSAGES.NO_RESET_REQUEST, { 
        email, validationErrors: {email: ERROR_MESSAGES.NO_RESET_REQUEST} });
     }

    const hashed = await code.hashPassword(password);
    await user.forgotPassword(email, hashed);
    code.resetPending.delete(email);
    
    res.redirect('/login');
  } catch (error) {console.error(error);
    return renderError(res, 'login/forgotPass/newpass', ERROR_MESSAGES.PASSWORD_RESET_ERROR, { 
      email: req.body.email, validationErrors: {} });
  }
};

auth.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {console.error('Error al cerrar sesión:', err);
      return res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};

auth.formEmail = async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (req.validationError) {
    return renderError(res, 'store/contact', null, {
      nombre, email, asunto, mensaje, success: false,
      validationErrors: req.validationError.fields
    });
  }

  if (!nombre || !email || !asunto || !mensaje) {
    return renderError(res, 'store/contact', ERROR_MESSAGES.MISSING_FIELDS, {
      nombre, email, asunto, mensaje, success: false,
      validationErrors: {nombre: !nombre && ERROR_MESSAGES.REQUIRED_FIELD,
        email: !email && ERROR_MESSAGES.REQUIRED_FIELD,
        asunto: !asunto && ERROR_MESSAGES.REQUIRED_FIELD,
        mensaje: !mensaje && ERROR_MESSAGES.REQUIRED_FIELD}
    });
  }

  try {
    await emailService.sendEmail(config.EMAIL_SENDER, asunto, `Mensaje de ${nombre} <${email}>:\n\n${mensaje}`);
      res.render('store/contact', {nombre: '', email: '', asunto: '', mensaje: '', 
        success: true , error: null, validationErrors: {} });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return renderError(res, 'store/contact', ERROR_MESSAGES.EMAIL_SEND_ERROR, {
      nombre, email, asunto, mensaje, validationErrors: {} });
  }
};

export default auth;
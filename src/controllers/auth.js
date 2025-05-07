import bcrypt from 'bcrypt';
import config from '../../config.js';
import user from '../models/auth.js';
import emailService from '../services/email.js';
import code from '../utils/generateCode.js';
import { ERROR_MESSAGES } from '../utils/error.js';
import { renderError } from '../utils/error.js';

const auth = {};

auth.register = async (req, res) => {
  try {
    const { username, email: correo, password, confirmPassword } = req.body;

    if (req.validationError) {
      return renderError(res, 'login/register', null, { 
        email: correo, username, validationErrors: req.validationError.fields});
    }

    if (password !== confirmPassword) {
      return renderError(res, 'login/register', 'Las contraseñas no coinciden', { 
        email: correo, username, validationErrors: 
        { password: ERROR_MESSAGES.PASSWORDS_DONT_MATCH, confirmPassword: ERROR_MESSAGES.PASSWORDS_DONT_MATCH }
      });
    }

    const alreadyExists = await user.userExists(correo);
    if (alreadyExists) {
      return renderError(res, 'login/register', 'El correo ya está registrado', { 
        email: correo, username,
        validationErrors: { email: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS }
      });
    }

    const hashedPassword = await code.hashPassword(password);
    const generatedCode = await code.generateCode();

    code.pendingUsers.set(correo, {
      username, hashedPassword, code: generatedCode, expiresAt: Date.now() + 10 * 60 * 1000
    });

    await emailService.sendVerification(correo, generatedCode);
    res.redirect(`/verify?email=${correo}`);
  } catch (error) {console.error(error);
    return renderError(res, 'login/register', ERROR_MESSAGES.REGISTRATION_ERROR, {
      email: req.body.email, username: req.body.username, validationErrors: {} });
    }
  };

auth.showVerifyForm = (req, res) => res.render('login/verify', { email: req.query.email });

auth.verifyCode = async (req, res) => {
  try {
    const { email, code: userCode, type } = req.body;
    const store = type === 'reset' ? code.resetPending : code.pendingUsers;

    if (req.validationError) {
      const view = type === 'reset' ? 'login/forgotPass/code' : 'login/verify';
      return renderError(res, view, null, {email, validationErrors: req.validationError.fields});
    }

    const result = code.validateCode(store, email, userCode);

    if (!result.success) {
      const view = type === 'reset' ? 'login/forgotPass/code' : 'login/verify';
      return renderError(res, view, ERROR_MESSAGES.INVALID_CODE, { 
        email, validationErrors: {code: ERROR_MESSAGES.INVALID_CODE}});
    }

    if (type === 'reset') {
      return res.render('login/forgotPass/newpass', { 
        email, error: null, validationErrors: {}});
    }

    const { username, hashedPassword } = result.data;
    await user.insertUser({ username, email, password: hashedPassword });
    code.pendingUsers.delete(email);
    
    res.redirect('/login');

  } catch (error) {console.error(error);
    const view = req.body.type === 'reset' ? 'login/forgotPass/code' : 'login/verify';
    return renderError(res, view, ERROR_MESSAGES.VERIFICATION_ERROR, { 
      email: req.body.email, validationErrors: {} });
  }
};

auth.resendCode = async (req, res) => {
  try {
    const { email, type } = req.body;
    const isReset = type === 'reset';
    const store = isReset ? code.resetPending : code.pendingUsers;
    const existing = store.get(email);
    const now = Date.now();

    if (req.validationError) {
      const view = isReset ? 'login/forgotPass/code' : 'login/verify';
      return renderError(res, view, null, {
        email, validationErrors: req.validationError.fields});
    }

    if (existing && existing.lastSent && now - existing.lastSent < 3 * 60 * 1000) {
      const remaining = Math.ceil((3 * 60 * 1000 - (now - existing.lastSent)) / 1000);
      const msg = ERROR_MESSAGES.RESEND_COOLDOWN.replace('{seconds}', remaining);

      if (isReset) {
        return renderError(res, 'login/forgotPass/code', msg, { email });
      } else {
        return res.redirect(`/verify?email=${email}&info=espera`);
      }
    }

    const newCode = code.generateCode();
    const expiresAt = now + 10 * 60 * 1000;

    store.set(email, {...(existing || {}), code: newCode, expiresAt, lastSent: now});

    const subject = isReset
    ? 'Nuevo código para recuperación de contraseña' : 'Nuevo código de verificación';

    const text = `Tu nuevo código es: ${newCode}`;
    await emailService.sendEmail(email, subject, text);

    if (isReset) {
      return res.render('login/forgotPass/code', { 
        email, error: null, validationErrors: {} });
    } else {
      return res.redirect(`/verify?email=${email}&info=reenviado`);
    }
  } catch (error) {
    console.error(error);
    const view = req.body.type === 'reset' ? 'login/forgotPass/code' : 'login/verify';
    return renderError(res, view, ERROR_MESSAGES.RESEND_ERROR, { 
      email: req.body.email, validationErrors: {} });
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

    if (!foundUser.is_verified) {
      return renderError(res, 'login/login', ERROR_MESSAGES.UNVERIFIED_EMAIL, { 
        email, validationErrors: { email: ERROR_MESSAGES.UNVERIFIED_EMAIL} });
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
        email: req.body.email, validationErrors: req.validationError.fields});
    }
    
    const foundUser = await user.findByEmail(email);
    if (!foundUser) {
      return renderError(res, 'login/forgotPass/email', ERROR_MESSAGES.USER_NOT_FOUND, { 
        email, validationErrors: {email: ERROR_MESSAGES.USER_NOT_FOUND} });
      }
        
    const codeUser = code.generateCode();
    code.resetPending.set(email, {code: codeUser, expiresAt: Date.now() + 10 * 60 * 1000});
        
    await emailService.sendEmail(email, 'Código para recuperación de contraseña', 
      `Tu código es: ${codeUser}. Expira en 10 minutos.`);
          
    res.render('login/forgotPass/code', {email, error: null, validationErrors: {} });
  } catch (error) {console.error(error);
    return renderError(res, 'login/forgotPass/email', ERROR_MESSAGES.SERVER_ERROR, {
      email: req.body.email, validationErrors: {} });
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
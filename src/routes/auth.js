import express from 'express';
import { register, showVerificationForm, verifyCode, resendCode, login, recuperarPassword, verificarCodigoReset, reenviarCodigoReset, resetearPassword } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify', showVerificationForm);
router.post('/verificar', verifyCode);
router.post('/reenviar-codigo', resendCode);
router.post('/login', login); 

router.get('/recuperar', (req, res) => {
    res.render('login/email', { error: null, email: null });
  });
  
  router.post('/recuperar', recuperarPassword);
  router.post('/verificar-reset', verificarCodigoReset);
  router.post('/reenviar-reset', reenviarCodigoReset);
  router.post('/reset-password', resetearPassword);
  
export default router;
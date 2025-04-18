import express from 'express';
import { register, showVerificationForm, verifyCode, resendCode, login } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify', showVerificationForm);
router.post('/verificar', verifyCode);
router.post('/reenviar-codigo', resendCode);
router.post('/login', login); // Asegúrate que apunte a la función que acabamos de definir


export default router;
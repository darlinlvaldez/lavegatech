import express from 'express';
import auth from '../controllers/auth.js';

const router = express.Router();

// LOGIN
router.get('/verify', auth.showVerifyForm);
router.post('/register', auth.register);
router.post('/verifyCode', auth.verifyCode);
router.post('/resendCode', auth.resendCode);
router.post('/login', auth.login); 

// FORGOT-PASSWORD
router.post('/forgotPassword', auth.forgotPassword);
router.post('/verifyResetCode', auth.verifyResetCode);
router.post('/newPassword', auth.updatePassword);

export default router;
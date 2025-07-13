import express from 'express';
import user from '../controllers/userProfile.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/user.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/resend-email-timer', isAuth(), user.getResendTimer);
router.post('/update-username', isAuth(), validate(request.updateUsername), user.updateUsername);
router.post('/update-email', isAuth(), validate(request.updateEmail), user.updateEmail);
router.post('/verify-email-code', isAuth(), validate(request.verifyEmailCode), user.verifyEmailCode);
router.post('/resend-email-code', isAuth(), user.resendCode);
router.post('/update-password', isAuth(), validate(request.updatePassword), user.updatePassword);

export default router;

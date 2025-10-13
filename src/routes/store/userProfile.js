import express from 'express';
import user from '../../controllers/store/userProfile.js';
import validate from '../../middlewares/validateRequest.js';
import request from '../schemas/user.js';
import { isAuth } from '../../middlewares/auth.js';

const router = express.Router();

router.use(isAuth());

router.get('/resend-email-timer', user.getResendTimer);
router.post('/resend-email-code', user.resendCode);
router.post('/update-username', validate(request.updateUsername), user.updateUsername);
router.post('/update-email', validate(request.updateEmail), user.updateEmail);
router.post('/verify-email-code', validate(request.verifyEmailCode), user.verifyEmailCode);
router.post('/update-password', validate(request.updatePassword), user.updatePassword);

export default router;
import express from 'express';
import auth from '../../controllers/store/auth.js';
import validate from '../../middlewares/validateRequest.js';
import request from '../schemas/auth.js';
import { isAuth } from '../../middlewares/auth.js';

const router = express.Router();

// LOGIN
router.post('/logout', isAuth(), auth.logout);
router.post('/login', validate(request.login), auth.login); 
router.post('/register', validate(request.register), auth.register);

// LOGIN AND FORGOT-PASSWORD
router.post('/verifyCode', validate(request.verifyCode), auth.verifyCode);
router.post('/resendCode', auth.resendCode);    

// FORGOT-PASSWORD
router.post('/email', validate(request.email), auth.email);
router.post('/newPassword', validate(request.forgotPassword), auth.forgotPassword);

// SEND EMAIL CONTACT
router.post('/contact', validate(request.formEmail), auth.formEmail);

// AUTHENTICATED
router.get('/status', (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

export default router;
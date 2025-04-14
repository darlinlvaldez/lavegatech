import express from 'express';
import auth from '../controllers/auth.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/auth.js';

const router = express.Router();

router.get('/portal', auth.portal)

router.post('/register', validate(request.register), auth.register);
router.post('/login',  validate(request.login), auth.login);
router.post('/authenticate', validate(request.authenticate), auth.authenticate);
router.post('/verify', validate(request.verify), auth.verify);

export default router;
import express from 'express';
import auth from '../controllers/auth.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/user.js';

const router = express.Router();

router.patch('/:username', validate(request.update), auth.update);
router.patch('/:username/password', validate(request.updatePassword), auth.updatePassword); 

router.post('/import', auth.import);

export default router;
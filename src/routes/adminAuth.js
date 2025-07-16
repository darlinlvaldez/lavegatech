import express from 'express';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/admin.js';
import adminAuth from '../controllers/adminAuth.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/usuarios', isAdmin(), adminAuth.listarAdmins);
router.post('/usuarios', isAdmin(), validate(request.user), adminAuth.crearAdmin);
router.put('/usuarios/:id', isAdmin(), validate(request.user), adminAuth.editarAdmin);
router.patch('/usuarios/:id/estado', isAdmin(), adminAuth.cambiarEstado);
router.delete('/usuarios/:id', isAdmin(), adminAuth.borrarAdmin);

router.post('/login', validate(request.login), adminAuth.login);
router.post('/logout', isAdmin(), adminAuth.logout)

export default router;
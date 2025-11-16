import express from 'express';
import validate from '../../middlewares/validateRequest.js';
import request from '../schemas/admin.js';
import adminAuth from '../../controllers/admin/auth.js';
import { isAdmin, requireRole } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/usuarios', isAdmin(), requireRole('superadmin'), adminAuth.listarAdmins);
router.post('/usuarios', isAdmin(), requireRole('superadmin'), validate(request.userAdmin), adminAuth.crearAdmin);
router.put('/usuarios/:id', isAdmin(), requireRole('superadmin'), validate(request.userAdmin), adminAuth.editarAdmin);
router.patch('/usuarios/:id/estado', isAdmin(), requireRole('superadmin'), validate(request.cambiarEstado), adminAuth.cambiarEstado);
router.delete('/usuarios/:id', isAdmin(), requireRole('superadmin'), adminAuth.borrarAdmin);

router.post('/login', validate(request.login), adminAuth.login);
router.post('/logout', isAdmin(), adminAuth.logout);

export default router;
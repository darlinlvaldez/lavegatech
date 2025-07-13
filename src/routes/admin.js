import express from 'express';
import admin from '../controllers/admin.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.use(isAdmin());

// Productos
router.get('/productos', admin.listarItems);
router.post('/productos', admin.crearItems);
router.put('/productos/:id', admin.editarItems);
router.delete('/productos/:id', admin.borrarItems);
router.get('/categorias', admin.listarCategorias);
router.get('/marcas', admin.listarMarcas);

// Usuarios
router.get('/usuarios', admin.listarUsuarios);
router.patch('/usuarios/:id/estado', admin.actualizarEstado);

// Pedidos
router.get('/pedidos', admin.listarPedidos);
router.get('/pedidos/:id', admin.detallePedido);

// Variantes
router.get('/variantes', admin.listarVariantes);
router.post('/variantes', admin.crearVariante);
router.put('/variantes/:id', admin.editarVariante);
router.delete('/variantes/:id', admin.borrarVariante);

export default router;
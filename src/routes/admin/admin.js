import express from 'express';
import admin from '../../controllers/admin/admin.js';
import validate from '../../middlewares/validateRequest.js';
import request from '../schemas/admin.js';
import { isAdmin, requireRole } from '../../middlewares/auth.js';

const router = express.Router();

router.use(isAdmin());

// Panel Admin 
router.get('/panel',  requireRole('superadmin', 'admin', 'editor', 'ventas', 'transportista'), admin.adminDashboard);
router.get('/ventas-por-fecha',  requireRole('superadmin', 'admin', 'ventas'), admin.graficoVentas);
router.get('/top-productos', requireRole('superadmin', 'admin', 'ventas'), admin.topProductos);
router.post('/orders/:id/estado-envio',  requireRole('superadmin', 'admin', 'transportista'), admin.estadoEnvio);

// Productos
router.get('/productos',  requireRole('superadmin', 'admin', 'editor'), admin.listarItems);
router.post('/productos',  requireRole('superadmin', 'admin', 'editor'), validate(request.product), admin.crearItems);
router.put('/productos/:id',  requireRole('superadmin', 'admin', 'editor'), validate(request.product), admin.editarItems);
router.delete('/productos/:id',  requireRole('superadmin', 'admin'), admin.borrarItems);
router.patch('/productos/:id/itemEstado', requireRole('superadmin', 'admin', 'editor'), admin.productoEstado);
    
// Variantes
router.get('/variantes',  requireRole('superadmin', 'admin', 'editor'), admin.listarVariantes);
router.post('/variantes',  requireRole('superadmin', 'admin', 'editor'), validate(request.variant), admin.crearVariante);
router.put('/variantes/:id',  requireRole('superadmin', 'admin', 'editor'), validate(request.variant), admin.editarVariante);
router.delete('/variantes/:id',  requireRole('superadmin', 'admin'), admin.borrarVariante);
router.post('/variantes/upload',  requireRole('superadmin', 'admin', 'editor'), admin.imagenArchivo);

// Marcas
router.get('/marcas',  requireRole('superadmin', 'admin', 'editor'), admin.listarMarcas);
router.post('/marcas',  requireRole('superadmin', 'admin'), validate(request.brand), admin.crearMarca);
router.put('/marcas/:id',  requireRole('superadmin', 'admin'), validate(request.brand), admin.editarMarca);
router.delete('/marcas/:id',  requireRole('superadmin', 'admin'), admin.borrarMarca);

// Categorías
router.get('/categorias',  requireRole('superadmin', 'admin', 'editor'), admin.listarCategorias);
router.post('/categorias',  requireRole('superadmin', 'admin'), validate(request.category), admin.agregarCategoria); 
router.put('/categorias/:id',  requireRole('superadmin', 'admin'), validate(request.category), admin.editarCategoria); 
router.delete('/categorias/:id',  requireRole('superadmin', 'admin'), admin.borrarCategoria);

// Ciudades de envíos
router.get('/ciudades',  requireRole('superadmin', 'admin', 'ventas', 'transportista'), admin.listarCiudades);
router.post('/ciudades',  requireRole('superadmin', 'admin', 'ventas'), validate(request.shipping), admin.crearCiudad);
router.put('/ciudades/:id',  requireRole('superadmin', 'admin', 'ventas'), validate(request.shipping), admin.editarCiudad);
router.delete('/ciudades/:id',  requireRole('superadmin', 'admin', 'ventas'), admin.borrarCiudad);

// RAM y Almacenamiento 
router.get('/ram',  requireRole('superadmin', 'admin', 'editor'), admin.listarRAM);
router.get('/almacenamiento',  requireRole('superadmin', 'admin', 'editor'), admin.listarAlm);

// Pedidos 
router.get('/orders',  requireRole('superadmin', 'admin',  'ventas', 'transportista'), admin.listarPedidos);
router.get('/orders/:id',  requireRole('superadmin', 'admin',  'ventas', 'transportista'), admin.detallePedido);

// Usuarios/Clientes
router.get('/usuarios',  requireRole('superadmin', 'admin'), admin.listarUsuarios);
router.patch('/usuarios/:id/estado',  requireRole('superadmin', 'admin'), admin.actualizarEstado);

export default router;
import express from 'express';
import admin from '../controllers/admin.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/admin.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.use(isAdmin());

// Panel Admin
router.get('/panel', admin.adminDashboard);
router.get('/ventas-por-fecha', admin.graficoVentas);
router.post('/orders/:id/estado-envio', admin.estadoEnvio);

// Productos
router.get('/productos', admin.listarItems);
router.post('/productos', validate(request.product), admin.crearItems);
router.put('/productos/:id', validate(request.product), admin.editarItems);
router.delete('/productos/:id', admin.borrarItems);

// Variantes
router.get('/variantes', admin.listarVariantes);
router.post('/variantes', validate(request.variant), admin.crearVariante);
router.put('/variantes/:id', validate(request.variant), admin.editarVariante);
router.delete('/variantes/:id', admin.borrarVariante);

// Marcas
router.get('/marcas', admin.listarMarcas);
router.post('/marcas', validate(request.brand), admin.crearMarca);
router.put('/marcas/:id', validate(request.brand), admin.editarMarca);
router.delete('/marcas/:id', admin.borrarMarca);

// Cateogrias 
router.get('/categorias', admin.listarCategorias);
router.post('/categorias', validate(request.category), admin.agregarCategoria); 
router.put('/categorias/:id', validate(request.category), admin.editarCategoria); 
router.delete('/categorias/:id', admin.borrarCategoria);

// Ciudades de envíos
router.get('/ciudades', admin.listarCiudades);
router.post('/ciudades', validate(request.shipping), admin.crearCiudad);
router.put('/ciudades/:id', validate(request.shipping), admin.editarCiudad);
router.delete('/ciudades/:id', admin.borrarCiudad);

// RAM y Almacenamiento
router.get('/ram', admin.listarRAM);
router.get('/almacenamiento', admin.listarAlm);

// Pedidos
router.get('/orders', admin.listarPedidos);
router.get('/orders/:id', admin.detallePedido);

// Usuarios/Clientes
router.get('/usuarios', admin.listarUsuarios);
router.patch('/usuarios/:id/estado', admin.actualizarEstado);

// Cargar Imagen
router.post('/variantes/upload', admin.cargarImagen);

export default router;
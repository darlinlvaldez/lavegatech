import express from 'express';
import specs from '../../controllers/admin/specs.js';
import validate from '../../middlewares/validateRequest.js';
import request from '../schemas/specs.js';
import { isAdmin, requireRole } from '../../middlewares/auth.js';

const router = express.Router();

router.use(isAdmin());

// Tabla moviles
router.get('/todos-productos', requireRole('superadmin', 'admin', 'editor'), specs.listarProductos);
router.get('/moviles', requireRole('superadmin', 'admin', 'editor'), specs.listarMoviles);
router.post('/movil', requireRole('superadmin', 'admin'), validate(request.device), specs.crearMovil);
router.put('/movil/:id', requireRole('superadmin', 'admin'), validate(request.device), specs.editarMovil);
router.delete('/movil/:id', requireRole('superadmin'), specs.borrarMovil);

// Tabla almacenamiento
router.get('/almacenamiento', requireRole('superadmin', 'admin', 'editor'), specs.listarAlmacenamiento);
router.post('/almacenamiento', requireRole('superadmin', 'admin'), validate(request.almacenamiento), specs.crearAlmacenamiento);
router.put('/almacenamiento/:id', requireRole('superadmin', 'admin'), validate(request.almacenamiento), specs.editarAlmacenamiento);
router.delete('/almacenamiento/:id', requireRole('superadmin'), specs.borrarAlmacenamiento);

// Tabla baterias
router.get('/baterias', requireRole('superadmin', 'admin', 'editor'), specs.listarBaterias);
router.post('/baterias', requireRole('superadmin', 'admin'), validate(request.bateria), specs.crearBateria);
router.put('/baterias/:id', requireRole('superadmin', 'admin'), validate(request.bateria), specs.editarBateria);
router.delete('/baterias/:id', requireRole('superadmin'), specs.borrarBateria);

// Tabla camaras
router.get('/camaras', requireRole('superadmin', 'admin', 'editor'), specs.listarCamaras);
router.post('/camaras', requireRole('superadmin', 'admin'), validate(request.camara), specs.crearCamara);
router.put('/camaras/:id', requireRole('superadmin', 'admin'), validate(request.camara), specs.editarCamara);
router.delete('/camaras/:id', requireRole('superadmin'), specs.borrarCamara);

// Tabla conectividad
router.get('/conectividades', requireRole('superadmin', 'admin', 'editor'), specs.listarConectividad);
router.post('/conectividades', requireRole('superadmin', 'admin'), validate(request.conectividad), specs.crearConectividad);
router.put('/conectividades/:id', requireRole('superadmin', 'admin'), validate(request.conectividad), specs.editarConectividad);
router.delete('/conectividades/:id', requireRole('superadmin'), specs.borrarConectividad);

// Tabla cpu
router.get('/cpu', requireRole('superadmin', 'admin', 'editor'), specs.listarCpu);
router.post('/cpu', requireRole('superadmin', 'admin'), validate(request.cpu), specs.crearCpu);
router.put('/cpu/:id', requireRole('superadmin', 'admin'), validate(request.cpu), specs.editarCpu);
router.delete('/cpu/:id', requireRole('superadmin'), specs.borrarCpu);

// Tabla dimensionespeso
router.get('/dimensionespeso', requireRole('superadmin', 'admin', 'editor'), specs.listarDimensiones);
router.post('/dimensionespeso', requireRole('superadmin', 'admin'), validate(request.dimensiones), specs.crearDimensiones);
router.put('/dimensionespeso/:id', requireRole('superadmin', 'admin'), validate(request.dimensiones), specs.editarDimensiones);
router.delete('/dimensionespeso/:id', requireRole('superadmin'), specs.borrarDimensiones);

// Tabla variantes Almacenamiento
router.get('/variantes_almacenamiento', requireRole('superadmin', 'admin', 'editor'), specs.listarVariantesAlmacenamiento);
router.post('/variantes_almacenamiento', requireRole('superadmin', 'admin'), specs.crearVarianteAlmacenamiento);
router.put('/variantes_almacenamiento/:movil_id/:almacenamiento_id', requireRole('superadmin', 'admin'), specs.editarVarianteAlmacenamiento);
router.delete('/variantes_almacenamiento/:movil_id/:almacenamiento_id', requireRole('superadmin'), specs.borrarVarianteAlmacenamiento);

// Tabla gpu
router.get('/gpu', requireRole('superadmin', 'admin', 'editor'), specs.listarGpu);
router.post('/gpu', requireRole('superadmin', 'admin'), validate(request.gpu), specs.crearGpu);
router.put('/gpu/:id', requireRole('superadmin', 'admin'), validate(request.gpu), specs.editarGpu);
router.delete('/gpu/:id', requireRole('superadmin'), specs.borrarGpu);

// Tabla pantalla
router.get('/pantalla',  requireRole('superadmin', 'admin', 'editor'), specs.listarPantalla);
router.post('/pantalla',  requireRole('superadmin', 'admin'), validate(request.pantalla), specs.crearPantalla);
router.put('/pantalla/:id',  requireRole('superadmin', 'admin'), validate(request.pantalla), specs.editarPantalla);
router.delete('/pantalla/:id',  requireRole('superadmin'), specs.borrarPantalla);

// Tabla RAM
router.get('/ram', requireRole('superadmin', 'admin', 'editor'), specs.listarRam);
router.post('/ram', requireRole('superadmin', 'admin'), validate(request.ram), specs.crearRam);
router.put('/ram/:id', requireRole('superadmin', 'admin'), validate(request.ram), specs.editarRam);
router.delete('/ram/:id', requireRole('superadmin'), specs.borrarRam);

// Tabla Variantes RAM 
router.get('/variantes_ram', requireRole('superadmin', 'admin', 'editor'), specs.listarVariantesRam);
router.post('/variantes_ram', requireRole('superadmin', 'admin'), specs.crearVarianteRam);
router.put('/variantes_ram/:movil_id/:ram_id',  requireRole('superadmin', 'admin'), specs.editarVarianteRam);
router.delete('/variantes_ram/:movil_id/:ram_id',  requireRole('superadmin'), specs.borrarVarianteRam);

export default router;
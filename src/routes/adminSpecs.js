import express from 'express';
import specs from '../controllers/adminSpecs.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/admin.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.use(isAdmin());

// Tabla moviles
router.get('/moviles', specs.listarMoviles);
router.post('/movil',  specs.crearMovil);
router.put('/movil/:id',  specs.editarMovil);
router.delete('/movil/:id', specs.borrarMovil);

// Tabla almacenamiento
router.get('/almacenamiento', specs.listarAlmacenamiento);
router.post('/almacenamiento', specs.crearAlmacenamiento);
router.put('/almacenamiento/:id', specs.editarAlmacenamiento);
router.delete('/almacenamiento/:id', specs.borrarAlmacenamiento);

// Tabla variantes almacenamiento 
router.get('/variantes_almacenamiento', specs.listarVariantesAlmacenamiento);
router.post('/variantes_almacenamiento', specs.crearVarianteAlmacenamiento);
router.delete('/variantes_almacenamiento/:movil_id/:almacenamiento_id', specs.borrarVarianteAlmacenamiento);

// Tabla baterias
router.get('/baterias', specs.listarBaterias);
router.post('/baterias', specs.crearBateria);
router.put('/baterias/:id', specs.editarBateria);
router.delete('/baterias/:id', specs.borrarBateria);

// Tabla camaras
router.get('/camaras', specs.listarCamaras);
router.post('/camaras', specs.crearCamara);
router.put('/camaras/:id', specs.editarCamara);
router.delete('/camaras/:id', specs.borrarCamara);

// Tabla conectividad
router.get('/conectividades', specs.listarConectividad);
router.post('/conectividades', specs.crearConectividad);
router.put('/conectividades/:id', specs.editarConectividad);
router.delete('/conectividades/:id', specs.borrarConectividad);

// Tabla cpu
router.get('/cpu', specs.listarCpu);
router.post('/cpu', specs.crearCpu);
router.put('/cpu/:id', specs.editarCpu);
router.delete('/cpu/:id', specs.borrarCpu);

// Tabla dimensionespeso
router.get('/dimensionespeso', specs.listarDimensiones);
router.post('/dimensionespeso', specs.crearDimensiones);
router.put('/dimensionespeso/:id', specs.editarDimensiones);
router.delete('/dimensionespeso/:id', specs.borrarDimensiones);

// Tabla variantes Almacenamiento
router.get('/variantes_almacenamiento', specs.listarVariantesAlmacenamiento);
router.post('/variantes_almacenamiento', specs.crearVarianteAlmacenamiento);
router.delete('/variantes_almacenamiento/:movil_id/:almacenamiento_id', specs.borrarVarianteAlmacenamiento);

// Tabla gpu
router.get('/gpu', specs.listarGpu);
router.post('/gpu', specs.crearGpu);
router.put('/gpu/:id', specs.editarGpu);
router.delete('/gpu/:id', specs.borrarGpu);

// Tabla pantalla
router.get('/pantalla', specs.listarPantalla);
router.post('/pantalla', specs.crearPantalla);
router.put('/pantalla/:id', specs.editarPantalla);
router.delete('/pantalla/:id', specs.borrarPantalla);

// Tabla RAM
router.get('/ram', specs.listarRam);
router.post('/ram', specs.crearRam);
router.put('/ram/:id', specs.editarRam);
router.delete('/ram/:id', specs.borrarRam);

// Tablla Variantes RAM 
router.get('/variantes_ram', specs.listarVariantesRam);
router.post('/variantes_ram', specs.crearVarianteRam);
router.delete('/variantes_ram/:movil_id/:ram_id', specs.borrarVarianteRam);

export default router;
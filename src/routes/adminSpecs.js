import express from 'express';
import specs from '../controllers/adminSpecs.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/specs.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.use(isAdmin());

// Tabla moviles
router.get('/moviles', specs.listarMoviles);
router.post('/movil',  specs.crearMovil);
router.put('/movil/:id',specs.editarMovil);
router.delete('/movil/:id', specs.borrarMovil);

// Tabla almacenamiento
router.get('/almacenamiento', specs.listarAlmacenamiento);
router.post('/almacenamiento', validate(request.almacenamiento), specs.crearAlmacenamiento);
router.put('/almacenamiento/:id', validate(request.almacenamiento), specs.editarAlmacenamiento);
router.delete('/almacenamiento/:id', specs.borrarAlmacenamiento);

// Tabla baterias
router.get('/baterias', specs.listarBaterias);
router.post('/baterias', validate(request.bateria), specs.crearBateria);
router.put('/baterias/:id', validate(request.bateria), specs.editarBateria);
router.delete('/baterias/:id', specs.borrarBateria);

// Tabla camaras
router.get('/camaras', specs.listarCamaras);
router.post('/camaras', validate(request.camara), specs.crearCamara);
router.put('/camaras/:id', validate(request.camara), specs.editarCamara);
router.delete('/camaras/:id', specs.borrarCamara);

// Tabla conectividad
router.get('/conectividades', specs.listarConectividad);
router.post('/conectividades', validate(request.conectividad), specs.crearConectividad);
router.put('/conectividades/:id', validate(request.conectividad), specs.editarConectividad);
router.delete('/conectividades/:id', specs.borrarConectividad);

// Tabla cpu
router.get('/cpu', specs.listarCpu);
router.post('/cpu', validate(request.cpu), specs.crearCpu);
router.put('/cpu/:id', validate(request.cpu), specs.editarCpu);
router.delete('/cpu/:id', specs.borrarCpu);

// Tabla dimensionespeso
router.get('/dimensionespeso', specs.listarDimensiones);
router.post('/dimensionespeso', validate(request.dimensiones), specs.crearDimensiones);
router.put('/dimensionespeso/:id', validate(request.dimensiones), specs.editarDimensiones);
router.delete('/dimensionespeso/:id', specs.borrarDimensiones);

// Tabla variantes Almacenamiento
router.get('/variantes_almacenamiento', specs.listarVariantesAlmacenamiento);
router.post('/variantes_almacenamiento', validate(request.varianteAlm), specs.crearVarianteAlmacenamiento);
router.put('/variantes_almacenamiento/:movil_id/:almacenamiento_id', validate(request.varianteAlm), specs.editarVarianteAlmacenamiento);
router.delete('/variantes_almacenamiento/:movil_id/:almacenamiento_id', specs.borrarVarianteAlmacenamiento);

// Tabla gpu
router.get('/gpu', specs.listarGpu);
router.post('/gpu', validate(request.gpu), specs.crearGpu);
router.put('/gpu/:id', validate(request.gpu), specs.editarGpu);
router.delete('/gpu/:id', specs.borrarGpu);

// Tabla pantalla
router.get('/pantalla', specs.listarPantalla);
router.post('/pantalla', validate(request.pantalla), specs.crearPantalla);
router.put('/pantalla/:id', validate(request.pantalla), specs.editarPantalla);
router.delete('/pantalla/:id', specs.borrarPantalla);

// Tabla RAM
router.get('/ram', specs.listarRam);
router.post('/ram', validate(request.ram), specs.crearRam);
router.put('/ram/:id', validate(request.ram), specs.editarRam);
router.delete('/ram/:id', specs.borrarRam);

// Tabla Variantes RAM 
router.get('/variantes_ram', specs.listarVariantesRam);
router.post('/variantes_ram', validate(request.varianteRAM), specs.crearVarianteRam);
router.put('/variantes_ram/:movil_id/:ram_id', validate(request.varianteRAM), specs.editarVarianteRam);
router.delete('/variantes_ram/:movil_id/:ram_id', specs.borrarVarianteRam);

export default router;
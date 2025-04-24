import express from 'express';
import principal from '../controllers/principal.js';
import store from '../controllers/store.js';
import product from "../controllers/product.js";

const router = express.Router();

router.get('/productos/:categoria', principal.productosController);
router.get('/mobiles/search', principal.buscarController);

router.get('/mobiles/store', store.storeController);
router.get('/mobiles/store/:pagina', store.storeController);

router.get("/mobiles/product/:id", product.detallesController);
router.get('/stock/:productId/:color', product.StockController);

export default router;
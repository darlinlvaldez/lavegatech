import express from 'express';
import principal from '../controllers/principal.js';
import store from '../controllers/store.js';
import product from "../controllers/product.js";

const router = express.Router();

router.get('/productos/:categoria', principal.productosController);
router.get('/search', principal.buscarController);

router.get('/store', store.storeController);
router.get('/store/:pagina', store.storeController);
router.get('/marcas-por-categoria', store.marcasPorCategoriaController);

router.get("/product/:id", product.detallesController);
router.get('/stock/:productId/:color', product.StockController);

export default router;
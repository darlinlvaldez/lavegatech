import express from 'express';
import principal from '../controllers/principal.js';
import store from '../controllers/store.js';
import product from "../controllers/product.js";

const router = express.Router();

router.get('/', principal.productosController);
router.get('/search', principal.searchController);

router.get('/store', store.storeController);
router.get('/store/:pagina', store.storeController);

router.get("/product/:id", product.detallesController);

export default router;
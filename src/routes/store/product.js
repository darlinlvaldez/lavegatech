import express from 'express';
import principal from '../controllers/principal.js';
import store from '../controllers/store.js';
import product from "../controllers/product.js";
import comparison  from '../controllers/comparison.js';

const router = express.Router();

router.get('/', principal.productosController);
router.get('/search', principal.searchController);

router.get('/store', store.storeController);
router.get('/store/:pagina', store.storeController);

router.get("/product/:id", product.detallesController);
router.get('/compare', comparison.comparer)

export default router;
import express from 'express';
import principal from '../../controllers/store/principal.js';
import store from '../../controllers/store/store.js';
import product from "../../controllers/store/product.js";
import comparison  from '../../controllers/store/comparison.js';

const router = express.Router();

router.get('/', principal.productsController);
router.get('/search', principal.searchController);

router.get('/store', store.storeController);
router.get('/store/:pagina', store.storeController);

router.get("/product/:id", product.productDetails);
router.get('/compare', comparison.comparer)

export default router;
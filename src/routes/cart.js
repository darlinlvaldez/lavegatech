import express from 'express';
import cart from '../controllers/cart.js';
import {isAuth} from '../middlewares/auth.js';

const router = express.Router();

router.post('/sync', isAuth(), cart.syncCart);
router.post('/add', isAuth(), cart.addToCart);
router.post('/update-quantity', isAuth(), cart.updateQuantity);
router.post('/remove-item', isAuth(), cart.removeItem);
router.get('/items', isAuth(), cart.getCartItems);
router.get('/', cart.getCartPage);

export default router;
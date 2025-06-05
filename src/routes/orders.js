import express from 'express';
import orders from '../controllers/orders.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', isAuth(), orders.showUserOrders);
router.get('/:orderId', isAuth(), orders.showOrderDetails);

export default router;
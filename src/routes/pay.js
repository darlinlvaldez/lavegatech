import express from 'express';
import orders from '../controllers/orders.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', isAuth(), orders.createOrder);
router.post('/:orderId/payment', isAuth(), orders.processPayment);
router.get('/:orderId', isAuth(), orders.getOrderDetails);

export default router;
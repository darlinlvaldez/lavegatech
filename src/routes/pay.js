import express from 'express';
import pay from '../controllers/pay.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', isAuth(), pay.createOrder);
router.post('/:orderId/payment', isAuth(), pay.processPayment);
router.get('/:orderId', isAuth(), pay.getOrderDetails);

export default router;
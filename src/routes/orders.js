import express from 'express';
import orders from '../controllers/orders.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', isAuth(), orders.createOrder);
router.post('/payment', isAuth(), orders.processPayment); 
router.get('/showOrders', isAuth(), orders.showUserOrders);
router.get('/orderDetails/:orderId', isAuth(), orders.showOrderDetails);
router.get('/:orderId', isAuth(), orders.getOrderDetails);

export default router;
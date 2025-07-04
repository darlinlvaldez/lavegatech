import express from 'express';
import orders from '../controllers/orders.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/orders.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', isAuth(), validate(request.order), orders.createOrder);
router.post('/payment', isAuth(), orders.processPayment); 
router.get('/showOrders', isAuth(), orders.showUserOrders);
router.get('/orderDetails/:orderId', isAuth(), orders.showOrderDetails);
router.get('/:orderId', isAuth(), orders.getOrderDetails);

export default router;
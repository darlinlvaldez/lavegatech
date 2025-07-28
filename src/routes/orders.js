import express from 'express';
import orders from '../controllers/orders.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/orders.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.use(isAuth());

router.get('/cities', orders.getCities);
router.get("/last", orders.getLastOrder);
router.post('/', validate(request.order), orders.createOrder);
router.post('/payment', orders.processPayment); 
router.get('/showOrders', orders.showUserOrders);
router.get('/orderDetails/:orderId', orders.showOrderDetails);

export default router;
import express from 'express';
import pay from '../controllers/pay.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', isAuth(), pay.showUserOrders);
router.get('/:orderId', isAuth(), pay.showOrderDetails);

export default router;
import express from 'express';
import orders from '../controllers/orders.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/orders.js';
import { isAuth } from '../middlewares/auth.js';
import db from "../database/mobiles.js"; // Asegúrate de importar db

const router = express.Router();

router.use(isAuth());

router.get('/cities', async (req, res) => {
  try {
    const [ciudades] = await db.query("SELECT id, nombre, costo_envio FROM ciudades_envio");
    res.json({ success: true, ciudades });
  } catch (error) {
    console.error('Error al cargar ciudades:', error);
    res.status(500).json({ success: false, message: 'Error al cargar ciudades' });
  }
});

router.post('/', validate(request.order), orders.createOrder);
router.post('/payment', orders.processPayment); 
router.get('/showOrders', orders.showUserOrders);
router.get('/orderDetails/:orderId', orders.showOrderDetails);
router.get('/:orderId', orders.getOrderDetails);

export default router;
import express from 'express';
import user from '../controllers/userProfile.js';
import validate from '../middlewares/validateRequest.js';
import request from './schemas/user.js';
import { isAuth } from '../middlewares/auth.js';
import orders from '../models/pay.js';
import db from "../database/mobiles.js";

const router = express.Router();

router.post('/update-username', validate(request.updateUsername), user.updateUsername);
router.post('/update-email', validate(request.updateEmail), user.updateEmail);
router.post('/verify-email-code', validate(request.verifyEmailCode), user.verifyEmailCode);
router.post('/resend-email-code', user.resendCode);
router.post('/update-password', validate(request.updatePassword),user.updatePassword);

// Ruta para ver todos los pedidos del usuario
router.get('/orders', isAuth(), async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    // Obtener todas las órdenes del usuario
    const [userOrders] = await db.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY fecha_creacion DESC`,
      [userId]
    );
    
    res.render('store/user-orders', { 
      user: req.session.user,
      orders: userOrders 
    });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).render('error', { message: 'Error al cargar tus pedidos' });
  }
});

// Ruta para ver detalles de un pedido específico
router.get('/orders/:orderId', isAuth(), async (req, res) => {
  try {
    const order = await orders.getOrderById(req.params.orderId, req.session.user.id);
    
    if (!order) {
      return res.status(404).render('error', { message: 'Pedido no encontrado' });
    }
    
    res.render('store/order-details', { 
      user: req.session.user,
      order 
    });
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).render('error', { message: 'Error al cargar el pedido' });
  }
});

export default router;
import express from 'express';
import { isAuth } from '../middlewares/auth.js';
import orders from '../models/pay.js';

const router = express.Router();

// Ruta para ver detalles de la orden
router.get('/:orderId', isAuth(), async (req, res) => {
  try {
    const order = await orders.getOrderById(req.params.orderId, req.session.user.id);
    if (!order) {
      return res.status(404).send('Orden no encontrada');
    }
res.render('store/confirmation', { order });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la orden');
  }
});

export default router;
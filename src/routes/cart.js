import express from 'express';
import cart from '../controllers/cart.js';
import {isAuth} from '../middlewares/auth.js';
import db from "../database/mobiles.js";

const router = express.Router();

router.post('/sync', isAuth(), cart.syncCart);
router.post('/add', isAuth(), cart.addToCart);
router.post('/update-quantity', isAuth(), cart.updateQuantity);
router.post('/remove-item', isAuth(), cart.removeItem);
router.get('/items', isAuth(), cart.getCartItems);
router.get('/', cart.getCartPage);
// Endpoint para verificar stock
router.get('/stock', async (req, res) => {
  try {
    const { id, color } = req.query;
    
    if (!id || !color) {
      return res.status(400).json({ 
        success: false, 
        message: 'Se requieren los parámetros id y color' 
      });
    }

    // Consulta a la base de datos
    const [rows] = await db.query(
      'SELECT stock FROM variantes WHERE producto_id = ? AND color = ?',
      [id, color]
    );

    if (rows.length === 0) {
      return res.json({ 
        success: true, 
        stock: 0,
        message: 'Variante no encontrada' 
      });
    }

    res.json({ 
      success: true, 
      stock: rows[0].stock 
    });
  } catch (error) {
    console.error('Error al consultar stock:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al consultar stock' 
    });
  }
});

// En tu archivo de rutas del carrito (routes/cart.js)
router.get('/count', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.json({ success: true, count: 0 });
    }
    
    const userId = req.session.user.id;
    const [result] = await db.query(
      "SELECT SUM(cantidad) as count FROM cart WHERE usuario_id = ?",
      [userId]
    );
    
    const count = result[0].count || 0;
    res.json({ success: true, count });
  } catch (error) {
    console.error('Error al obtener conteo del carrito:', error);
    res.status(500).json({ success: false, message: 'Error al obtener conteo' });
  }
});

export default router;
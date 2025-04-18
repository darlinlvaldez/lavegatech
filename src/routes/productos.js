import express from 'express';
import {productosController} from '../controllers/principal.js';
import {storeController} from '../controllers/store.js';
import {detallesController} from "../controllers/product.js";
import {obtenerStock} from "../models/product.js";
import {buscarProductos} from '../models/principal.js';

const router = express.Router();

router.get('/productos/:categoria', async (req, res) =>  {
  try {
    const categoria = req.params.categoria;
  
    const productos = await productosController(req, res, categoria, );      

    res.render('index', { productos });  
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).render('error', { mensaje: 'Error al cargar los productos.' });
  }
});

router.get('/mobiles/store', storeController);
router.get('/mobiles/store/:pagina', storeController);

router.get("/mobiles/product/:id", detallesController);

router.post('/mobiles/cart/add', (req, res) => {
  res.json({ success: false, message: 'Producto agregado con exito' });
});

router.post('/mobiles/cart/remove', (req, res) => {
  res.json({ success: false, message: 'Producto eliminado con exito' });
});

router.get('/stock/:productId/:color', async (req, res) => {
  try {
      const { productId, color } = req.params;
      const stock = await obtenerStock(productId, decodeURIComponent(color));
      res.json({ stock });
  } catch (error) {
      console.error('Error al obtener stock:', error);
      res.status(500).json({ error: 'Error al obtener stock' });
  }
});

router.get('/mobiles/search', async (req, res) => {
    try {
        const { q: query, category } = req.query;
        const productos = await buscarProductos(query, category);
        res.json(productos);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
});

export default router;
import express from 'express';
import admin from '../controllers/admin.js';
import db from "../database/mobiles.js";

const router = express.Router();

router.get('/', admin.listar);
router.post('/', admin.crear);
router.put('/:id', admin.actualizar);
router.delete('/:id', admin.eliminar);

router.get('/categorias', async (req, res) => {
  const [rows] = await db.query("SELECT id, categoria FROM categorias ORDER BY categoria");
  res.json(rows);
});

router.get('/marcas', async (req, res) => {
  const [rows] = await db.query("SELECT id, nombre FROM p_marcas ORDER BY nombre");
  res.json(rows);
});

export default router;
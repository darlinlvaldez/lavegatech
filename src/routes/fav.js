import express from 'express';
import favController from '../controllers/fav.js';
import {isAuth} from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', isAuth(), favController.addToFav);
router.post('/remove', isAuth(), favController.removeFromFav);
router.get('/items', isAuth(), favController.getFavItems);

export default router;
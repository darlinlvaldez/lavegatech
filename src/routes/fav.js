import express from 'express';
import fav from '../controllers/fav.js';
import {isAuth} from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', isAuth(), fav.addToFav);
router.post('/remove', isAuth(), fav.removeFromFav);
router.post('/clear', isAuth(), fav.clearAllFav);
router.get('/items', isAuth(), fav.getFavItems);
router.get('/', isAuth(), fav.getFavPage);

export default router;
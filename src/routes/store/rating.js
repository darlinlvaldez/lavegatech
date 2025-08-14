import express from 'express';
import {isAuth} from '../../middlewares/auth.js';
import rating from '../controllers/rating.js';

const router = express.Router();

router.post('/', isAuth(), rating.submitReview);
router.get('/product/:producto_id', rating.getProductReviews);
router.put('/:id', isAuth(), rating.updateReview); 

export default router;
import express from 'express';
import comparison  from '../../controllers/store/comparison.js';

const router = express.Router();

router.get('/searchMobiles', comparison.searchMobiles)

router.get('/compare', comparison.comparer)

router.get('/mobiles', comparison.mobiles);

router.get( '/product/:id/rating-breakdown', comparison.ratingBreakdown);

export default router;
import express from 'express';
import comparison  from '../../controllers/store/comparison.js';

const router = express.Router();

router.get('/searchMobiles', comparison.searchMobiles)

router.get('/compare', comparison.comparer)

router.get('/top-sold', comparison.topSoldMobiles);
router.get('/top-rated', comparison.topRatedMobiles);

export default router;
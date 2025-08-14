import express from 'express';
import comparison  from '../controllers/comparison.js';

const router = express.Router();

router.get('/searchMobiles', comparison.searchMobiles)

router.get('/compare', comparison.comparer)

export default router;
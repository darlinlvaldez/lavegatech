import express from 'express';
import user from '../controllers/userProfile.js';

const router = express.Router();

router.post('/update-username', user.updateUsername);
router.post('/update-email', user.updateEmail);
router.post('/update-password', user.updatePassword);

export default router;
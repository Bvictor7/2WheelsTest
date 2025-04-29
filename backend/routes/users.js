import express from 'express';
import auth from '../middleware/auth.js';
import { me } from '../controllers/authController.js';
const router = express.Router();
router.get('/me', auth, me);
export default router;

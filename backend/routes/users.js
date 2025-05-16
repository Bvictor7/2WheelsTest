// src/routes/users.js
import express from 'express';
import { getProfile, updateProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, getProfile);
router.patch('/me', auth, updateProfile);

export default router;


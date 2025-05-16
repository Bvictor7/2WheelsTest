import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Profil utilisateur
router.get('/me', auth, getProfile);
router.patch('/me', auth, updateProfile);

export default router;

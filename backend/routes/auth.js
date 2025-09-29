import express from 'express'
import { register, login, getProfile, updateProfile } from '../controllers/authController.js'
import auth from '../middleware/auth.js'
import { forgotPassword, resetPassword } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', auth, getProfile)
router.patch('/me', auth, updateProfile)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router

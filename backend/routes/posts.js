import express from 'express'
import {
  getApprovedPosts,
  getAllPosts,
  getPostById,
  createPost,
  updatePostStatus,
  getUserPosts,
  updatePost,
  toggleLike,
  deletePost
} from '../controllers/postController.js'
import { parser } from '../config/cloudinary.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getApprovedPosts)
router.get('/all', getAllPosts)
router.get('/admin', auth, getAllPosts)
router.patch('/admin/:id/status', auth, updatePostStatus)
router.get('/user', auth, getUserPosts)
router.get('/:id', getPostById)
router.post('/', auth, parser.single('image'), createPost)
router.put('/:id', auth, parser.single('image'), updatePost)
router.patch('/:id/like', auth, toggleLike)
router.delete('/:id', auth, deletePost)

export default router







import express from 'express';
import {
  createPost,
  getApprovedPosts,
  getAllPosts,
  updatePostStatus,
  getUserPosts,
  deletePost,
  updatePost,
  getPostById,
  toggleLike
} from '../controllers/postController.js';


import { parser } from '../config/cloudinary.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getApprovedPosts);

router.post('/', auth, parser.single('image'), createPost);

router.get('/admin', auth, getAllPosts); 
router.patch('/admin/:id/status', auth, updatePostStatus);

router.get('/user', auth, getUserPosts); 
router.delete('/:id', auth, deletePost); 
router.put('/:id', auth, parser.single('image'), updatePost);
router.get('/all', getAllPosts); 


router.patch('/:id/like', auth, toggleLike);


export default router;






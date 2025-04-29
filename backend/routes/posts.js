import express from 'express';
import { parser } from '../config/cloudinary.js';
import { getPosts, getPostById, createPost } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', parser.single('image'), createPost);

export default router;




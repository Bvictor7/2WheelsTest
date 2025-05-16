import express from 'express';
import {
  createPost,
  getApprovedPosts,
  getAllPosts,
  updatePostStatus,
  getUserPosts,
  deletePost,
  updatePost
} from '../controllers/postController.js';

import { parser } from '../config/cloudinary.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// 1. PUBLIC : récupérer uniquement les posts approuvés
router.get('/', getApprovedPosts);

// 2. CRÉATION : créer un nouveau post (status = pending)
router.post('/', parser.single('image'), createPost);

// 3. ADMIN – modération des posts
router.get('/admin', auth, getAllPosts); // voir tous les posts (optionnellement par statut)
router.patch('/admin/:id/status', auth, updatePostStatus); // changer le statut

// 4. UTILISATEUR – gestion de ses propres posts
router.get('/user', auth, getUserPosts); // récupérer ses posts
router.delete('/:id', auth, deletePost); // supprimer un post
router.put('/:id', auth, parser.single('image'), updatePost); // modifier un post

export default router;






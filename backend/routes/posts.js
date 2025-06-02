// routes/posts.js

import express from 'express';
import {
  getApprovedPosts,
  getAllPosts,
  getPostById,
  updatePostStatus,
  createPost,
  getUserPosts,
  deletePost,
  updatePost,
  toggleLike
} from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// ► ROUTES PUBLIQUES (aucun token requis)  
// Récupérer tous les posts approuvés
router.get('/', getApprovedPosts);

// Récupérer un post par son ID
router.get('/:id', getPostById);

// ► ROUTES PROTÉGÉES (token JWT requis)  
router.use(auth);

// Récupérer tous les posts (tous statuts)
router.get('/all', getAllPosts);

// Créer un post
router.post('/', createPost);

// Récupérer les posts de l’utilisateur connecté
router.get('/user', getUserPosts);

// Mettre à jour un post (auteur uniquement)
router.patch('/:id', updatePost);

// Supprimer un post (auteur uniquement)
router.delete('/:id', deletePost);

// Mettre à jour le statut d’un post (admin uniquement)
router.patch('/:id/status', updatePostStatus);

// Gérer les likes (utilisateur connecté)
router.patch('/:id/like', toggleLike);

export default router;






import express from 'express';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import {
  listAllPosts,
  approvePost,
  rejectPost
} from '../controllers/adminController.js';

const router = express.Router();

router.use(auth, isAdmin);

router.get('/posts',       listAllPosts);
router.put('/posts/:id/approve', approvePost);
router.delete('/posts/:id/reject',  rejectPost);

export default router;


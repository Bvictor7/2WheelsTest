import express from 'express';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import {
  listAllPosts,
  approvePost,
  rejectPost,
  listUsers,
  listComments,
  deleteUser,
  deleteComment
} from '../controllers/adminController.js';

const router = express.Router();

router.use(auth);
router.use(isAdmin);

router.get('/posts', listAllPosts);
router.put('/posts/:id/approve', approvePost);
router.delete('/posts/:id/reject', rejectPost);

router.get('/users', listUsers);
router.delete('/users/:id', deleteUser);


router.get('/comments', listComments);
router.delete('/comments/:id', deleteComment);

export default router;
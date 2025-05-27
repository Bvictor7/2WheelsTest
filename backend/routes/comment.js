import express from 'express';
import { addComment, getComments, deleteComment } from '../controllers/commentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:postId', getComments);
router.post('/:postId', auth, addComment);
router.delete('/:commentId', auth, deleteComment);

export default router;

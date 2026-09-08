import express from 'express';
import {
  getPosts,
  getDashboardStats,
  getPostById,
  createPost,
  updatePost,
  publishPost,
  deletePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All post routes are protected

router.get('/stats', getDashboardStats);
router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);
router.patch('/:id/publish', publishPost);

export default router;

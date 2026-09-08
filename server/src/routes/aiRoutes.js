import express from 'express';
import { generateGbpPost } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // AI endpoints are protected

router.post('/generate-post', generateGbpPost);

export default router;

import express from 'express';
import { getUserSummary,getProfile, updateProfile ,getUserGoalSummary } from '../controllers/userController.js';
import { protect,verifyToken  } from '../middleware/authMiddleware.js';
import upload from '../utils/cloudinary.js';

const router = express.Router();

router.get('/summary', protect, getUserSummary);
router.get('/profile', verifyToken, getProfile);

router.put('/profile', verifyToken, upload.single('avatar'), updateProfile);
router.get('/goal-summary', protect, getUserGoalSummary);


export default router;

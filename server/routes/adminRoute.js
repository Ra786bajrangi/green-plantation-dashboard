import express from 'express';
import { getAllUsers, deleteUserById, getAdminDashboardSummary,toggleUserStatus } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', protect, admin, getAdminDashboardSummary);
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/toggle', protect, admin, toggleUserStatus);

router.delete('/users/:id', protect, admin, deleteUserById);

export default router;

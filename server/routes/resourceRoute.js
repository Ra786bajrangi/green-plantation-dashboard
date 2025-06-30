import express from 'express';
import {
  getResources,
  createResource,
  deleteResource,
} from '../controllers/resourceController.js';
import { verifyToken, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getResources); // Public
router.post('/', verifyToken, admin, createResource); 
router.delete('/:id', verifyToken, admin, deleteResource); 

export default router;

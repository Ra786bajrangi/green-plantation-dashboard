import express from 'express';
import { createPlantation,getPlantations,getAllPlantations,getLeaderboard  } from '../controllers/plantationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPlantation);
router.get('/', protect, getPlantations);
router.get('/all', getAllPlantations); 

router.get('/leaderboard', getLeaderboard);


export default router;

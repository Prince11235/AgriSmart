import express from 'express';
import { getFarmerProfile, upsertFarmerProfile } from '../controllers/farmerController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/rbacMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/profile', authorize('Farmer'), getFarmerProfile);
router.put('/profile', authorize('Farmer'), upsertFarmerProfile);

export default router;

import express from 'express';
import { getAdminMetrics } from '../controllers/adminController.js';

const router = express.Router();

router.get('/metrics', getAdminMetrics);

export default router;

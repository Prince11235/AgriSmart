import express from 'express';
import { analyzeSoil } from '../controllers/soilController.js';

const router = express.Router();

router.post('/analyze', analyzeSoil);

export default router;

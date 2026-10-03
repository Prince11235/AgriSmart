import express from 'express';
import { getExperts, bookAppointment } from '../controllers/expertController.js';

const router = express.Router();

router.get('/', getExperts);
router.post('/book', bookAppointment);

export default router;

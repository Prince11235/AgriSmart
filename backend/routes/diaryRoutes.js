import express from 'express';
import { getDiaryEntries, addDiaryEntry } from '../controllers/diaryController.js';

const router = express.Router();

router.get('/', getDiaryEntries);
router.post('/add', addDiaryEntry);

export default router;

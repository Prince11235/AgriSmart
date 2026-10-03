import express from 'express';
import { getSchemes, applyForScheme } from '../controllers/schemeController.js';

const router = express.Router();

router.get('/', getSchemes);
router.post('/apply', applyForScheme);

export default router;

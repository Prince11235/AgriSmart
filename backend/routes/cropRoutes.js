import express from 'express';
import { recommendCrops, recommendFertilizer, askAIChatBot } from '../controllers/cropController.js';

const router = express.Router();

router.post('/recommend', recommendCrops);
router.post('/fertilizer', recommendFertilizer);
router.post('/chatbot', askAIChatBot);

export default router;

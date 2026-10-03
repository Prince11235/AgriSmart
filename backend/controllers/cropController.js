import mongoose from 'mongoose';
import { AIEngineService } from '../services/aiEngineService.js';
import { CropRecommendation } from '../models/CropRecommendation.js';

export const recommendCrops = async (req, res, next) => {
  try {
    const result = AIEngineService.predictCrops(req.body);
    const userId = req.user?._id || req.user?.id;
    if (userId && mongoose.isValidObjectId(userId)) {
      await CropRecommendation.create({ userId, inputs: req.body, results: result });
    }
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const recommendFertilizer = async (req, res, next) => {
  try {
    const result = AIEngineService.calculateFertilizer(req.body);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const askAIChatBot = async (req, res, next) => {
  try {
    const { message, language } = req.body;
    const result = AIEngineService.processChatBotQuery(message || '', language || 'English');
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

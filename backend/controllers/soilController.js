import { AIEngineService } from '../services/aiEngineService.js';

export const analyzeSoil = async (req, res, next) => {
  try {
    const result = AIEngineService.analyzeSoilHealth(req.body);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

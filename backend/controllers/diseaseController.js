import { unlink } from 'fs/promises';
import { AIEngineService } from '../services/aiEngineService.js';

export const scanDisease = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Please upload a JPG, PNG, or WEBP leaf image.' });
  try {
    const result = await AIEngineService.diagnoseLeafDisease(req.file.path, req.file.originalname);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  } finally {
    await unlink(req.file.path).catch(() => {});
  }
};

export const getDiseaseHeatmap = async (req, res) => {
  res.json({ success: true, outbreakClusters: [
    { id: 1, lat: 30.9, lng: 75.85, crop: 'Tomato', disease: 'Late Blight', count: 14, severity: 'High' },
    { id: 2, lat: 31.1, lng: 75.50, crop: 'Wheat', disease: 'Yellow Rust', count: 8, severity: 'Moderate' },
    { id: 3, lat: 30.7, lng: 76.78, crop: 'Rice', disease: 'Paddy Blast', count: 21, severity: 'High' },
    { id: 4, lat: 29.9, lng: 75.30, crop: 'Cotton', disease: 'Leaf Curl Virus', count: 5, severity: 'Low' }
  ] });
};
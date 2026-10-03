import express from 'express';
import multer from 'multer';
import { scanDisease, getDiseaseHeatmap } from '../controllers/diseaseController.js';

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => callback(null, ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)),
});
const router = express.Router();

router.post('/scan', upload.single('leafImage'), scanDisease);
router.get('/heatmap', getDiseaseHeatmap);

export default router;

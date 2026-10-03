import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  requestOTP,
  verifyOTPLogin,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  googleLogin,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), registerUser);
router.post('/login', validateBody(loginSchema), loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/otp/request', requestOTP);
router.post('/otp/verify', verifyOTPLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/google', googleLogin);
router.get('/me', protect, getCurrentUser);

export default router;

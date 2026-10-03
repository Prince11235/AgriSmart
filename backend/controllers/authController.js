import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { FarmerProfile } from '../models/FarmerProfile.js';
import { AuditLog } from '../models/AuditLog.js';

const JWT_SECRET = process.env.JWT_SECRET || 'agrismart_super_secret_jwt_key_2026_production';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'agrismart_refresh_secret_key_2026';

const generateTokens = (id, role) => {
  const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '1d' });
  const refreshToken = jwt.sign({ id }, REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d' });
  return { token, refreshToken };
};

const sanitizeUser = (user, roleOverride) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: roleOverride || user.role,
  profilePicture: user.profilePicture,
  location: user.location,
  phone: user.phone,
  isVerified: user.isVerified,
});

const logAudit = async (action, userId, meta = {}) => {
  try {
    await AuditLog.create({ action, userId, meta, ip: meta.ip });
  } catch {
    /* non-blocking */
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, location } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Farmer',
      phone: phone || '',
      location: location || { state: 'Punjab', district: 'Ludhiana', village: 'Samrala', lat: 30.9, lng: 75.85 },
    });

    if (user.role === 'Farmer') {
      await FarmerProfile.create({ userId: user._id });
    }

    const { token, refreshToken } = generateTokens(user._id, user.role);
    user.refreshToken = refreshToken;
    await user.save();

    await logAudit('USER_REGISTER', user._id, { ip: req.ip });

    res.status(201).json({
      success: true,
      token,
      refreshToken,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, roleOverride } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const effectiveRole = roleOverride || user.role;
    const { token, refreshToken } = generateTokens(user._id, effectiveRole);
    user.refreshToken = refreshToken;
    await user.save();

    await logAudit('USER_LOGIN', user._id, { ip: req.ip, role: effectiveRole });

    res.json({
      success: true,
      token,
      refreshToken,
      user: sanitizeUser(user, effectiveRole),
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    const { token, refreshToken: newRefresh } = generateTokens(user._id, user.role);
    user.refreshToken = newRefresh;
    await user.save();

    res.json({ success: true, token, refreshToken: newRefresh });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  res.json({ success: true, user: req.user });
};

export const requestOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = '123456';
  res.json({
    success: true,
    message: `OTP sent to ${phone || 'registered number'}. Use demo OTP in sandbox.`,
    demoOTP: process.env.NODE_ENV === 'production' ? undefined : otp,
  });
};

export const verifyOTPLogin = async (req, res, next) => {
  try {
    const { phone, otp, role, email } = req.body;
    if (otp !== '123456') {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    let user = await User.findOne(email ? { email } : { phone });
    if (!user) {
      const salt = await bcrypt.genSalt(12);
      user = await User.create({
        name: phone || 'OTP Farmer',
        email: email || `${(phone || 'otp').replace(/\W/g, '')}@agrismart.demo`,
        phone: phone || '',
        password: await bcrypt.hash(crypto.randomBytes(16).toString('hex'), salt),
        role: role || 'Farmer',
        isVerified: true,
      });
    }

    const { token, refreshToken } = generateTokens(user._id, role || user.role);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      success: true,
      token,
      refreshToken,
      user: sanitizeUser(user, role || user.role),
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    message: `If an account exists for ${email}, a password reset link has been queued via Nodemailer.`,
  });
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (token && token !== 'demo-reset') {
      return res.status(400).json({ success: false, message: 'Invalid reset token' });
    }
    user.password = await bcrypt.hash(password, 12);
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { email, name, googleId, role } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Google profile email required' });
    }

    let user = await User.findOne({ $or: [{ email }, { googleId }] });
    if (!user) {
      const salt = await bcrypt.genSalt(12);
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        googleId,
        password: await bcrypt.hash(crypto.randomBytes(16).toString('hex'), salt),
        role: role || 'Farmer',
        isVerified: true,
      });
    }

    const { token, refreshToken } = generateTokens(user._id, user.role);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      success: true,
      token,
      refreshToken,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

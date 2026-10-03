import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    if (process.env.NODE_ENV !== 'production') {
      req.user = {
        _id: 'demo_user_123',
        id: 'demo_user_123',
        name: 'Rajesh Kumar',
        email: 'rajesh.farmer@agrismart.org',
        role: req.headers['x-demo-role'] || 'Farmer',
      };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Not authorized — access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'agrismart_super_secret_jwt_key_2026_production');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    if (decoded.role) {
      req.user = req.user.toObject();
      req.user.role = decoded.role;
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token validation failed' });
  }
};

import { User } from '../models/User.js';

export const userRepository = {
  findByEmail: (email) => User.findOne({ email }),
  findById: (id) => User.findById(id).select('-password'),
  create: (payload) => User.create(payload),
  updateRefreshToken: (id, refreshToken) => User.findByIdAndUpdate(id, { refreshToken }),
};

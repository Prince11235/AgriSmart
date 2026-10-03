import API from './api';

export const authService = {
  register: (payload) => API.post('/auth/register', payload).then((r) => r.data),
  login: (payload) => API.post('/auth/login', payload).then((r) => r.data),
  me: () => API.get('/auth/me').then((r) => r.data),
  requestOtp: (phone) => API.post('/auth/otp/request', { phone }).then((r) => r.data),
  verifyOtp: (payload) => API.post('/auth/otp/verify', payload).then((r) => r.data),
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }).then((r) => r.data),
  resetPassword: (payload) => API.post('/auth/reset-password', payload).then((r) => r.data),
  googleLogin: (payload) => API.post('/auth/google', payload).then((r) => r.data),
};

export const farmerService = {
  getProfile: () => API.get('/farmer/profile').then((r) => r.data),
  upsertProfile: (payload) => API.put('/farmer/profile', payload).then((r) => r.data),
};

export const notificationService = {
  list: (params) => API.get('/notifications', { params }).then((r) => r.data),
  markRead: (id) => API.patch(`/notifications/${id}/read`).then((r) => r.data),
};

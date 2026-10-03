import axios from 'axios';
import { REFRESH_KEY, TOKEN_KEY } from '../constants/roles';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let refreshPromise = null;

API.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const role = localStorage.getItem('agrismart_role');
  if (role) {
    config.headers['x-demo-role'] = role;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_KEY);
      if (!refreshToken) {
        return Promise.reject(error);
      }
      try {
        if (!refreshPromise) {
          refreshPromise = axios.post(
            `${import.meta.env.VITE_API_URL || '/api/v1'}/auth/refresh`,
            { refreshToken }
          );
        }
        const { data } = await refreshPromise;
        refreshPromise = null;
        if (data?.token) {
          localStorage.setItem(TOKEN_KEY, data.token);
          if (data.refreshToken) {
            localStorage.setItem(REFRESH_KEY, data.refreshToken);
          }
          original.headers.Authorization = `Bearer ${data.token}`;
          return API(original);
        }
      } catch (refreshErr) {
        refreshPromise = null;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export const fetchCropRecommendation = async (params) => {
  const res = await API.post('/crop/recommend', params);
  return res.data;
};

export const fetchFertilizerRecommendation = async (params) => {
  const res = await API.post('/crop/fertilizer', params);
  return res.data;
};

export const fetchSoilAnalysis = async (params) => {
  const res = await API.post('/soil/analyze', params);
  return res.data;
};

export const fetchWeather = async (city = 'Punjab') => {
  const res = await API.get(`/weather?city=${encodeURIComponent(city)}`);
  return res.data;
};

export const queryAIChatbot = async (message, language = 'English') => {
  const res = await API.post('/crop/chatbot', { message, language });
  return res.data;
};

export const scanLeafDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append('leafImage', imageFile);
  const res = await API.post('/disease/scan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
export default API;

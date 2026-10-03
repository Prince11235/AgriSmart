import { WeatherService } from '../services/weatherService.js';

export const getWeather = async (req, res) => {
  const { city, lat, lon } = req.query;
  const weather = WeatherService.getLiveWeather(city || 'Punjab', lat || 30.9, lon || 75.85);
  res.json({ success: true, data: weather });
};

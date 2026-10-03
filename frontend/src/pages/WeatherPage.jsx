import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, CloudRain, Wind, Droplets, MapPin, Navigation, ExternalLink, Sparkles, Search } from 'lucide-react';
import { fetchWeather } from '../services/api';
import { farmerService } from '../services/authService';
import { useQuery } from '@tanstack/react-query';
import { FarmLocationMap } from '../components/maps/FarmLocationMap';

export const WeatherPage = () => {
  const { data: profileResponse } = useQuery({ queryKey: ['farmer-profile'], queryFn: farmerService.getProfile });
  const profileLocation = profileResponse?.data?.location;
  const profilePlace = [profileLocation?.village, profileLocation?.district, profileLocation?.state].filter(Boolean).join(', ');
  const [selectedCity, setSelectedCity] = useState('');
  const [customSearch, setCustomSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const presetDistricts = ['Ludhiana', 'Amritsar', 'Bathinda', 'Jalandhar', 'Shimla', 'Karnal', 'Jaipur', 'Nashik', 'Coimbatore'];

  useEffect(() => {
    if (profilePlace && !selectedCity) setSelectedCity(profilePlace);
  }, [profilePlace, selectedCity]);

  useEffect(() => {
    if (selectedCity) loadWeatherData(selectedCity, profileLocation?.lat, profileLocation?.lng);
  }, [selectedCity, profileLocation?.lat, profileLocation?.lng]);

  const loadWeatherData = async (city, lat = null, lon = null) => {
    setLoading(true);
    const data = await fetchWeather(city, lat, lon);
    if (data.success && data.data) {
      setWeather(data.data);
    }
    setLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (customSearch.trim()) {
      setSelectedCity(customSearch.trim());
    }
  };

  const detectGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          loadWeatherData(`GPS (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`, latitude, longitude);
        },
        (err) => {
          alert('GPS detection permission denied or unavailable. Please save a village, district, and state in My Farm, or allow GPS access.');
        }
      );
    }
  };

  if (!weather) return <div className="p-12 text-center text-gray-500 font-bold">Loading live weather radar...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase mb-3">
          <Sun className="w-3.5 h-3.5" />
          <span>Module 3 • Geo-Location Climate Radar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Weather Intelligence & Maps</h1>
        <p className="mt-2 text-sm text-gray-500">Specify your exact farm location or detect GPS coordinates to view hyper-local weather conditions and Google Maps GIS boundaries.</p>
      </div>

      {/* Location Selector Bar */}
      <div className="glass-card p-6 border border-emerald-500/30 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Preset Location Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase mr-1">Agricultural Hubs:</span>
            {presetDistricts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedCity(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCity === d
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* GPS Detector */}
          <button
            onClick={detectGPSLocation}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Detect My GPS Location</span>
          </button>
        </div>

        {/* Custom Location Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={customSearch}
              onChange={(e) => setCustomSearch(e.target.value)}
              placeholder="Enter your exact city, village, or district (e.g. Patiala, Karnal, Shimla)..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
            Search Location
          </button>
        </form>
      </div>

      {/* Main Weather Card */}
      <div className="glass-card bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 text-white p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-amber-300 animate-bounce" />
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase">
                {weather.location.city}, {weather.location.state}
              </span>
            </div>
            <h2 className="text-5xl font-black mt-3">{weather.current.temp}°C</h2>
            <p className="text-base text-blue-100 mt-1">{weather.current.condition} • Feels like {weather.current.feelsLike}°C</p>
            <p className="text-xs text-blue-200 mt-1 font-mono">GPS: {weather.location.lat}, {weather.location.lon}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
              <Droplets className="w-5 h-5 mx-auto mb-1 text-cyan-200" />
              <span className="text-xs text-blue-100">Humidity</span>
              <p className="text-lg font-bold">{weather.current.humidity}%</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
              <Wind className="w-5 h-5 mx-auto mb-1 text-blue-200" />
              <span className="text-xs text-blue-100">Wind Speed</span>
              <p className="text-lg font-bold">{weather.current.windSpeed} km/h</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
              <Sun className="w-5 h-5 mx-auto mb-1 text-amber-300" />
              <span className="text-xs text-blue-100">UV Index</span>
              <p className="text-lg font-bold">{weather.current.uvIndex}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
              <CloudRain className="w-5 h-5 mx-auto mb-1 text-blue-300" />
              <span className="text-xs text-blue-100">Rain Prob.</span>
              <p className="text-lg font-bold">{weather.current.rainProbability}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Map & AI Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Location Map View */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <span>GIS Map View: {weather.location.city}</span>
              </h3>
              <p className="text-xs text-gray-500">Centroid: {weather.location.lat}, {weather.location.lon}</p>
            </div>
            <a
              href={weather.location.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center space-x-1 shadow"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <FarmLocationMap lat={weather.location.lat} lng={weather.location.lon} farmName={`${weather.location.city} Farm Boundary`} />
        </div>

        {/* AI Actionable Tips for Location */}
        <div className="glass-card p-6 border-l-4 border-l-amber-500 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Location-Specific AI Farming Guidance</span>
            </h3>
            <div className="space-y-3">
              {weather.aiTips.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                  <span className="text-amber-500 font-bold mr-1.5">💡 Tip #{idx + 1}:</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
            <span>Air Quality Index (AQI): <strong>{weather.current.airQualityIndex} (Good)</strong></span>
            <span>Refreshed Live</span>
          </div>
        </div>

      </div>

      {/* 7-Day Forecast Timeline */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">7-Day Localized Forecast Timeline</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {weather.forecast.map((f, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 text-center border border-gray-200 dark:border-gray-700">
              <span className="text-xs font-bold text-gray-500 uppercase">{f.day}</span>
              <div className="my-2">
                <CloudSun className="w-8 h-8 mx-auto text-amber-400" />
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{f.tempMax}° / {f.tempMin}°</p>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold block mt-1">💧 {f.rainProb}% Rain</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

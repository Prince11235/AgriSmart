import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { farmerService } from '../../services/authService';
import { Link } from 'react-router-dom';
import { Sprout, Sun, Bug, TestTube, DollarSign, Calendar, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { FarmLocationMap } from '../maps/FarmLocationMap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const FarmerDashboard = () => {
  const { user } = useAuth();
  const { data } = useQuery({ queryKey: ['farmer-profile'], queryFn: farmerService.getProfile });
  const profile = data?.data;
  const location = profile?.location || user?.location || {};
  const farmName = [location.village, location.district, location.state].filter(Boolean).join(', ') || 'Your registered farm';
  const lat = location.lat ?? 20.5937;
  const lng = location.lng ?? 78.9629;
  const farmArea = profile?.farmAreaAcres ?? '—';
  const crops = profile?.primaryCrops?.join(', ') || 'No crop recorded';
  const yieldTrends = [
    { month: 'Jan', yield: 3.2 },
    { month: 'Feb', yield: 3.5 },
    { month: 'Mar', yield: 4.1 },
    { month: 'Apr', yield: 4.8 },
    { month: 'May', yield: 5.2 },
    { month: 'Jun', yield: 5.0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome Banner */}
      <div className="glass-card bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3 inline-block">Farmer Workspace</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Welcome back, {user?.name || 'Farmer'}! 👋</h1>
          <p className="mt-2 text-emerald-100 text-sm leading-relaxed">
            Your {farmArea} acre farm at {farmName} is ready for personalized advisory. Update your farm profile to keep map and local weather accurate.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/crop-advisory" className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-lg">
              Get AI Crop Advice
            </Link>
            <Link to="/disease-scanner" className="px-4 py-2.5 rounded-xl bg-emerald-950/40 text-white font-bold text-xs border border-white/30 hover:bg-emerald-950/60 transition-colors">
              Scan Leaf Disease
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Soil Health Score</p>
              <h3 className="text-2xl font-black mt-1 text-emerald-600 dark:text-emerald-400">88 / 100</h3>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <TestTube className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-3 font-medium">Optimal Organic Carbon (0.68%)</p>
        </div>

        <div className="glass-card p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Current Crop</p>
              <h3 className="text-2xl font-black mt-1 text-amber-600 dark:text-amber-400">{crops}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Sprout className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-3 font-medium">Day 45 of 120 Growth Cycle</p>
        </div>

        <div className="glass-card p-5 border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Net Farm Revenue</p>
              <h3 className="text-2xl font-black mt-1 text-cyan-600 dark:text-cyan-400">₹2,82,200</h3>
            </div>
            <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-emerald-500 mt-3 font-bold flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +18.4% from last harvest
          </p>
        </div>

        <div className="glass-card p-5 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Disease Alerts</p>
              <h3 className="text-2xl font-black mt-1 text-red-600 dark:text-red-400">1 Warning</h3>
            </div>
            <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
              <Bug className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-red-500 mt-3 font-bold">Late Blight reported nearby</p>
        </div>
      </div>

      {/* Main Grid: Chart & Farm Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Yield Projection Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Yield Trend & Forecast (Tons / Acre)</h3>
              <p className="text-xs text-gray-500">AI projection based on weather & fertilizer application</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600">AI Confidence 96%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldTrends}>
                <defs>
                  <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#yieldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Farm Location Map */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Your Registered Farm</h3>
            <p className="text-xs text-gray-500 mb-4">{farmName}</p>
          </div>
          <FarmLocationMap
            lat={lat}
            lng={lng}
            farmName={user?.name ? `${user.name}'s Farm` : farmName}
            village={location.village}
            district={location.district}
            state={location.state}
            farmAreaAcres={farmArea !== '—' ? farmArea : 5}
          />
        </div>

      </div>

    </div>
  );
};

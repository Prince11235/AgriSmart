import React, { useState } from 'react';
import { ShieldAlert, Radio, MapPin, CheckCircle2, AlertTriangle } from 'lucide-react';
import { DiseaseHeatmap } from '../maps/DiseaseHeatmap';

export const OfficerDashboard = () => {
  const [broadcastDone, setBroadcastDone] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-card bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 sm:p-8">
        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2 inline-block">District Agri Office</span>
        <h1 className="text-3xl font-extrabold">Agricultural Officer Command Center</h1>
        <p className="mt-1 text-purple-100 text-sm">Monitoring Ludhiana & Patiala District crop health, pest outbreaks, and field officer inspections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* District Disease Heatmap */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            <span>District Disease Heat Map & Outbreak Clusters</span>
          </h3>
          <DiseaseHeatmap />
        </div>

        {/* Emergency Alert Broadcast Panel */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-2 flex items-center space-x-2">
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
            <span>Broadcast Emergency Advisory</span>
          </h3>
          <p className="text-xs text-gray-500 mb-4">Send SMS & Push notification to all 12,000 district farmers</p>

          <form onSubmit={(e) => { e.preventDefault(); setBroadcastDone(true); }} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Alert Category</label>
              <select className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <option>High Humidity Fungal Warning</option>
                <option>Unseasonal Rain Advisory</option>
                <option>Locust Attack Warning</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Broadcast Message</label>
              <textarea rows={4} defaultValue="WARNING: High moisture in Ludhiana Block-4. Spray Mancozeb 75% WP immediately to protect Tomato and Paddy crops against Late Blight." className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1 shadow-lg shadow-red-500/20">
              <Radio className="w-4 h-4" />
              <span>Broadcast SMS & App Push Alert</span>
            </button>

            {broadcastDone && (
              <p className="text-xs text-emerald-600 font-bold text-center mt-2 animate-bounce">
                📡 Emergency Alert successfully dispatched to 14,250 registered farmers!
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

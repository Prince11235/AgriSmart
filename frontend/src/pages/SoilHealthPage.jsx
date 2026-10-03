import React, { useState } from 'react';
import { TestTube, FileText, CheckCircle, Download, Activity, Sparkles } from 'lucide-react';
import { fetchSoilAnalysis } from '../services/api';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const SoilHealthPage = () => {
  const [formData, setFormData] = useState({
    N: 110,
    P: 45,
    K: 55,
    pH: 6.8,
    organicCarbon: 0.65,
    electricalConductivity: 0.8
  });

  const [result, setResult] = useState({
    soilHealthScore: 88,
    healthCategory: 'Optimal Healthy Soil',
    nutrientBreakdown: { N: 110, P: 45, K: 55, pH: 6.8, organicCarbon: 0.65 },
    recommendations: [
      'Incorporate 2-3 tons of farmyard manure per acre to boost organic carbon.',
      'Maintain balanced N:P:K ratio of 4:2:1.',
      'Conduct deep summer plowing to destroy soil-borne pest pathogens.'
    ]
  });

  const handleAnalyze = async (e) => {
    e.preventDefault();
    const res = await fetchSoilAnalysis(formData);
    if (res.success && res.data) {
      setResult(res.data);
    }
  };

  const radarData = [
    { subject: 'Nitrogen (N)', A: formData.N, fullMark: 150 },
    { subject: 'Phosphorus (P)', A: formData.P * 2, fullMark: 100 },
    { subject: 'Potassium (K)', A: formData.K * 1.5, fullMark: 100 },
    { subject: 'pH Balance', A: formData.pH * 10, fullMark: 100 },
    { subject: 'Organic Carbon', A: formData.organicCarbon * 100, fullMark: 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase mb-3">
          <TestTube className="w-3.5 h-3.5" />
          <span>Module 6 • Soil Health Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Soil Health & NPK Analyzer</h1>
        <p className="mt-2 text-sm text-gray-500">Upload lab PDF reports or manually enter soil parameters to calculate your Soil Health Score and nutrient radar chart.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Form */}
        <div className="glass-card p-6 border border-cyan-500/20">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center space-x-2">
            <TestTube className="w-5 h-5 text-cyan-500" />
            <span>Soil Test Parameters</span>
          </h3>

          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Nitrogen (N - kg/ha)</label>
              <input type="number" value={formData.N} onChange={(e) => setFormData({ ...formData, N: Number(e.target.value) })} className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Phosphorus (P)</label>
                <input type="number" value={formData.P} onChange={(e) => setFormData({ ...formData, P: Number(e.target.value) })} className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Potassium (K)</label>
                <input type="number" value={formData.K} onChange={(e) => setFormData({ ...formData, K: Number(e.target.value) })} className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Soil pH</label>
                <input type="number" step="0.1" value={formData.pH} onChange={(e) => setFormData({ ...formData, pH: Number(e.target.value) })} className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Organic Carbon (%)</label>
                <input type="number" step="0.01" value={formData.organicCarbon} onChange={(e) => setFormData({ ...formData, organicCarbon: Number(e.target.value) })} className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 transition-colors">
              Re-Calculate Soil Health Score
            </button>
          </form>
        </div>

        {/* Output & Radar Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border-l-4 border-l-cyan-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400">Calculated Soil Health Index</span>
              <h2 className="text-4xl font-black text-cyan-600 dark:text-cyan-400 mt-1">{result.soilHealthScore} / 100</h2>
              <p className="text-xs text-gray-500 mt-1 font-semibold">{result.healthCategory}</p>
            </div>
            <button
              onClick={() => alert('Exporting Soil Health Card PDF...')}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Soil Health Card</span>
            </button>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Nutrient Profile Radar Chart</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#94a3b8" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Soil Nutrients" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

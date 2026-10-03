import React, { useState } from 'react';
import { TestTube, Calculator, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';
import { fetchFertilizerRecommendation } from '../services/api';

export const FertilizerPage = () => {
  const [targetCrop, setTargetCrop] = useState('Paddy (Rice)');
  const [areaAcres, setAreaAcres] = useState(5);
  const [N, setN] = useState(60);
  const [P, setP] = useState(30);
  const [K, setK] = useState(30);

  const [result, setResult] = useState({
    estimatedCost: '$165 / ₹13,700',
    fertilizerSchedule: [
      { type: 'DAP (Diammonium Phosphate)', amountKg: 65, Timing: 'Basal Application (At Sowing)', function: 'Root development & early phosphorus supply' },
      { type: 'Urea (46% Nitrogen)', amountKg: 95, Timing: 'Split in 2 Doses (21 & 45 days after sowing)', function: 'Vegetative leaf & stem growth' },
      { type: 'MOP (Muriate of Potash)', amountKg: 35, Timing: 'Basal Application & Flowering stage', function: 'Grain filling & drought resilience' },
      { type: 'Organic Vermicompost / Neem Cake', amountKg: 1250, Timing: '10 Days Prior to Sowing', function: 'Soil microbial health & slow-release nutrients' }
    ]
  });

  const handleCalculate = async (e) => {
    e.preventDefault();
    const res = await fetchFertilizerRecommendation({ N, P, K, targetCrop, areaAcres });
    if (res.success && res.data) {
      setResult(res.data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Module 4 • Dosage Optimization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Fertilizer Recommendation AI</h1>
        <p className="mt-2 text-sm text-gray-500">Calculate exact Urea, DAP, Potash, and organic compost quantities based on target crop requirement and land acreage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="glass-card p-6 border border-emerald-500/20">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-emerald-500" />
            <span>Target Parameters</span>
          </h3>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Target Crop</label>
              <select value={targetCrop} onChange={(e) => setTargetCrop(e.target.value)} className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <option>Paddy (Rice)</option>
                <option>Wheat</option>
                <option>Maize (Corn)</option>
                <option>Cotton</option>
                <option>Sugarcane</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Total Farm Area (Acres)</label>
              <input type="number" value={areaAcres} onChange={(e) => setAreaAcres(Number(e.target.value))} className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold uppercase">N Level</label>
                <input type="number" value={N} onChange={(e) => setN(Number(e.target.value))} className="w-full text-xs p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase">P Level</label>
                <input type="number" value={P} onChange={(e) => setP(Number(e.target.value))} className="w-full text-xs p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase">K Level</label>
                <input type="number" value={K} onChange={(e) => setK(Number(e.target.value))} className="w-full text-xs p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors">
              Calculate Fertilizer Dosage & Cost
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border-l-4 border-l-emerald-500 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Estimated Total Cost</span>
              <h2 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{result.estimatedCost}</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">For {areaAcres} Acres</span>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Recommended Application Timetable</h3>
            <div className="space-y-4">
              {result.fertilizerSchedule.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.type}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                      {item.amountKg} kg total
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">⏰ Timing: {item.Timing}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.function}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

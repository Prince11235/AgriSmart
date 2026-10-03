import React, { useState } from 'react';
import { Landmark, Search, CheckCircle, ExternalLink } from 'lucide-react';

export const SchemesPage = () => {
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState({});

  const schemes = [
    {
      id: '1',
      title: 'PM-KISAN Samman Nidhi Scheme',
      department: 'Ministry of Agriculture & Farmers Welfare',
      benefit: '₹6,000 / year in 3 installments',
      category: 'Direct Cash Support',
      desc: 'Financial assistance of ₹6,000 per year directly transferred to valid landholding farmer bank accounts.'
    },
    {
      id: '2',
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      department: 'Department of Agricultural Cooperation',
      benefit: 'Up to 100% Crop Loss Insurance',
      category: 'Insurance',
      desc: 'Financial security and yield loss compensation due to unseasonal rain, drought, or pest outbreaks.'
    },
    {
      id: '3',
      title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      department: 'Ministry of Agriculture',
      benefit: '50% to 80% Subsidy on Machinery',
      category: 'Equipment',
      desc: 'Subsidies for purchasing modern tractors, rotavators, harvesters, and solar water pumps.'
    }
  ];

  const filtered = schemes.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase mb-3">
          <Landmark className="w-3.5 h-3.5" />
          <span>Module 9 • Government Welfare</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Government Schemes & Subsidies</h1>
        <p className="mt-2 text-sm text-gray-500">Discover PM-Kisan, crop insurance, equipment subsidies, and organic farming grants.</p>
      </div>

      <div className="max-w-xl mx-auto relative">
        <Search className="w-5 h-5 absolute left-3.5 top-3 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schemes by name or department..."
          className="w-full text-xs pl-11 pr-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((s) => (
          <div key={s.id} className="glass-card p-6 border-l-4 border-l-blue-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{s.department}</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{s.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                Benefit: {s.benefit}
              </span>
            </div>

            <button
              onClick={() => setApplied({ ...applied, [s.id]: true })}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md whitespace-nowrap"
            >
              {applied[s.id] ? '✅ Application Submitted' : 'Apply Online (Aadhaar Verified)'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

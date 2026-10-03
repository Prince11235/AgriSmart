import React, { useState } from 'react';
import { Landmark, FileCheck, CheckCircle2, XCircle, Users, Award } from 'lucide-react';

export const GovernmentAdminDashboard = () => {
  const [applications, setApplications] = useState([
    { id: 'APP-901', farmer: 'Sukhdev Singh', scheme: 'PM-KISAN Samman Nidhi', landAcres: '4.5 Acres', status: 'Pending Verification' },
    { id: 'APP-902', farmer: 'Priya Sharma', scheme: 'PMFBY Crop Insurance', landAcres: '6.0 Acres', status: 'Pending Verification' },
    { id: 'APP-903', farmer: 'Manpreet Singh', scheme: 'SMAM Tractor Subsidy', landAcres: '8.2 Acres', status: 'Approved' },
  ]);

  const updateStatus = (id, newStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-card bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8">
        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2 inline-block">Government Portal</span>
        <h1 className="text-3xl font-extrabold">State Agricultural Subsidy & Scheme Administrator</h1>
        <p className="mt-1 text-blue-100 text-sm">Reviewing PM-Kisan DBT applications, crop loss compensation claims, and machinery subsidies.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 border-l-4 border-l-blue-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">Subsidies Disbursed</p>
          <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">₹4.28 Crore</h3>
          <span className="text-[10px] text-gray-400">14,200 Farmers Benefited</span>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-amber-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">Applications Queue</p>
          <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">32 Pending</h3>
          <span className="text-[10px] text-amber-500 font-bold">Action Required</span>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-emerald-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">Verification Rate</p>
          <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">98.4%</h3>
          <span className="text-[10px] text-emerald-500 font-bold">Aadhaar NPCI Auto-Verified</span>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <FileCheck className="w-5 h-5 text-blue-500" />
          <span>Pending Subsidy Applications</span>
        </h3>

        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-blue-500 font-bold">{app.id}</span>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{app.farmer} ({app.landAcres})</h4>
                <p className="text-xs text-gray-500 mt-0.5">Applied Scheme: <strong>{app.scheme}</strong></p>
              </div>

              <div className="flex items-center space-x-2">
                {app.status === 'Approved' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approved & DBT Disbursed</span>
                  </span>
                ) : app.status === 'Rejected' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">Rejected</span>
                ) : (
                  <>
                    <button
                      onClick={() => updateStatus(app.id, 'Approved')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'Rejected')}
                      className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

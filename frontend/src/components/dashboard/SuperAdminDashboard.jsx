import React, { useState } from 'react';
import { ShieldCheck, Users, Server, Cpu, Activity, ToggleLeft, ToggleRight, ListOrdered } from 'lucide-react';

export const SuperAdminDashboard = () => {
  const [modelActive, setModelActive] = useState(true);

  const auditLogs = [
    { id: 1, action: 'User RBAC Escalation to Expert', user: 'admin@agrismart.org', time: '5 mins ago', status: 'SUCCESS' },
    { id: 2, action: 'AI Crop Recommendation Retrained', user: 'SYSTEM_CRON', time: '22 mins ago', status: 'SUCCESS' },
    { id: 3, action: 'Database Backup Completed to Atlas', user: 'SYSTEM_BACKUP', time: '1 hour ago', status: 'SUCCESS' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-card bg-gradient-to-r from-gray-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 border border-emerald-500/30">
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 inline-block border border-emerald-500/30">Super Admin Console</span>
        <h1 className="text-3xl font-extrabold gradient-text">System Oversight & Machine Learning Operations</h1>
        <p className="mt-1 text-gray-400 text-sm">Real-time system health metrics, MongoDB Atlas cluster status, RBAC policies, and AI inference latency.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 border-l-4 border-l-emerald-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">System Uptime</p>
          <h3 className="text-2xl font-black text-emerald-500 mt-1">99.98%</h3>
          <span className="text-[10px] text-gray-400">Render / Railway Cluster</span>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-blue-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">Registered Users</p>
          <h3 className="text-2xl font-black text-blue-500 mt-1">14,250</h3>
          <span className="text-[10px] text-gray-400">6 Role Partitioning</span>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-purple-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">AI Model Accuracy</p>
          <h3 className="text-2xl font-black text-purple-500 mt-1">96.8%</h3>
          <span className="text-[10px] text-gray-400">ResNet-50 Vision Engine</span>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-cyan-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">API Invocations</p>
          <h3 className="text-2xl font-black text-cyan-500 mt-1">489,200</h3>
          <span className="text-[10px] text-gray-400">Avg Latency: 42ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* System Monitoring & AI Toggles */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2 text-gray-900 dark:text-white">
            <Cpu className="w-5 h-5 text-emerald-500" />
            <span>AI Model Engine Controls</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800">
              <div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">Crop Advisory Neural Net</h4>
                <p className="text-[10px] text-gray-500">v2.4 - NPK & Climate Vector Engine</p>
              </div>
              <button onClick={() => setModelActive(!modelActive)} className="text-emerald-500">
                {modelActive ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-gray-400" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800">
              <div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">Leaf Vision Diagnostic Model</h4>
                <p className="text-[10px] text-gray-500">v3.1 - ResNet-50 Classifier</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800">
              <div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">Soil Health Score Calculator</h4>
                <p className="text-[10px] text-gray-500">Rule-Based Vector Math</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2 text-gray-900 dark:text-white">
            <ListOrdered className="w-5 h-5 text-blue-500" />
            <span>System Audit Logs & Security Traces</span>
          </h3>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">{log.action}</h4>
                  <p className="text-[10px] text-gray-500">Triggered by: {log.user} • {log.time}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">{log.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

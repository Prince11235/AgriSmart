import React, { useState } from 'react';
import { DollarSign, PlusCircle, TrendingUp, TrendingDown, Calendar, FileText } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const FarmDiaryPage = () => {
  const [entries, setEntries] = useState([
    { id: '1', title: 'Paddy PR-126 Seeds', category: 'Expense', amount: 245, date: '2026-07-20', crop: 'Paddy' },
    { id: '2', title: 'DAP Fertilizer 50kg', category: 'Expense', amount: 180, date: '2026-07-22', crop: 'Paddy' },
    { id: '3', title: 'Grain Harvest Sale', category: 'Income', amount: 3400, date: '2026-07-15', crop: 'Wheat' },
  ]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Expense');
  const [amount, setAmount] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    setEntries(prev => [
      { id: Date.now().toString(), title, category, amount: Number(amount), date: new Date().toISOString().split('T')[0], crop: 'Paddy' },
      ...prev
    ]);
    setTitle('');
    setAmount('');
  };

  const chartData = [
    { name: 'Expense', total: entries.filter(e => e.category === 'Expense').reduce((acc, e) => acc + e.amount, 0) },
    { name: 'Income', total: entries.filter(e => e.category === 'Income').reduce((acc, e) => acc + e.amount, 0) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase mb-3">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Module 12 • Farm Financial Diary</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Expense & Income Manager</h1>
        <p className="mt-2 text-sm text-gray-500">Track seed expenditures, fertilizer purchases, irrigation costs, and crop harvest income.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="glass-card p-6 border border-emerald-500/20">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-emerald-500" />
            <span>Log New Transaction</span>
          </h3>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Description</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Urea 50kg purchase" className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <option>Expense</option>
                  <option>Income</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Amount ($)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md">
              Save Entry to Farm Diary
            </button>
          </form>
        </div>

        {/* History Table & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Financial Summary Chart</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 space-y-3">
            <h3 className="text-lg font-bold">Recent Diary Logs</h3>
            {entries.map((entry) => (
              <div key={entry.id} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 flex items-center justify-between border border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">{entry.title}</h4>
                  <span className="text-[10px] text-gray-400">{entry.date} • {entry.crop}</span>
                </div>
                <span className={`text-sm font-black ${entry.category === 'Income' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {entry.category === 'Income' ? '+' : '-'}${entry.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

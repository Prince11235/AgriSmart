import React, { useState } from 'react';
import { UserCheck, Video, Calendar, Clock, FileText, CheckCircle, Star } from 'lucide-react';

export const ExpertDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [prescriptionSent, setPrescriptionSent] = useState(false);

  const appointments = [
    { id: '1', farmer: 'Gurpreet Singh', crop: 'Wheat (Yellow Rust Suspected)', slot: '10:00 AM Today', status: 'Pending Call', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { id: '2', farmer: 'Harpreet Kaur', crop: 'Paddy (Leaf Folder Pest)', slot: '02:30 PM Today', status: 'Confirmed', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-card bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-6 sm:p-8">
        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2 inline-block">Agronomist Portal</span>
        <h1 className="text-3xl font-extrabold">Expert Consultation Hub</h1>
        <p className="mt-1 text-cyan-100 text-sm">Welcome Dr. Ramesh Chandra (Senior Plant Pathologist). You have 2 scheduled video consultations today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Appointments Queue */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-cyan-500" />
            <span>Today's Farmer Consultations</span>
          </h3>

          <div className="space-y-4">
            {appointments.map((app) => (
              <div key={app.id} className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <img src={app.image} alt={app.farmer} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{app.farmer}</h4>
                    <p className="text-xs text-gray-500">{app.crop}</p>
                    <span className="inline-flex items-center text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold mt-1">
                      <Clock className="w-3 h-3 mr-1" /> {app.slot}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://meet.jit.si/AgriSmartExpertConsultationRoom"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
                  >
                    <Video className="w-4 h-4" />
                    <span>Launch Video Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Prescription Generator */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-2 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-500" />
            <span>Issue Digital Prescription</span>
          </h3>
          <p className="text-xs text-gray-500 mb-4">Write official treatment notes for Gurpreet Singh</p>

          <form onSubmit={(e) => { e.preventDefault(); setPrescriptionSent(true); }} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Diagnosis Name</label>
              <input type="text" defaultValue="Wheat Yellow Rust (Puccinia striiformis)" className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Recommended Chemical/Organic Spray</label>
              <textarea rows={3} defaultValue="Propiconazole 25% EC @ 1ml/L water. Spray twice at 10-day intervals." className="w-full text-xs p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Send Digital Prescription</span>
            </button>

            {prescriptionSent && (
              <p className="text-xs text-emerald-600 font-bold text-center mt-2 animate-bounce">
                ✅ Prescription issued and sent to Farmer's SMS & Email!
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

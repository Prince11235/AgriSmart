import React, { useState } from 'react';
import { Video, Calendar, Star, Clock, CheckCircle, Award } from 'lucide-react';

export const ConsultationPage = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const experts = [
    {
      id: '1',
      name: 'Dr. Ramesh Chandra',
      title: 'Senior Plant Pathologist',
      experience: '18 Years Exp.',
      rating: 4.9,
      reviews: 142,
      specialization: 'Fungal & Bacterial Diagnostics',
      fee: '$15 / ₹1,200',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      slots: ['10:00 AM', '02:30 PM', '05:00 PM']
    },
    {
      id: '2',
      name: 'Dr. Sunita Sharma',
      title: 'Soil Health & Organic Specialist',
      experience: '12 Years Exp.',
      rating: 4.8,
      reviews: 98,
      specialization: 'NPK Deficiency & Compost Chemistry',
      fee: '$12 / ₹1,000',
      image: 'https://images.unsplash.com/photo-1594824813571-2153349aed06?auto=format&fit=crop&w=200&q=80',
      slots: ['11:30 AM', '03:00 PM', '06:30 PM']
    }
  ];

  const handleBook = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setSelectedExpert(null);
      setBookingConfirmed(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase mb-3">
          <Video className="w-3.5 h-3.5" />
          <span>Module 7 • Virtual Consultations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Expert Agronomist Consultations</h1>
        <p className="mt-2 text-sm text-gray-500">Book 1-on-1 video calls with leading agricultural scientists and receive digital prescriptions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {experts.map((exp) => (
          <div key={exp.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-start space-x-4">
              <img src={exp.image} alt={exp.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-500 shadow-md" />
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">{exp.experience}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.name}</h3>
                <p className="text-xs text-gray-500">{exp.title}</p>
                <p className="text-xs text-purple-600 font-semibold mt-1">Specialty: {exp.specialization}</p>

                <div className="flex items-center space-x-1 text-amber-400 mt-2 text-xs font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{exp.rating} ({exp.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-base font-black text-gray-900 dark:text-white">Consultation Fee: {exp.fee}</span>
              <button
                onClick={() => setSelectedExpert(exp)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md"
              >
                Book Video Slot
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Slot Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card bg-white dark:bg-gray-900 p-6 max-w-md w-full rounded-3xl space-y-4 animate-in zoom-in-95">
            <h3 className="text-lg font-bold">Select Available Slot for {selectedExpert.name}</h3>
            <div className="grid grid-cols-3 gap-2">
              {selectedExpert.slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    selectedSlot === slot ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleBook}
                disabled={!selectedSlot}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs disabled:opacity-50"
              >
                Confirm Video Slot Booking
              </button>
              <button onClick={() => setSelectedExpert(null)} className="px-4 py-3 rounded-xl bg-gray-200 text-gray-800 text-xs font-bold">
                Cancel
              </button>
            </div>

            {bookingConfirmed && (
              <p className="text-xs text-emerald-600 font-bold text-center animate-bounce">
                🎉 Consultation Confirmed! Video call room link sent to your SMS.
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

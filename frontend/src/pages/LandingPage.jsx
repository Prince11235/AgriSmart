import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Sparkles, 
  ShieldCheck, 
  Bug, 
  TestTube, 
  Sun, 
  ShoppingBag, 
  Video, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Award,
  Globe
} from 'lucide-react';

export const LandingPage = () => {
  const features = [
    { icon: <Sprout className="w-6 h-6 text-emerald-500" />, title: 'AI Crop Advisory Engine', desc: 'Predict top 5 suitable crops based on soil NPK, pH, temperature, and historical rainfall.' },
    { icon: <Bug className="w-6 h-6 text-red-500" />, title: 'Leaf Disease Vision Scanner', desc: 'Instant diagnosis from leaf photo uploads with chemical & organic remedies and outbreak maps.' },
    { icon: <TestTube className="w-6 h-6 text-cyan-500" />, title: 'Soil Health & NPK Analyzer', desc: 'Generate 0-100 soil health scores, nutrient deficiency radar charts, and downloadable PDF reports.' },
    { icon: <Sun className="w-6 h-6 text-amber-500" />, title: 'Weather Intelligence', desc: '7-day localized forecast timelines with automated frost and heavy rainfall alerts.' },
    { icon: <Video className="w-6 h-6 text-purple-500" />, title: 'Virtual Expert Call', desc: 'Connect directly with certified agronomists and plant pathologists via video calls and digital notes.' },
    { icon: <ShoppingBag className="w-6 h-6 text-orange-500" />, title: 'Agri Marketplace', desc: 'Direct e-commerce for certified hybrid seeds, organic pesticides, machinery, and crop trading.' }
  ];

  const stats = [
    { num: '14,250+', label: 'Registered Farmers' },
    { num: '96.8%', label: 'AI Diagnostic Accuracy' },
    { num: '₹4.28 Cr', label: 'Government Subsidies Disbursed' },
    { num: '140+', label: 'Certified Agronomists' }
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glassmorphism border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Next-Gen Agricultural Intelligence Platform v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-gray-900 dark:text-white max-w-4xl mx-auto">
            Empowering Agriculture with <span className="gradient-text">Precision AI</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Maximize crop yield, minimize pest outbreaks, and optimize fertilizer dosage with real-time AI advisories, soil health analytics, and expert consultations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/crop-advisory"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Sprout className="w-5 h-5" />
              <span>Launch AI Advisory Engine</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glassmorphism text-gray-800 dark:text-gray-200 font-bold text-base hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-gray-300 dark:border-gray-700"
            >
              Explore 6 Role Dashboards
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="glass-card p-6 border border-emerald-500/20">
                <h3 className="text-3xl font-black gradient-text">{s.num}</h3>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Complete Enterprise Agriculture Suite
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Tailored tools designed for smallholder farmers, large agricultural estates, agronomists, and government departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

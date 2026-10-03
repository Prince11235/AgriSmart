import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">AgriSmart</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Enterprise AI-Powered Smart Crop Advisory System empowering farmers, agronomists, marketplace vendors, and government bodies with real-time intelligence.
          </p>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Government Verified & ISO 27001 Compliant</span>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">AI Modules & Services</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/crop-advisory" className="hover:text-emerald-400 transition-colors">Crop Recommendation AI</Link></li>
            <li><Link to="/disease-scanner" className="hover:text-emerald-400 transition-colors">Leaf Disease Scanner</Link></li>
            <li><Link to="/soil-health" className="hover:text-emerald-400 transition-colors">Soil Health & NPK Analyzer</Link></li>
            <li><Link to="/weather" className="hover:text-emerald-400 transition-colors">Weather Intelligence & Alerts</Link></li>
            <li><Link to="/farm-diary" className="hover:text-emerald-400 transition-colors">Farm Expense & Profit Diary</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Ecosystem & Portals</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/marketplace" className="hover:text-emerald-400 transition-colors">Agri Marketplace Store</Link></li>
            <li><Link to="/consultation" className="hover:text-emerald-400 transition-colors">Book Expert Video Call</Link></li>
            <li><Link to="/schemes" className="hover:text-emerald-400 transition-colors">Government Subsidies Portal</Link></li>
            <li><a href="/api-docs" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Swagger REST API Specs</a></li>
            <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Role Dashboard Switcher</Link></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Kisan Support Helpline</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Toll Free: 1800-180-1551</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>support@agrismart.org</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Agri-Tech Park, Ludhiana, Punjab</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 AgriSmart Inc. All Rights Reserved. Enterprise Edition v1.0.0</p>
        <p className="flex items-center space-x-1 mt-2 md:mt-0">
          <span>Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>for Global Agriculture</span>
        </p>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, AlertCircle, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center max-w-7xl mx-auto px-4 text-center">
      <div className="glass-card p-12 max-w-md w-full space-y-4">
        <Sprout className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
        <h1 className="text-5xl font-black gradient-text">404</h1>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Field Path Not Found</h2>
        <p className="text-xs text-gray-500">The requested page or crop advisory module does not exist or has been relocated.</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg"
        >
          <Home className="w-4 h-4" />
          <span>Back to AgriSmart Home</span>
        </Link>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sprout, 
  Sun, 
  Moon, 
  Globe, 
  UserCheck, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Bot, 
  Sparkles,
  CloudSun
} from 'lucide-react';

export const Navbar = () => {
  const { user, switchRole, language, switchLanguage, logout, isAuthenticated, t } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { name: t('Dashboard'), path: '/dashboard' },
    { name: t('AI Advisory'), path: '/crop-advisory' },
    { name: t('Disease Scanner'), path: '/disease-scanner' },
    { name: t('Soil Health'), path: '/soil-health' },
    { name: t('Weather'), path: '/weather' },
    { name: t('Marketplace'), path: '/marketplace' },
    { name: t('Expert Call'), path: '/consultation' },
    { name: t('Gov Schemes'), path: '/schemes' },
    { name: t('Farm Diary'), path: '/farm-diary' },
    { name: t('My Farm'), path: '/farmer-profile' },
  ];

  const languages = ['English', 'Hindi (हिंदी)', 'Marathi (मराठी)', 'Punjabi (ਪੰਜਾਬੀ)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)'];

  return (
    <header className="sticky top-0 z-50 glassmorphism border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      {/* Top Advisory Ticker */}
      <div className="bg-emerald-600 text-white text-xs py-1 px-4 flex items-center justify-between font-medium">
        <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap animate-pulse">
          <CloudSun className="w-4 h-4 flex-shrink-0" />
          <span>🌧️ <strong>Live Weather Alert:</strong> Moderate rain forecasted in Punjab & Haryana over next 48 hours. Postpone urea top-dressing.</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-emerald-100">
          <span>Toll-Free Kisan Helpline: 1800-180-1551</span>
          <span>•</span>
          <span>ISO 27001 Certified</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight gradient-text">AgriSmart</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">AI PRO</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* RBAC Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                title="Switch Active User Role"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Role:</span>
                <span className="underline decoration-amber-400">{user?.role}</span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 glassmorphism rounded-xl shadow-2xl py-2 z-50 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Switch User Role</div>
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between ${
                        user?.role === r ? 'bg-emerald-500 text-white font-bold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>{r}</span>
                      {user?.role === r && <Sparkles className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Select Language"
              >
                <Globe className="w-4 h-4" /><span className="ml-1 text-[10px] font-bold">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 glassmorphism rounded-xl shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        switchLanguage(l);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <>
                  <img
                    src={user?.profilePicture || user?.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-emerald-500 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      window.location.href = '/login';
                    }}
                    className="text-[10px] font-bold uppercase text-gray-500 hover:text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-xs font-bold text-emerald-600">
                  Sign in
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glassmorphism border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-500 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

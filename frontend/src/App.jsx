import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { VoiceAssistant } from './components/common/VoiceAssistant';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Skeleton } from './components/ui/skeleton';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Error500Page } from './pages/Error500Page';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const CropAdvisoryPage = lazy(() => import('./pages/CropAdvisoryPage').then((m) => ({ default: m.CropAdvisoryPage })));
const DiseaseScannerPage = lazy(() => import('./pages/DiseaseScannerPage').then((m) => ({ default: m.DiseaseScannerPage })));
const SoilHealthPage = lazy(() => import('./pages/SoilHealthPage').then((m) => ({ default: m.SoilHealthPage })));
const WeatherPage = lazy(() => import('./pages/WeatherPage').then((m) => ({ default: m.WeatherPage })));
const FertilizerPage = lazy(() => import('./pages/FertilizerPage').then((m) => ({ default: m.FertilizerPage })));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage').then((m) => ({ default: m.MarketplacePage })));
const ConsultationPage = lazy(() => import('./pages/ConsultationPage').then((m) => ({ default: m.ConsultationPage })));
const SchemesPage = lazy(() => import('./pages/SchemesPage').then((m) => ({ default: m.SchemesPage })));
const FarmDiaryPage = lazy(() => import('./pages/FarmDiaryPage').then((m) => ({ default: m.FarmDiaryPage })));
const FarmerProfilePage = lazy(() => import('./pages/FarmerProfilePage').then((m) => ({ default: m.FarmerProfilePage })));

const PageLoader = () => (
  <div className="max-w-7xl mx-auto px-4 py-16 space-y-4">
    <Skeleton className="h-10 w-72" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const MotionPage = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
    {children}
  </motion.div>
);

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MotionPage><LandingPage /></MotionPage>} />
              <Route path="/login" element={<MotionPage><LoginPage /></MotionPage>} />
              <Route path="/register" element={<MotionPage><RegisterPage /></MotionPage>} />
              <Route path="/forgot-password" element={<MotionPage><ForgotPasswordPage /></MotionPage>} />
              <Route path="/500" element={<MotionPage><Error500Page /></MotionPage>} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <MotionPage><DashboardPage /></MotionPage>
                  </ProtectedRoute>
                }
              />
              <Route path="/farmer-profile" element={<ProtectedRoute roles={['Farmer']}><MotionPage><FarmerProfilePage /></MotionPage></ProtectedRoute>} />
              <Route path="/crop-advisory" element={<ProtectedRoute><MotionPage><CropAdvisoryPage /></MotionPage></ProtectedRoute>} />
              <Route path="/disease-scanner" element={<ProtectedRoute><MotionPage><DiseaseScannerPage /></MotionPage></ProtectedRoute>} />
              <Route path="/soil-health" element={<ProtectedRoute><MotionPage><SoilHealthPage /></MotionPage></ProtectedRoute>} />
              <Route path="/weather" element={<ProtectedRoute><MotionPage><WeatherPage /></MotionPage></ProtectedRoute>} />
              <Route path="/fertilizer" element={<ProtectedRoute><MotionPage><FertilizerPage /></MotionPage></ProtectedRoute>} />
              <Route path="/marketplace" element={<ProtectedRoute><MotionPage><MarketplacePage /></MotionPage></ProtectedRoute>} />
              <Route path="/consultation" element={<ProtectedRoute><MotionPage><ConsultationPage /></MotionPage></ProtectedRoute>} />
              <Route path="/schemes" element={<ProtectedRoute><MotionPage><SchemesPage /></MotionPage></ProtectedRoute>} />
              <Route path="/farm-diary" element={<ProtectedRoute roles={['Farmer']}><MotionPage><FarmDiaryPage /></MotionPage></ProtectedRoute>} />
              <Route path="*" element={<MotionPage><NotFoundPage /></MotionPage>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <VoiceAssistant />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

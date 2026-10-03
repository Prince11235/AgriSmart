import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FarmerDashboard } from '../components/dashboard/FarmerDashboard';
import { ExpertDashboard } from '../components/dashboard/ExpertDashboard';
import { OfficerDashboard } from '../components/dashboard/OfficerDashboard';
import { SellerDashboard } from '../components/dashboard/SellerDashboard';
import { GovernmentAdminDashboard } from '../components/dashboard/GovernmentAdminDashboard';
import { SuperAdminDashboard } from '../components/dashboard/SuperAdminDashboard';

export const DashboardPage = () => {
  const { user } = useAuth();
  const role = user?.role || 'Farmer';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {role === 'Farmer' && <FarmerDashboard />}
      {role === 'Expert' && <ExpertDashboard />}
      {role === 'Agricultural Officer' && <OfficerDashboard />}
      {role === 'Marketplace Seller' && <SellerDashboard />}
      {role === 'Government Admin' && <GovernmentAdminDashboard />}
      {role === 'Super Admin' && <SuperAdminDashboard />}
    </div>
  );
};

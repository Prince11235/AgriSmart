export const getAdminMetrics = async (req, res) => {
  res.json({
    success: true,
    metrics: {
      totalRegisteredUsers: 14250,
      activeFarmers: 11890,
      verifiedExperts: 140,
      marketplaceSellers: 320,
      cropRecommendationsGenerated: 48920,
      diseasesScanned: 29400,
      systemUptime: '99.98%',
      aiModelAccuracy: '96.8%'
    },
    recentLogs: [
      { id: 1, action: 'AI Crop Model Retrained', user: 'SuperAdmin', timestamp: '10 mins ago', status: 'Success' },
      { id: 2, action: 'New Government Subsidy Published', user: 'GovAdmin_Punjab', timestamp: '45 mins ago', status: 'Success' },
      { id: 3, action: 'Pest Outbreak Alert Broadcasted', user: 'AgriOfficer_Ludhiana', timestamp: '2 hours ago', status: 'Broadcasted' }
    ]
  });
};

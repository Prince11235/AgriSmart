export const getSchemes = async (req, res) => {
  const schemes = [
    {
      id: 'sch_1',
      title: 'PM-KISAN Samman Nidhi Scheme',
      department: 'Ministry of Agriculture & Farmers Welfare',
      benefitAmount: '₹6,000 / $75 per year',
      category: 'Subsidy',
      description: 'Direct cash transfer income support of ₹6,000 per year in 3 equal installments to all landholding farmer families.',
      eligibilityCriteria: ['Small & Marginal Farmers', 'Valid Aadhaar & Land Record', 'Bank Account linked with NPCI'],
      officialLink: 'https://pmkisan.gov.in'
    },
    {
      id: 'sch_2',
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      department: 'Department of Agricultural Cooperation',
      benefitAmount: 'Up to 100% Comprehensive Crop Loss Coverage',
      category: 'Insurance',
      description: 'Comprehensive financial risk insurance against crop yield loss caused by natural calamities, droughts, or pest outbreaks.',
      eligibilityCriteria: ['Kharif & Rabi Crop Growers', 'Loanee and Non-Loanee Farmers'],
      officialLink: 'https://pmfby.gov.in'
    },
    {
      id: 'sch_3',
      title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      department: 'Ministry of Agriculture',
      benefitAmount: '50% to 80% Subsidy on Farm Equipment',
      category: 'Equipment',
      description: 'Subsidy for purchasing modern tractors, rotavators, combine harvesters, and solar pump sets.',
      eligibilityCriteria: ['Individual Farmers & SHGs', 'Valid Farmer ID Registration'],
      officialLink: 'https://agrimachinery.nic.in'
    },
    {
      id: 'sch_4',
      title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      department: 'Organic Farming Promotion Board',
      benefitAmount: '₹50,000 per Hectare Assistance over 3 Years',
      category: 'Organic Farming',
      description: 'Financial assistance for bio-fertilizers, vermicompost units, soil sampling, and PGS organic certification.',
      eligibilityCriteria: ['Cluster Farmers adopting Organic Practices'],
      officialLink: 'https://pgsindia-ncof.gov.in'
    }
  ];

  res.json({ success: true, count: schemes.length, data: schemes });
};

export const applyForScheme = async (req, res) => {
  const { schemeId, farmerDetails } = req.body;
  res.status(201).json({
    success: true,
    message: 'Application submitted successfully to Government Portal!',
    applicationNumber: `GOV-APP-${Math.floor(100000 + Math.random() * 900000)}`,
    schemeId,
    status: 'Under Verification by Agricultural Officer'
  });
};

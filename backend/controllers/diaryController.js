export const getDiaryEntries = async (req, res) => {
  const entries = [
    { id: '1', title: 'Seeds Purchase (PR-126 Paddy)', category: 'Expense', amount: 245, date: '2026-07-20', cropName: 'Paddy', notes: 'Purchased 10 kg seeds from AgriSmart store' },
    { id: '2', title: 'DAP Fertilizer Application', category: 'Expense', amount: 180, date: '2026-07-22', cropName: 'Paddy', notes: 'Applied basal dose dose 50kg/acre' },
    { id: '3', title: 'Harvest Sale to Local Grain Market', category: 'Income', amount: 3400, date: '2026-07-15', cropName: 'Wheat', notes: 'Sold 80 quintals at MSP ₹2,275/quintal' },
    { id: '4', title: 'Canal Irrigation Water Fee', category: 'Expense', amount: 65, date: '2026-07-18', cropName: 'Wheat', notes: '3rd watering cycle completed' }
  ];

  res.json({
    success: true,
    totalIncome: 3400,
    totalExpenses: 490,
    netProfit: 2910,
    entries
  });
};

export const addDiaryEntry = async (req, res) => {
  const entry = { id: Date.now().toString(), ...req.body, date: req.body.date || new Date().toISOString().split('T')[0] };
  res.status(201).json({ success: true, message: 'Diary entry saved', entry });
};

export const getExperts = async (req, res) => {
  const experts = [
    {
      id: 'exp_1',
      name: 'Dr. Ramesh Chandra',
      title: 'Senior Plant Pathologist',
      experience: '18 Years',
      rating: 4.9,
      reviewsCount: 142,
      specialization: 'Crop Disease & Fungal Diagnostics',
      fee: '$15 / ₹1200',
      availability: 'Available Today',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      slots: ['10:00 AM', '02:30 PM', '05:00 PM']
    },
    {
      id: 'exp_2',
      name: 'Dr. Sunita Sharma',
      title: 'Soil Health & Organic Farming Specialist',
      experience: '12 Years',
      rating: 4.8,
      reviewsCount: 98,
      specialization: 'NPK Deficiency & Regenerative Agriculture',
      fee: '$12 / ₹1000',
      availability: 'Available Tomorrow',
      image: 'https://images.unsplash.com/photo-1594824813571-2153349aed06?auto=format&fit=crop&w=200&q=80',
      slots: ['11:30 AM', '03:00 PM', '06:30 PM']
    },
    {
      id: 'exp_3',
      name: 'Er. Hardeep Singh',
      title: 'Irrigation & Smart Farming Engineer',
      experience: '15 Years',
      rating: 4.95,
      reviewsCount: 186,
      specialization: 'Drip Irrigation & Automated Moisture Sensors',
      fee: '$18 / ₹1500',
      availability: 'Available Today',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      slots: ['09:00 AM', '01:00 PM', '04:00 PM']
    }
  ];

  res.json({ success: true, count: experts.length, data: experts });
};

export const bookAppointment = async (req, res) => {
  const { expertId, date, slot, type } = req.body;
  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully!',
    appointment: {
      bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      expertId,
      date: date || '2026-07-28',
      slot: slot || '10:00 AM',
      type: type || 'Video Call',
      status: 'Confirmed',
      meetingLink: 'https://meet.agrismart.org/room-expert-consultation-99'
    }
  });
};

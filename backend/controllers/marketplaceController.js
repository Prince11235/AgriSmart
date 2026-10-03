export const getProducts = async (req, res) => {
  const products = [
    {
      id: 'prod_1',
      title: 'Hybrid Paddy Seeds (PR-126 High Yield - 10kg)',
      category: 'Seeds',
      price: 1850,
      unit: 'bag',
      rating: 4.8,
      stock: 450,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80',
      description: 'High-yielding short duration rice seeds resistant to bacterial leaf blight.',
      isOrganic: false
    },
    {
      id: 'prod_2',
      title: 'Organic Neem Oil Bio-Pesticide (1 Litre)',
      category: 'Pesticides',
      price: 450,
      unit: 'bottle',
      rating: 4.9,
      stock: 120,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
      description: '100% Cold pressed natural neem oil for organic pest management.',
      isOrganic: true
    },
    {
      id: 'prod_3',
      title: 'NPK Granular Bio-Fertilizer (50 kg Bag)',
      category: 'Fertilizers',
      price: 1350,
      unit: 'bag',
      rating: 4.7,
      stock: 200,
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80',
      description: 'Enriched organic NPK compound fertilizer with essential trace elements.',
      isOrganic: true
    },
    {
      id: 'prod_4',
      title: 'Smart Soil Moisture & pH Sensor Kit',
      category: 'Equipment',
      price: 2999,
      unit: 'kit',
      rating: 4.95,
      stock: 35,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      description: 'IoT Bluetooth soil probe reading instant moisture, pH, and NPK levels.',
      isOrganic: false
    },
    {
      id: 'prod_5',
      title: 'Premium Organic Wheat (A grade Farm Fresh - per kg)',
      category: 'Fresh Harvest',
      price: 45,
      unit: 'kg',
      rating: 4.85,
      stock: 5000,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80',
      description: 'Freshly harvested Sharbati wheat grains direct from certified organic farms.',
      isOrganic: true
    }
  ];

  const { category, search } = req.query;
  let filtered = products;
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (search) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

  res.json({ success: true, count: filtered.length, data: filtered });
};

export const createOrder = async (req, res) => {
  const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: {
      orderId: `AGRI-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items,
      totalAmount,
      currency: 'INR (₹)',
      shippingAddress,
      paymentMethod: paymentMethod || 'UPI / Net Banking',
      paymentStatus: 'Paid',
      estimatedDelivery: '3-4 Business Days',
      createdAt: new Date()
    }
  });
};

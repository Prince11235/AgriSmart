import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, ShoppingCart, Star, CheckCircle, X } from 'lucide-react';

export const MarketplacePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const categories = ['All', 'Seeds', 'Fertilizers', 'Equipment', 'Pesticides', 'Fresh Harvest'];

  const products = [
    { id: '1', title: 'Hybrid PR-126 Paddy Seeds (10kg)', category: 'Seeds', price: 1850, rating: 4.8, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80', organic: false },
    { id: '2', title: 'Organic Cold-Pressed Neem Oil (1L)', category: 'Pesticides', price: 450, rating: 4.9, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80', organic: true },
    { id: '3', title: 'Bio-Granular NPK Fertilizer (50kg)', category: 'Fertilizers', price: 1350, rating: 4.7, image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=300&q=80', organic: true },
    { id: '4', title: 'Smart Bluetooth Soil Probe Kit', category: 'Equipment', price: 2999, rating: 4.95, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80', organic: false },
    { id: '5', title: 'Farm Fresh Organic Sharbati Wheat (per kg)', category: 'Fresh Harvest', price: 45, rating: 4.85, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80', organic: true },
  ];

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((acc, p) => acc + p.price, 0);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
      setIsCartOpen(false);
      setCheckoutSuccess(false);
    }, 2000);
  };

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Module 8 • E-Commerce Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">AgriSmart Store</h1>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-500/30"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Cart ({cart.length})</span>
          {cart.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === c
                ? 'bg-emerald-600 text-white shadow-md'
                : 'glassmorphism text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((prod) => (
          <div key={prod.id} className="glass-card overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {prod.organic && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white shadow">
                    🌿 100% Organic
                  </span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{prod.category}</span>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mt-0.5 line-clamp-2">{prod.title}</h3>
                <div className="flex items-center space-x-1 text-amber-400 mt-2 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{prod.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">₹{prod.price.toLocaleString('en-IN')}</span>
              <button
                onClick={() => addToCart(prod)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-500" />
                  <span>Your Shopping Cart</span>
                </h3>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-gray-400 py-8">Your cart is currently empty.</p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">{item.title}</h4>
                        <span className="text-xs text-emerald-600 font-semibold">₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
                <div className="flex justify-between font-bold text-sm">
                  <span>Total Amount</span>
                  <span className="text-emerald-600 dark:text-emerald-400">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Proceed to UPI / Net Banking Payment</span>
                </button>

                {checkoutSuccess && (
                  <p className="text-xs text-emerald-600 font-bold text-center animate-bounce">
                    🎉 Payment Successful! Order dispatched.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

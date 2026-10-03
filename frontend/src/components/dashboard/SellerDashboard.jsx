import React, { useState } from 'react';
import { ShoppingBag, DollarSign, Package, TrendingUp, PlusCircle } from 'lucide-react';

export const SellerDashboard = () => {
  const [products, setProducts] = useState([
    { id: '1', title: 'Hybrid Paddy Seeds PR-126', category: 'Seeds', price: '₹1,850', stock: 450, sales: 128 },
    { id: '2', title: 'Organic Neem Oil Pesticide (1L)', category: 'Pesticides', price: '₹450', stock: 120, sales: 84 },
    { id: '3', title: 'Granular Bio NPK Fertilizer (50kg)', category: 'Fertilizers', price: '₹1,350', stock: 200, sales: 210 },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-card bg-gradient-to-r from-amber-600 to-orange-700 text-white p-6 sm:p-8">
        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2 inline-block">Seller & Vendor Hub</span>
        <h1 className="text-3xl font-extrabold">AgriSmart Marketplace Merchant Portal</h1>
        <p className="mt-1 text-amber-100 text-sm">Manage inventory, fulfill farmer seed orders, and track monthly sales revenue.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 border-l-4 border-l-amber-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Sales Revenue</p>
          <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">₹10,35,840</h3>
          <span className="text-[10px] text-emerald-500 font-bold">+24% vs last month</span>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-emerald-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">Completed Orders</p>
          <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">422 Orders</h3>
          <span className="text-[10px] text-gray-400">Average fulfillment time: 1.2 days</span>
        </div>
        <div className="glass-card p-5 border-l-4 border-l-cyan-500">
          <p className="text-xs font-semibold text-gray-500 uppercase">Active Products</p>
          <h3 className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1">18 Items</h3>
          <span className="text-[10px] text-emerald-500 font-bold">100% In Stock</span>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Active Product Inventory</h3>
          <button className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md">
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 uppercase text-[10px]">
                <th className="py-3 px-4">Product Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock Units</th>
                <th className="py-3 px-4">Total Sold</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">{p.title}</td>
                  <td className="py-3 px-4 text-gray-500">{p.category}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">{p.price}</td>
                  <td className="py-3 px-4">{p.stock} units</td>
                  <td className="py-3 px-4 font-bold">{p.sales}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Download } from 'lucide-react';

interface AdminOrdersProps {
  isDarkMode: boolean;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data from Supabase
  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      date: '2025-02-15',
      total: 299.99,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      date: '2025-02-14',
      total: 149.99,
      status: 'Processing',
      items: 1
    },
    // Add more mock orders
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Orders Management</h2>
        <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
          isDarkMode
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-emerald-500 hover:bg-emerald-600'
        } text-white transition-colors`}>
          <Download size={20} />
          <span>Export Orders</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-300'
            } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-left ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{order.items}</td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    order.status === 'Delivered'
                      ? isDarkMode
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-green-100 text-green-600'
                      : isDarkMode
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className={`p-2 rounded-lg ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } transition-colors`}>
                    <Eye size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
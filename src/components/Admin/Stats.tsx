import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, TrendingUp } from 'lucide-react';

interface AdminStatsProps {
  isDarkMode: boolean;
}

const AdminStats: React.FC<AdminStatsProps> = ({ isDarkMode }) => {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, trend: '+12%' },
    { label: 'Total Products', value: '56', icon: Package, trend: '+5%' },
    { label: 'Total Orders', value: '789', icon: ShoppingBag, trend: '+8%' },
    { label: 'Revenue', value: '$12,345', icon: TrendingUp, trend: '+15%' }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-600' : 'bg-white'
                } text-emerald-500`}>
                  <Icon size={24} />
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Add more sections like charts, recent activity, etc. */}
    </div>
  );
};

export default AdminStats;
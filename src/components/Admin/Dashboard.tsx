import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, Settings, BarChart2 } from 'lucide-react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import AdminUsers from './Users';
import AdminProducts from './Products';
import AdminOrders from './Orders';
import AdminSettings from './Settings';
import AdminStats from './Stats';

interface AdminDashboardProps {
  isDarkMode: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isDarkMode }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/shop" replace />;
  }

  const menuItems = [
    { path: 'stats', label: 'Statistics', icon: BarChart2 },
    { path: 'users', label: 'Users', icon: Users },
    { path: 'products', label: 'Products', icon: Package },
    { path: 'orders', label: 'Orders', icon: ShoppingBag },
    { path: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg p-6 sticky top-24 shadow-lg`}>
              <h2 className="text-xl font-semibold mb-6">Admin Dashboard</h2>
              
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        location.pathname.includes(item.path)
                          ? isDarkMode
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-500 text-white'
                          : isDarkMode
                          ? 'hover:bg-gray-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="stats" replace />} />
              <Route path="stats" element={<AdminStats isDarkMode={isDarkMode} />} />
              <Route path="users" element={<AdminUsers isDarkMode={isDarkMode} />} />
              <Route path="products" element={<AdminProducts isDarkMode={isDarkMode} />} />
              <Route path="orders" element={<AdminOrders isDarkMode={isDarkMode} />} />
              <Route path="settings" element={<AdminSettings isDarkMode={isDarkMode} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
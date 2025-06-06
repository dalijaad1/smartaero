import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, MapPin, CreditCard, Settings, LogOut, User, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import Orders from './Orders';
import Tracking from './Tracking';
import Addresses from './Addresses';
import PaymentMethods from './PaymentMethods';
import AccountSettings from './AccountSettings';
import Profile from './Profile';

interface UserDashboardProps {
  isDarkMode: boolean;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ isDarkMode }) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Redirect to sign in if not authenticated
  if (!user) {
    return <Navigate to="/shop" replace />;
  }

  const menuItems = [
    { path: '/shop/dashboard/profile', label: 'Profile', icon: User },
    { path: '/shop/dashboard/orders', label: 'Orders', icon: Package },
    { path: '/shop/dashboard/tracking', label: 'Order Tracking', icon: Clock },
    { path: '/shop/dashboard/addresses', label: 'Addresses', icon: MapPin },
    { path: '/shop/dashboard/payment', label: 'Payment Methods', icon: CreditCard },
    { path: '/shop/dashboard/settings', label: 'Account Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/shop';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-4 rounded-full shadow-lg ${
            isDarkMode
              ? 'bg-gray-800 text-white'
              : 'bg-white text-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingBag size={24} />
        </motion.button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <AnimatePresence>
            <motion.div 
              className={`md:w-64 ${
                isMenuOpen ? 'fixed inset-0 z-40 md:relative' : 'hidden md:block'
              }`}
              initial={false}
              animate={{ opacity: isMenuOpen ? 1 : 1 }}
            >
              <div className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg p-6 sticky top-24 shadow-lg`}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-semibold">Dashboard</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="md:hidden"
                  >
                    ×
                  </button>
                </div>
                
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
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
                  
                  <button
                    onClick={handleSignOut}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full ${
                      isDarkMode
                        ? 'text-red-400 hover:bg-gray-700'
                        : 'text-red-500 hover:bg-gray-100'
                    }`}
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/shop/dashboard/profile" replace />} />
              <Route path="/profile" element={<Profile isDarkMode={isDarkMode} />} />
              <Route path="/orders" element={<Orders isDarkMode={isDarkMode} />} />
              <Route path="/tracking" element={<Tracking isDarkMode={isDarkMode} />} />
              <Route path="/addresses" element={<Addresses isDarkMode={isDarkMode} />} />
              <Route path="/payment" element={<PaymentMethods isDarkMode={isDarkMode} />} />
              <Route path="/settings" element={<AccountSettings isDarkMode={isDarkMode} />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useAdminStore } from '@/store/adminStore';
import Orders from './admin/Orders';
import Customers from './admin/Customers';
import Products from './admin/Products';
import Settings from './admin/Settings';
import Overview from './admin/Overview';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is admin
  useEffect(() => {
    if (!user || user.email !== 'mohamedali.jaadari@gmail.com') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50/20 dark:from-secondary-900 dark:via-secondary-900 dark:to-primary-900/10">
      <div className="container py-8">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
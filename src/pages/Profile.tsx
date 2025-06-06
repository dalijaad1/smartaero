import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { useNavigate, Navigate } from 'react-router-dom';
import { Bell, CreditCard, Lock, User, Settings, Package, LogOut } from 'lucide-react';

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings' | 'notifications'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    address: user?.user_metadata?.address || '',
    phone: user?.user_metadata?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) {
    return <Navigate to="/signin" />;
  }

  // Function to truncate text with ellipsis
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Get display name and email
  const displayName = truncateText(formData.name || 'User', 15);
  const displayEmail = truncateText(user.email || '', 20);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.email,
        data: {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
        },
      });

      if (error) throw error;

      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email!, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) throw error;
      setMessage('Password reset email sent!');
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package, count: 2 },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentOrders = [
    {
      id: 'ORD-2024001',
      date: '2024-02-20',
      total: 349.98,
      status: 'Delivered',
      items: [
        { name: 'SmartAero Tower', quantity: 1, price: 299.99 },
        { name: 'Soil Moisture Sensor Kit', quantity: 1, price: 49.99 }
      ]
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Order Delivered',
      message: 'Your order #ORD-2024001 has been delivered',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'Price Drop Alert',
      message: 'SmartAero Tower is now on sale!',
      time: '1 day ago',
      unread: true
    },
    {
      id: 3,
      title: 'New Feature Available',
      message: 'Check out our new soil analysis feature',
      time: '3 days ago',
      unread: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50/20 dark:from-secondary-900 dark:via-secondary-900 dark:to-primary-900/10 py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-64 space-y-4"
          >
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <div className="flex items-start gap-4 mb-8">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    {formData.name ? formData.name[0].toUpperCase() : '👤'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors">
                    <span className="text-xs">✏️</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-base truncate" title={formData.name || 'User'}>
                    {displayName}
                  </h2>
                  <span className="text-sm text-secondary-600 dark:text-secondary-400 block truncate" title={user.email}>
                    {displayEmail}
                  </span>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                          : 'hover:bg-primary-50 dark:hover:bg-primary-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      {tab.count && (
                        <span className={`px-2.5 py-0.5 rounded-full text-sm ${
                          activeTab === tab.id
                            ? 'bg-white/20'
                            : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleResetPassword}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <Lock className="w-5 h-5 text-primary-600" />
                  <span>Change Password</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  <span>Manage Payment Methods</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => useAuthStore.getState().signOut()}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
              >
                {activeTab === 'profile' && (
                  <>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                        Personal Information
                      </h2>
                      {!isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 rounded-lg font-medium hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors"
                        >
                          Edit Profile
                        </motion.button>
                      )}
                    </div>

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg mb-6 ${
                          message.includes('error')
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-600'
                            : 'bg-green-100 dark:bg-green-900/20 text-green-600'
                        }`}
                      >
                        {message}
                      </motion.div>
                    )}

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="name">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 disabled:opacity-60 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 disabled:opacity-60 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="phone">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 disabled:opacity-60 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="address">
                            Shipping Address
                          </label>
                          <textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            disabled={!isEditing}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 disabled:opacity-60 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your shipping address"
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-4 pt-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-medium shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-300 disabled:opacity-60"
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                                <span>Saving...</span>
                              </div>
                            ) : (
                              'Save Changes'
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 bg-secondary-100 dark:bg-secondary-800 rounded-xl font-medium hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      )}
                    </form>
                  </>
                )}

                {activeTab === 'orders' && (
                  <>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-8">
                      Order History
                    </h2>
                    
                    {recentOrders.length > 0 ? (
                      <div className="space-y-6">
                        {recentOrders.map((order) => (
                          <motion.div
                            key={order.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border border-secondary-200 dark:border-secondary-700 rounded-xl overflow-hidden"
                          >
                            <div className="bg-secondary-50 dark:bg-secondary-900 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                              <div>
                                <span className="text-sm text-secondary-600 dark:text-secondary-400">Order ID</span>
                                <p className="font-medium">{order.id}</p>
                              </div>
                              <div>
                                <span className="text-sm text-secondary-600 dark:text-secondary-400">Date</span>
                                <p className="font-medium">{order.date}</p>
                              </div>
                              <div>
                                <span className="text-sm text-secondary-600 dark:text-secondary-400">Total</span>
                                <p className="font-medium">${order.total}</p>
                              </div>
                              <div>
                                <span className="text-sm text-secondary-600 dark:text-secondary-400">Status</span>
                                <p className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-sm font-medium">
                                  {order.status}
                                </p>
                              </div>
                            </div>
                            <div className="p-6">
                              <h3 className="font-medium mb-4">Order Items</h3>
                              <div className="space-y-3">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                      <span className="text-primary-600">×{item.quantity}</span>
                                      <span>{item.name}</span>
                                    </div>
                                    <span className="font-medium">${item.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-secondary-50 dark:bg-secondary-900 rounded-xl p-8 text-center">
                        <p className="text-secondary-600 dark:text-secondary-400">
                          No orders found.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'notifications' && (
                  <>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                        Notifications
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 rounded-lg font-medium hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors"
                      >
                        Mark All as Read
                      </motion.button>
                    </div>

                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`p-4 rounded-xl ${
                            notification.unread
                              ? 'bg-primary-50 dark:bg-primary-900/10'
                              : 'bg-white dark:bg-secondary-900'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-sm text-secondary-600 dark:text-secondary-400">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-secondary-600 dark:text-secondary-400">
                            {notification.message}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'settings' && (
                  <>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-8">
                      Account Settings
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-secondary-50 dark:bg-secondary-900 rounded-xl p-6">
                        <h3 className="font-medium mb-4">Password & Security</h3>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleResetPassword}
                          className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-300"
                        >
                          Reset Password
                        </motion.button>
                      </div>

                      <div className="bg-secondary-50 dark:bg-secondary-900 rounded-xl p-6">
                        <h3 className="font-medium mb-4">Email Preferences</h3>
                        <div className="space-y-4">
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span>Receive order updates</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span>Receive newsletter</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span>Receive price alerts</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-secondary-50 dark:bg-secondary-900 rounded-xl p-6">
                        <h3 className="font-medium mb-4">Delete Account</h3>
                        <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 transition-all duration-300"
                        >
                          Delete Account
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
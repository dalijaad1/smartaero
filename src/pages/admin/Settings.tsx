import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Mail, CreditCard, Bell, Shield, User, Key } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    general: {
      companyName: 'SmartAero',
      timezone: 'UTC+1',
      currency: 'USD',
      language: 'en'
    },
    email: {
      fromName: 'SmartAero',
      fromEmail: 'noreply@smartaero.tech',
      smtpHost: 'smtp.resend.com',
      smtpPort: '587',
      smtpUser: 'resend',
      smtpPass: '********'
    },
    payment: {
      stripePublicKey: 'pk_test_***',
      stripeSecretKey: 'sk_test_***',
      paypalClientId: 'client_id_***',
      paypalSecret: 'client_secret_***'
    },
    notifications: {
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      lowStock: true,
      newCustomer: true
    }
  });

  const handleSave = (section: string) => {
    // Here you would typically save to your backend
    console.log('Saving', section, formData[section as keyof typeof formData]);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'users', label: 'Users', icon: User },
    { id: 'api', label: 'API Keys', icon: Key }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      {/* Settings Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-lg">
        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold mb-6">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.general.companyName}
                    onChange={(e) => setFormData({
                      ...formData,
                      general: { ...formData.general, companyName: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timezone
                  </label>
                  <select
                    value={formData.general.timezone}
                    onChange={(e) => setFormData({
                      ...formData,
                      general: { ...formData.general, timezone: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="UTC+1">UTC+1</option>
                    <option value="UTC+2">UTC+2</option>
                    <option value="UTC+3">UTC+3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.general.currency}
                    onChange={(e) => setFormData({
                      ...formData,
                      general: { ...formData.general, currency: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Language
                  </label>
                  <select
                    value={formData.general.language}
                    onChange={(e) => setFormData({
                      ...formData,
                      general: { ...formData.general, language: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSave('general')}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
              <div className="space-y-4">
                {Object.entries(formData.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: {
                            ...formData.notifications,
                            [key]: e.target.checked
                          }
                        })}
                        className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSave('notifications')}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Add more tab content here */}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Settings;
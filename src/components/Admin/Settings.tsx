import React from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

interface AdminSettingsProps {
  isDarkMode: boolean;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>

      <div className="space-y-8">
        {/* Site Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Site Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input
                type="text"
                defaultValue="SmartAero"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Site Description</label>
              <textarea
                rows={3}
                defaultValue="Smart agriculture and home automation solutions"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Email Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Support Email</label>
              <input
                type="email"
                defaultValue="support@smartaero.com"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Order Notification Email</label>
              <input
                type="email"
                defaultValue="orders@smartaero.com"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Payment Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                defaultValue="USD"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
              <input
                type="number"
                defaultValue="15"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
            isDarkMode
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-emerald-500 hover:bg-emerald-600'
          } text-white transition-colors`}
        >
          <Save size={20} />
          <span>Save Settings</span>
        </motion.button>
      </div>
    </div>
  );
};

export default AdminSettings;
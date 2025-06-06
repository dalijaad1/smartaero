import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Thermometer, Droplet, Bell, Settings, AlertTriangle, CheckCircle2, LineChart, RefreshCw } from 'lucide-react';

interface IoTDashboardProps {
  isDarkMode: boolean;
}

interface SensorData {
  temperature: number;
  ph: number;
  timestamp: string;
}

interface UserSettings {
  tempMin: number;
  tempMax: number;
  phMin: number;
  phMax: number;
}

const IoTDashboard: React.FC<IoTDashboardProps> = ({ isDarkMode }) => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [settings, setSettings] = useState<UserSettings>({
    tempMin: 20,
    tempMax: 30,
    phMin: 6.0,
    phMax: 7.0
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        temperature: 20 + Math.random() * 15,
        ph: 6 + Math.random() * 2,
        timestamp: new Date().toISOString()
      };
      
      setCurrentData(newData);
      setSensorData(prev => [...prev.slice(-20), newData]);
      
      // Check for alerts
      const newAlerts = [];
      if (newData.temperature < settings.tempMin) {
        newAlerts.push(`Temperature too low: ${newData.temperature.toFixed(1)}°C`);
      }
      if (newData.temperature > settings.tempMax) {
        newAlerts.push(`Temperature too high: ${newData.temperature.toFixed(1)}°C`);
      }
      if (newData.ph < settings.phMin) {
        newAlerts.push(`pH too low: ${newData.ph.toFixed(1)}`);
      }
      if (newData.ph > settings.phMax) {
        newAlerts.push(`pH too high: ${newData.ph.toFixed(1)}`);
      }
      
      setAlerts(newAlerts);
    }, 3000);

    return () => clearInterval(interval);
  }, [settings]);

  const handleSettingsUpdate = (newSettings: UserSettings) => {
    setSettings(newSettings);
    setIsSettingsOpen(false);
    // Here you would typically save to Supabase
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">SmartAero Dashboard</h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
            } transition-colors`}
          >
            <Settings size={24} />
          </button>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center space-x-2 p-4 rounded-lg mb-2 ${
                    isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
                  }`}
                >
                  <AlertTriangle size={20} />
                  <span>{alert}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Readings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentData && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg p-6 shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-lg bg-blue-500/20 text-blue-500">
                      <Thermometer size={24} />
                    </div>
                    <h3 className="text-xl font-semibold">Temperature</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-blue-500"
                  >
                    <RefreshCw size={20} />
                  </motion.div>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold">
                    {currentData.temperature.toFixed(1)}
                  </span>
                  <span className="text-2xl">°C</span>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <span>Min: {settings.tempMin}°C</span>
                  <span>Max: {settings.tempMax}°C</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg p-6 shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-500">
                      <Droplet size={24} />
                    </div>
                    <h3 className="text-xl font-semibold">pH Level</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-emerald-500"
                  >
                    <RefreshCw size={20} />
                  </motion.div>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold">
                    {currentData.ph.toFixed(1)}
                  </span>
                  <span className="text-2xl">pH</span>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <span>Min: {settings.phMin}</span>
                  <span>Max: {settings.phMax}</span>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Historical Data */}
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg p-6 shadow-lg mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Historical Data</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Temperature</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm">pH</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 relative">
            {/* Simple line chart visualization */}
            <div className="absolute inset-0 flex items-end">
              {sensorData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col justify-end space-y-1"
                  style={{ height: '100%' }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.temperature / 40) * 100}%` }}
                    className="bg-blue-500/20 rounded-t"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.ph / 14) * 100}%` }}
                    className="bg-emerald-500/20 rounded-t"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {isSettingsOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsSettingsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`relative w-full max-w-md rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } p-6 shadow-xl`}
              >
                <h3 className="text-xl font-semibold mb-6">System Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Temperature Range (°C)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        value={settings.tempMin}
                        onChange={(e) => setSettings({
                          ...settings,
                          tempMin: Number(e.target.value)
                        })}
                        className={`w-full px-3 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-gray-50 border-gray-300'
                        } border`}
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={settings.tempMax}
                        onChange={(e) => setSettings({
                          ...settings,
                          tempMax: Number(e.target.value)
                        })}
                        className={`w-full px-3 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-gray-50 border-gray-300'
                        } border`}
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      pH Range
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        value={settings.phMin}
                        onChange={(e) => setSettings({
                          ...settings,
                          phMin: Number(e.target.value)
                        })}
                        className={`w-full px-3 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-gray-50 border-gray-300'
                        } border`}
                        placeholder="Min"
                        step="0.1"
                      />
                      <input
                        type="number"
                        value={settings.phMax}
                        onChange={(e) => setSettings({
                          ...settings,
                          phMax: Number(e.target.value)
                        })}
                        className={`w-full px-3 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-gray-50 border-gray-300'
                        } border`}
                        placeholder="Max"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-200 hover:bg-gray-300'
                    } transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSettingsUpdate(settings)}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IoTDashboard;
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle } from 'lucide-react';

interface TrackingProps {
  isDarkMode: boolean;
}

const Tracking: React.FC<TrackingProps> = ({ isDarkMode }) => {
  // Mock tracking data
  const trackingSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been confirmed and is being processed',
      date: '2025-02-15 09:00 AM',
      completed: true
    },
    {
      id: 2,
      title: 'Shipped',
      description: 'Your order has been shipped via Express Delivery',
      date: '2025-02-16 02:30 PM',
      completed: true
    },
    {
      id: 3,
      title: 'Out for Delivery',
      description: 'Package is out for delivery in your area',
      date: '2025-02-17 10:15 AM',
      completed: false
    },
    {
      id: 4,
      title: 'Delivered',
      description: 'Package will be delivered to your address',
      date: 'Estimated: 2025-02-17',
      completed: false
    }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <h2 className="text-2xl font-semibold mb-6">Order Tracking</h2>
      
      <div className="mb-8">
        <div className={`${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        } rounded-lg p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Order #ORD-001</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Estimated Delivery: Feb 17, 2025
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="text-emerald-500" size={20} />
              <span>In Transit</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        {trackingSteps.map((step, index) => (
          <div key={step.id} className="relative">
            {index < trackingSteps.length - 1 && (
              <div 
                className={`absolute left-[15px] top-[40px] w-0.5 h-[calc(100%-40px)] ${
                  step.completed ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            )}
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 mb-8"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.completed
                  ? 'bg-emerald-500'
                  : isDarkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-200'
              }`}>
                {step.completed ? (
                  <CheckCircle size={20} className="text-white" />
                ) : (
                  <Package size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                )}
              </div>
              
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {step.description}
                </p>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {step.date}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
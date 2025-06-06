import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CreditCard, Trash2 } from 'lucide-react';

interface PaymentMethodsProps {
  isDarkMode: boolean;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ isDarkMode }) => {
  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      default: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/24',
      default: false
    }
  ]);

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Payment Methods</h2>
        <button
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            isDarkMode
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-emerald-500 hover:bg-emerald-600'
          } text-white transition-colors`}
        >
          <Plus size={20} />
          <span>Add New Card</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            } rounded-lg p-6 relative`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="text-emerald-500" size={20} />
                <h3 className="font-semibold">{method.type} •••• {method.last4}</h3>
              </div>
              {method.default && (
                <span className={`text-sm px-2 py-1 rounded ${
                  isDarkMode ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  Default
                </span>
              )}
            </div>
            
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Expires {method.expiry}
            </p>
            
            <div className="mt-6 flex space-x-4">
              {!method.default && (
                <>
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-600 hover:bg-gray-500'
                        : 'bg-gray-200 hover:bg-gray-300'
                    } transition-colors`}
                  >
                    Set as Default
                  </button>
                  
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      isDarkMode
                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    } transition-colors`}
                  >
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
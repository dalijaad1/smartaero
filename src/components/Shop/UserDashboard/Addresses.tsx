import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';

interface AddressesProps {
  isDarkMode: boolean;
}

const Addresses: React.FC<AddressesProps> = ({ isDarkMode }) => {
  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      default: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      default: false
    }
  ]);

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Addresses</h2>
        <button
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            isDarkMode
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-emerald-500 hover:bg-emerald-600'
          } text-white transition-colors`}
        >
          <Plus size={20} />
          <span>Add New Address</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            } rounded-lg p-6 relative`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="text-emerald-500" size={20} />
                <h3 className="font-semibold">{address.type}</h3>
              </div>
              {address.default && (
                <span className={`text-sm px-2 py-1 rounded ${
                  isDarkMode ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  Default
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <p>{address.name}</p>
              <p>{address.street}</p>
              <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
              <p>{address.country}</p>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  isDarkMode
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors`}
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
              
              {!address.default && (
                <button
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                    isDarkMode
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  } transition-colors`}
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
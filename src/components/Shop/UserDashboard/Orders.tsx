import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';

interface OrdersProps {
  isDarkMode: boolean;
}

const Orders: React.FC<OrdersProps> = ({ isDarkMode }) => {
  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2025-02-15',
      total: 299.99,
      status: 'delivered',
      items: [
        { name: 'Smart Tower', quantity: 1, price: 299.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2025-02-10',
      total: 14.99,
      status: 'processing',
      items: [
        { name: 'Web Dashboard Subscription', quantity: 1, price: 14.99 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'processing':
        return <Truck className="text-blue-500" size={20} />;
      case 'cancelled':
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            } rounded-lg p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-emerald-500 hover:bg-emerald-600'
                } text-white transition-colors`}
              >
                Track Order
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-600 hover:bg-gray-700'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors`}
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
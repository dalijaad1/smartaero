import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Plus, Search, Image } from 'lucide-react';
import { products } from '../../constants/data';

interface AdminProductsProps {
  isDarkMode: boolean;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Products Management</h2>
        <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
          isDarkMode
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-emerald-500 hover:bg-emerald-600'
        } text-white transition-colors`}>
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-300'
            } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-left ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <Image size={20} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    isDarkMode
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    {product.rating.toFixed(1)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className={`p-2 rounded-lg ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    } transition-colors`}>
                      <Edit2 size={16} />
                    </button>
                    <button className={`p-2 rounded-lg ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    } transition-colors text-red-500`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
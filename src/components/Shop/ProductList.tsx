import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { products } from '../../constants/data';

interface ProductListProps {
  isDarkMode: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ isDarkMode }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { filters, setFilters, resetFilters } = useShopStore();

  // Filter out products without a category before creating the categories array
  const categories = ['all', ...new Set(products.filter(p => p.category).map(p => p.category))];

  const filteredProducts = products.filter(product => {
    if (!product.category) return false; // Skip products without a category
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Shop SmartAero</h1>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ searchQuery: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilters({ category })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.category === category
                  ? isDarkMode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
            >
              <Link to={`/shop/product/${product.id}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFilterOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 ${isFilterOpen ? '' : 'pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
        
        <div className={`absolute right-0 top-0 bottom-0 w-full md:w-96 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        } p-6 shadow-xl`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Price Range</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300'
                  } border`}
                  placeholder="Min"
                />
                <span>to</span>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300'
                  } border`}
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Sort By</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ sortBy: e.target.value as any })}
                className={`w-full px-3 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                } border`}
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className={`w-full py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductList;
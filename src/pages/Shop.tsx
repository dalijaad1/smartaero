import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Combobox, Transition } from '@headlessui/react';
import { useCartStore } from '@/store/cartStore';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
}

const products: Product[] = [
  {
    id: 'tower',
    name: 'SmartAero Tower',
    price: 299.99,
    rating: 4.8,
    image: 'SmartAero Tower.png',
    category: 'Main Product',
    description: 'Temp, Humidity, Soil Moisture, Water Level, pH; Solar-Powered; App-Connected'
  },
  {
    id: 'soil-kit',
    name: 'Soil Moisture Sensor Kit',
    price: 49.99,
    rating: 4.6,
    image: 'Soil Moisture Sensor Kit.jpg',
    category: 'IoT Devices',
    description: 'High Accuracy, Long-term Stability, Easy Installation'
  },
  {
    id: 'irrigation',
    name: 'Smart Irrigation Controller',
    price: 149.99,
    rating: 4.7,
    image: 'Smart Irrigation Controller.jpg',
    category: 'IoT Devices',
    description: 'Automated Scheduling, Weather Adaptation, Water Usage Analytics'
  },
  {
    id: 'ph-meter',
    name: 'pH Meter Kit PHO-14',
    price: 79.99,
    rating: 4.5,
    image: 'pH Meter Kit PHO-14.jpg',
    category: 'IoT Devices',
    description: 'Digital Display, Auto Temp Compensation, Quick Readings'
  },
  {
    id: 'temp-sensor',
    name: 'Waterproof Temperature Sensor',
    price: 199.99,
    rating: 4.8,
    image: 'temp.jpg',
    category: 'IoT Devices',
    description: 'Waterproof, High Precision, Long Range Wireless'
  },
  {
    id: 'esp32-kit',
    name: 'SmartAero ESP32 IoT Kit',
    price: 89.99,
    rating: 4.6,
    image: 'ESP32.jpg',
    category: 'IoT Devices',
    description: 'Pre-programmed, Ready to Deploy, Extended Range'
  },
  {
    id: 'cable-kit',
    name: 'Sensor Cable Kit',
    price: 29.99,
    rating: 4.7,
    image: 'cable.png',
    category: 'Accessories',
    description: 'Weather-resistant, Multiple Lengths, Quick Connect'
  },
  {
    id: 'solar-kit',
    name: 'Solar Power Kit',
    price: 159.99,
    rating: 4.8,
    image: 'solar.jpg',
    category: 'Power Kits',
    description: 'High Efficiency Panel, Battery Backup, Charge Controller'
  }
];

const categories = ['All', 'Main Product', 'IoT Devices', 'Accessories', 'Power Kits'];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const addToCart = useCartStore((state) => state.addItem);

  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 20 },
  });

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);

    if (searchQuery) {
      const newSuggestions = products
        .map(p => p.name)
        .filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()));
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [selectedCategory, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      {/* Hero Section */}
      <animated.section 
        style={heroSpring}
        className="relative py-20 bg-gradient-to-b from-primary-50 to-white dark:from-secondary-800 dark:to-secondary-900"
      >
        <div className="container">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
            >
              Shop Smart, Farm Smarter 🌱
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto"
            >
              Discover our cutting-edge IoT solutions for modern agriculture
            </motion.p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <Combobox value={searchQuery} onChange={setSearchQuery}>
              <div className="relative">
                <div className="relative w-full">
                  <Combobox.Input
                    className="w-full px-6 py-4 rounded-full bg-white dark:bg-secondary-800 shadow-lg focus:ring-2 focus:ring-primary-500 border-none"
                    placeholder="🔍 Search products..."
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Combobox.Options className="absolute mt-2 w-full rounded-lg bg-white dark:bg-secondary-800 shadow-lg py-2 z-50">
                    {suggestions.map((suggestion) => (
                      <Combobox.Option
                        key={suggestion}
                        value={suggestion}
                        className={({ active }) =>
                          `px-4 py-2 cursor-pointer ${
                            active ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : ''
                          }`
                        }
                      >
                        {suggestion}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 relative group ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-primary-600 rounded-full -z-10"
                  />
                )}
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </animated.section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                  className="group relative bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {product.category}
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm text-secondary-600 dark:text-secondary-400">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          ${product.price}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
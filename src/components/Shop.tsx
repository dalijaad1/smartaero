import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../constants/data';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const Shop: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0).toFixed(2);
  };
  
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
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
        duration: 0.5
      }
    }
  };
  
  const cartVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <section 
      id="shop" 
      className={`py-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4" 
            variants={itemVariants}
          >
            Shop <span className="text-emerald-500">SmartAero</span>
          </motion.h2>
          
          <motion.div className="w-20 h-1 bg-emerald-500 mx-auto mb-8" variants={itemVariants}></motion.div>
          
          <motion.p 
            className="text-base md:text-lg" 
            variants={itemVariants}
          >
            Browse our selection of smart devices and software solutions to transform your 
            home and agricultural spaces.
          </motion.p>
        </motion.div>
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div 
            className="fixed bottom-8 right-8 z-40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="p-4 bg-emerald-500 rounded-full shadow-lg text-white relative"
            >
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-semibold">
                  {getCartCount()}
                </span>
              )}
            </button>
          </motion.div>
          
          <AnimatePresence>
            {cartOpen && (
              <motion.div 
                className={`fixed top-0 right-0 bottom-0 w-full md:w-96 z-50 shadow-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } p-6 overflow-auto`}
                variants={cartVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Your Cart</h3>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className={`p-2 rounded-full ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    ✕
                  </button>
                </div>
                
                {cart.length === 0 ? (
                  <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-8">
                      {cart.map(item => {
                        const product = products.find(p => p.id === item.id);
                        if (!product) return null;
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`p-4 rounded-lg ${
                              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                            } flex items-center`}
                          >
                            <div className="w-16 h-16 rounded overflow-hidden mr-4">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{product.name}</h4>
                              <p className="text-sm">${product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center">
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 rounded-full hover:bg-gray-200"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button 
                                onClick={() => addToCart(item.id)}
                                className="p-1 rounded-full hover:bg-gray-200"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className={`p-4 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    } mb-6`}
                    >
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${getCartTotal()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${getCartTotal()}</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-300">
                      Checkout
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.5
                  }
                }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-lg`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {product.description.substring(0, 100)}...
                  </p>
                  <ul className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {product.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start mb-1">
                        <span className="text-emerald-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <motion.button 
                      onClick={() => addToCart(product.id)}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300 flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
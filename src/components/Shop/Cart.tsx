import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronLeft } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { products } from '../../constants/data';

interface CartProps {
  isDarkMode: boolean;
}

const Cart: React.FC<CartProps> = ({ isDarkMode }) => {
  const { items, updateQuantity, removeItem } = useCartStore();
  
  const cartItems = items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  }));

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = 10;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                isDarkMode
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-emerald-500 hover:bg-emerald-600'
              } text-white transition-colors`}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/shop"
          className={`inline-flex items-center space-x-2 mb-8 ${
            isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ChevronLeft size={20} />
          <span>Continue Shopping</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
            
            <div className="space-y-4">
              {cartItems.map(({ product, quantity }) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-lg p-4 flex items-center gap-4`}
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
                      className={`p-1 rounded-full ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className={`p-1 rounded-full ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(product.id)}
                      className={`mt-2 p-1 rounded-full text-red-500 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg p-6 sticky top-24`}>
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (15%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link
                to="/shop/checkout"
                className={`mt-6 w-full py-3 px-6 rounded-lg font-medium text-center ${
                  isDarkMode
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-emerald-500 hover:bg-emerald-600'
                } text-white transition-colors block`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
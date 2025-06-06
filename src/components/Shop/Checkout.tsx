import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { products } from '../../constants/data';

interface CheckoutProps {
  isDarkMode: boolean;
}

const Checkout: React.FC<CheckoutProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here we would typically:
      // 1. Process payment
      // 2. Create order in database
      // 3. Send confirmation email
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      clearCart();
      navigate('/shop/dashboard/orders');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg p-6`}>
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                  </div>
                </div>

                <div className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg p-6`}>
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/YY"
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVC</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        required
                        placeholder="123"
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-300'
                        } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-medium ${
                    isDarkMode
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  } text-white transition-colors ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </motion.button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg p-6 sticky top-24`}>
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Qty: {quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${(product.price * quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="space-y-2">
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
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { CreditCard, Truck, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface CheckoutStep {
  title: string;
  description: string;
}

const steps: CheckoutStep[] = [
  {
    title: 'Shipping',
    description: 'Enter your shipping details'
  },
  {
    title: 'Payment',
    description: 'Complete your payment'
  },
  {
    title: 'Confirmation',
    description: 'Review your order'
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: ''
    }
  });
  
  const { items, total, clearCart } = useCartStore();

  const handleInputChange = (section: 'shipping' | 'payment', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Here you would typically:
      // 1. Process the payment
      // 2. Create the order in your database
      // 3. Send confirmation email
      // For now, we'll just simulate success
      clearCart();
      setCurrentStep(steps.length - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      const { firstName, lastName, email, phone, address, city, state, zipCode, country } = formData.shipping;
      return firstName && lastName && email && phone && address && city && state && zipCode && country;
    }
    if (currentStep === 1) {
      const { cardNumber, cardName, expiry, cvv } = formData.payment;
      return cardNumber && cardName && expiry && cvv;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-white dark:from-secondary-800 dark:to-secondary-900 py-12">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </motion.button>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex-1 relative ${
                  index < steps.length - 1 ? 'after:content-[""] after:absolute after:top-5 after:left-1/2 after:w-full after:h-0.5 after:bg-secondary-200 dark:after:bg-secondary-700' : ''
                }`}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: index <= currentStep ? 'rgb(5, 150, 105)' : 'transparent',
                      borderColor: index <= currentStep ? 'rgb(5, 150, 105)' : 'rgb(226, 232, 240)',
                      scale: index === currentStep ? 1.1 : 1
                    }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white dark:bg-secondary-800"
                  >
                    {index <= currentStep ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-secondary-400">{index + 1}</span>
                    )}
                  </motion.div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-secondary-500 dark:text-secondary-400">
                      {step.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.shipping.firstName}
                        onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.shipping.lastName}
                        onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.shipping.email}
                        onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.shipping.phone}
                        onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={formData.shipping.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="city">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={formData.shipping.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="state">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={formData.shipping.state}
                        onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="zipCode">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        value={formData.shipping.zipCode}
                        onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="country">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        value={formData.shipping.country}
                        onChange={(e) => handleInputChange('shipping', 'country', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="cardNumber">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={formData.payment.cardNumber}
                        onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="cardName">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        value={formData.payment.cardName}
                        onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="expiry">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                          value={formData.payment.expiry}
                          onChange={(e) => handleInputChange('payment', 'expiry', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="cvv">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={formData.payment.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
                      <h3 className="font-medium mb-4">Shipping Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="block text-secondary-500 dark:text-secondary-400">Name</span>
                          <span>{formData.shipping.firstName} {formData.shipping.lastName}</span>
                        </div>
                        <div>
                          <span className="block text-secondary-500 dark:text-secondary-400">Email</span>
                          <span>{formData.shipping.email}</span>
                        </div>
                        <div>
                          <span className="block text-secondary-500 dark:text-secondary-400">Phone</span>
                          <span>{formData.shipping.phone}</span>
                        </div>
                        <div>
                          <span className="block text-secondary-500 dark:text-secondary-400">Address</span>
                          <span>{formData.shipping.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Order Items</h3>
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-secondary-500 dark:text-secondary-400">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                      <div className="flex justify-between items-center text-lg font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {currentStep > 0 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-3 rounded-xl bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Back
                </motion.button>
              )}
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!isStepValid()}
                className="ml-auto px-6 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Place Order
                    <CheckCircle size={20} />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight size={20} />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
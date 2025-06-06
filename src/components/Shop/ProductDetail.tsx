import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  ChevronLeft,
  Check,
  Info,
  Truck,
  Shield,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { products } from '../../constants/data';

interface ProductDetailProps {
  isDarkMode: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const product = products.find(p => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 text-center`}>
          <div className="flex items-center justify-center mb-4 text-red-500">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/shop"
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg ${
              isDarkMode
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-emerald-500 hover:bg-emerald-600'
            } text-white transition-colors`}
          >
            <ChevronLeft size={20} />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) {
      setError('Maximum quantity is 10 items');
      return;
    }
    setError(null);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/shop/auth');
      return;
    }

    try {
      // Add the product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addItem(product.id);
      }

      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Success Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-24 right-4 z-50 p-4 rounded-lg ${
                isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500'
              } text-white flex items-center space-x-2`}
            >
              <Check size={20} />
              <span>Added to cart successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Toast */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-4 z-50 p-4 rounded-lg bg-red-500 text-white flex items-center space-x-2"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/shop"
            className={`inline-flex items-center space-x-2 ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Back to Shop</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-2xl overflow-hidden bg-gray-100"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-8">
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              } mb-4`}>
                {product.category}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={index < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                      fill={index < product.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="text-sm">({product.reviews.length} reviews)</span>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <span className="text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className={`text-sm line-through ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className={`text-lg mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center border rounded-lg ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  }`}>
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className={`px-4 py-2 ${
                        isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      -
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className={`px-4 py-2 ${
                        isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      +
                    </button>
                  </div>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {quantity > 1 ? `Total: $${(product.price * quantity).toFixed(2)}` : ''}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                  isDarkMode
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-emerald-500 hover:bg-emerald-600'
                } text-white transition-colors`}
              >
                <ShoppingCart size={20} />
                <span>{user ? 'Add to Cart' : 'Sign in to Purchase'}</span>
              </motion.button>

              {/* Product Benefits */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                } flex items-start space-x-3`}>
                  <Truck className="text-emerald-500" size={24} />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      On orders over $500
                    </p>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                } flex items-start space-x-3`}>
                  <Shield className="text-emerald-500" size={24} />
                  <div>
                    <h4 className="font-medium">1 Year Warranty</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Full coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12">
              <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
                {['description', 'specifications', 'faq'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-4 font-medium capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-emerald-500 text-emerald-500'
                        : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {product.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="text-emerald-500" size={20} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <dt className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {key}
                        </dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-6">
                    {[
                      {
                        question: 'What is the warranty period?',
                        answer: '12 months manufacturer warranty with option to extend.'
                      },
                      {
                        question: 'Is technical support included?',
                        answer: 'Yes, 24/7 technical support is included with all our products.'
                      },
                      {
                        question: 'How long does shipping take?',
                        answer: '2-5 business days for domestic orders.'
                      }
                    ].map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-medium flex items-center space-x-2 mb-2">
                          <HelpCircle size={20} className="text-emerald-500" />
                          <span>{faq.question}</span>
                        </h4>
                        <p className={`ml-7 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{review.userName}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {review.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                          fill={index < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Info size={48} className="mx-auto mb-4 opacity-50" />
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
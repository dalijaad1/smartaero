import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { Star, Share2, ChevronLeft, ChevronRight, ShoppingCart, Heart, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const products = {
  'tower': {
    id: 'tower',
    name: 'SmartAero Tower',
    price: 299.99,
    rating: 4.8,
    reviewCount: 124,
    images: ['/SmartAero Tower.png'],
    
    category: 'Main Product',
    description: 'The SmartAero Tower is our flagship product, combining advanced IoT technology with precision agriculture monitoring. This all-in-one solution provides comprehensive environmental control and monitoring for your crops.',
    features: [
      'Real-time temperature and humidity monitoring',
      'Soil moisture sensing with automatic irrigation control',
      'Water level monitoring and alerts',
      'pH monitoring and adjustment',
      'Solar-powered with battery backup',
      'Mobile app connectivity',
      'Weather-resistant design',
      'Easy installation and setup'
    ],
    specs: {
      'Dimensions': '30cm × 30cm × 100cm',
      'Weight': '5.2 kg',
      'Power': 'Solar + 5000mAh Battery',
      'Connectivity': 'WiFi + Bluetooth',
      'Sensors': 'Temperature, Humidity, pH, EC, Light',
      'Water Capacity': '5L',
      'Operating Temperature': '-10°C to 60°C',
      'Warranty': '2 Years'
    },
    variants: {
      colors: ['Silver', 'Black', 'White'],
      sizes: ['Standard', 'Pro', 'Enterprise']
    },
    stock: 50,
    reviews: [
      {
        id: 1,
        user: 'John D.',
        rating: 5,
        comment: 'Excellent product! The automation features have saved me countless hours.',
        date: '2024-02-15'
      },
      {
        id: 2,
        user: 'Sarah M.',
        rating: 4,
        comment: 'Great system, though setup took a bit longer than expected.',
        date: '2024-02-10'
      }
    ],
    relatedProducts: ['soil-kit', 'irrigation', 'ph-meter']
  },
  'soil-kit': {
    id: 'soil-kit',
    name: 'Soil Moisture Sensor Kit',
    price: 49.99,
    rating: 4.6,
    reviewCount: 89,
   images: ['/Soil Moisture Sensor Kit.jpg'],

    category: 'IoT Devices',
    description: 'Professional-grade soil moisture monitoring system designed for precision agriculture. Features high-accuracy sensors and long-term stability for reliable measurements.',
    features: [
      'High-precision moisture sensing',
      'Temperature compensation',
      'Wireless data transmission',
      'Long battery life',
      'Weatherproof design',
      'Multiple depth measurements',
      'Real-time alerts',
      'Historical data logging'
    ],
    specs: {
      'Dimensions': '15cm × 5cm × 3cm',
      'Weight': '200g',
      'Power': '2 × AA Batteries',
      'Battery Life': '12 months',
      'Range': '100m line of sight',
      'Accuracy': '±3%',
      'Depth Range': '0-60cm',
      'Warranty': '1 Year'
    },
    variants: {
      types: ['Basic', 'Pro', 'Multi-Sensor']
    },
    stock: 100,
    reviews: [
      {
        id: 1,
        user: 'Mike R.',
        rating: 5,
        comment: 'Perfect for my greenhouse setup. Very accurate readings.',
        date: '2024-02-14'
      }
    ],
    relatedProducts: ['tower', 'irrigation', 'esp32-kit']
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addItem);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  const product = products[id as keyof typeof products];
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleImageChange = (direction: 'prev' | 'next') => {
    setCurrentImageIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % product.images.length;
      } else {
        return prev === 0 ? product.images.length - 1 : prev - 1;
      }
    });
  };

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
  };

  const shareUrl = window.location.href;
  const shareText = `Check out the ${product.name} on SmartAero!`;

  return (
    <>
      <Helmet>
        <title>{product.name} - SmartAero</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.images[0],
            "brand": {
              "@type": "Brand",
              "name": "SmartAero"
            },
            "offers": {
              "@type": "Offer",
              "url": window.location.href,
              "priceCurrency": "USD",
              "price": product.price,
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewCount
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-white dark:from-secondary-800 dark:to-secondary-900 py-12">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
              Home
            </Link>
            <span className="text-secondary-400">/</span>
            <Link to="/shop" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
              Shop
            </Link>
            <span className="text-secondary-400">/</span>
            <span className="text-primary-600 dark:text-primary-400">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div 
                className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-secondary-800"
                onMouseMove={handleZoom}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
              >
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={isZoomed ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : undefined}
                />
                
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleImageChange('prev')}
                    className="p-2 rounded-full bg-white/80 dark:bg-secondary-800/80 text-secondary-600 dark:text-secondary-400 hover:bg-white dark:hover:bg-secondary-700 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleImageChange('next')}
                    className="p-2 rounded-full bg-white/80 dark:bg-secondary-800/80 text-secondary-600 dark:text-secondary-400 hover:bg-white dark:hover:bg-secondary-700 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                      currentImageIndex === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={20}
                        className={index < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-secondary-300'}
                      />
                    ))}
                    <span className="ml-2 text-secondary-600 dark:text-secondary-400">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800"
                    >
                      <Heart size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800"
                    >
                      <Share2 size={20} />
                    </motion.button>
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  ${product.price}
                </p>
              </div>

              <div>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Variants */}
              {product.variants && (
                <div className="space-y-4">
                  {product.variants.colors && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Color</h3>
                      <div className="flex gap-2">
                        {product.variants.colors.map(color => (
                          <motion.button
                            key={color}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 rounded-lg border ${
                              selectedColor === color
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-secondary-200 dark:border-secondary-700'
                            }`}
                          >
                            {color}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.variants.sizes && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Size</h3>
                      <div className="flex gap-2">
                        {product.variants.sizes.map(size => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg border ${
                              selectedSize === size
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-secondary-200 dark:border-secondary-700'
                            }`}
                          >
                            {size}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-secondary-200 dark:border-secondary-700 rounded-lg">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                  >
                    -
                  </motion.button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x border-secondary-200 dark:border-secondary-700 bg-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                  >
                    +
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-medium shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-medium mb-4">Key Features</h3>
                <ul className="grid grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400"
                    >
                      <span className="text-primary-600">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-white dark:bg-secondary-800"
                    >
                      <div className="text-sm text-secondary-600 dark:text-secondary-400">
                        {key}
                      </div>
                      <div className="font-medium">{value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Share */}
              <div>
                <h3 className="text-lg font-medium mb-4">Share</h3>
                <div className="flex gap-2">
                  <motion.a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Facebook size={20} />
                  </motion.a>
                  <motion.a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600"
                  >
                    <Twitter size={20} />
                  </motion.a>
                  <motion.a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(product.name)}&summary=${encodeURIComponent(product.description)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {product.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-secondary-800 p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{review.user}</h3>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={index < review.rating ? 'text-yellow-400 fill-current' : 'text-secondary-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-secondary-500">{review.date}</span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          {product.relatedProducts && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                {product.relatedProducts.map(relatedId => {
                  const relatedProduct = products[relatedId as keyof typeof products];
                  if (!relatedProduct) return null;

                  return (
                    <motion.div
                      key={relatedProduct.id}
                      whileHover={{ y: -10 }}
                      className="bg-white dark:bg-secondary-800 rounded-xl overflow-hidden"
                    >
                      <Link to={`/products/${relatedProduct.id}`}>
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium">
                            ${relatedProduct.price}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
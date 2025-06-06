import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

const dummyProducts: Product[] = [
  {
    id: 'tower',
    name: "Smart Irrigation System",
    description: "Automated irrigation system with soil moisture sensing and weather integration",
    price: 299.99,
    category: "Agriculture",
    image: "https://images.pexels.com/photos/3016430/pexels-photo-3016430.jpeg"
  },
  {
    id: 'climate',
    name: "Home Climate Controller",
    description: "Smart thermostat with AI-powered climate optimization",
    price: 199.99,
    category: "Home",
    image: "https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg"
  },
  {
    id: 'monitor',
    name: "Crop Monitor Pro",
    description: "Advanced crop monitoring system with disease detection",
    price: 499.99,
    category: "Agriculture",
    image: "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg"
  }
]

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  const filteredProducts = selectedCategory === 'all'
    ? dummyProducts
    : dummyProducts.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase())

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const categories = ['all', ...new Set(dummyProducts.map(product => product.category.toLowerCase()))]

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      
      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 dark:bg-secondary-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg overflow-hidden group"
          >
            <Link to={`/products/${product.id}`} className="block">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary-600">
                    ${product.price}
                  </span>
                  <span className="text-primary-600 group-hover:translate-x-2 transition-transform duration-300">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
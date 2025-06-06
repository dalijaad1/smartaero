import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogIn, ShoppingCart, User, BookOpen, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import AuthModal from './Auth/AuthModal';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Journey', href: '/journey' },
    { name: 'Shop', href: '/shop' },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Contact', href: '/contact' },
    ...(user ? [{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }] : [])
  ];

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setIsAuthModalOpen(true);
    }
    setIsOpen(false);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto relative">
          <div className="relative rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-900/20 backdrop-blur-xl"></div>
            <div className="absolute inset-0 rounded-full border border-emerald-500/30"></div>
            
            <div className={`relative px-6 py-3 ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-lg`}>
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <img src="/logo.png" alt="SmartAero" className="h-12" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`navbar-link relative px-4 py-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      } ${location.pathname === link.href ? 'navbar-link-active' : ''}`}
                    >
                      {link.name}
                      {location.pathname === link.href && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                          layoutId="navbar-underline"
                          style={{ width: '100%' }}
                        />
                      )}
                    </Link>
                  ))}
                  
                  {user && (
                    <>
                      <Link
                        to="/shop/cart"
                        className={`relative p-2 rounded-full transition-colors ${
                          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        <ShoppingCart size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
                        {cartItemCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cartItemCount}
                          </span>
                        )}
                      </Link>

                      <Link
                        to="/shop/dashboard"
                        className={`p-2 rounded-full transition-colors ${
                          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        <User size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
                      </Link>
                    </>
                  )}
                  
                  <button
                    onClick={handleAuthClick}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                    } text-white`}
                  >
                    <LogIn size={18} />
                    <span>{user ? 'Sign Out' : 'Sign In'}</span>
                  </button>
                  
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode
                        ? 'bg-gray-800 text-emerald-400 hover:bg-gray-700'
                        : 'bg-gray-100 text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center space-x-4">
                  {user && (
                    <>
                      <Link
                        to="/shop/cart"
                        className={`relative p-2 rounded-full transition-colors ${
                          isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
                        }`}
                      >
                        <ShoppingCart size={20} />
                        {cartItemCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cartItemCount}
                          </span>
                        )}
                      </Link>

                      <Link
                        to="/shop/dashboard"
                        className={`p-2 rounded-full transition-colors ${
                          isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
                        }`}
                      >
                        <User size={20} />
                      </Link>
                    </>
                  )}
                  
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode
                        ? 'bg-gray-800 text-emerald-400 hover:bg-gray-700'
                        : 'bg-gray-100 text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode
                        ? 'text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-lg border border-emerald-500/20 ${
                  isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
                } backdrop-blur-lg`}
              >
                <div className="p-4 space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                        location.pathname === link.href
                          ? isDarkMode
                            ? 'bg-emerald-900/50 text-emerald-400'
                            : 'bg-emerald-50 text-emerald-600'
                          : isDarkMode
                          ? 'text-white hover:bg-gray-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <button
                    onClick={handleAuthClick}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                    } text-white`}
                  >
                    <LogIn size={18} />
                    <span>{user ? 'Sign Out' : 'Sign In'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default Navbar;
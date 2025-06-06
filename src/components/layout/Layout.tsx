import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ScrollProgress from '@/components/ScrollProgress'
import NavbarStars from '@/components/NavbarStars'
import ShootingStars from '@/components/ShootingStars'
import Cart from '@/components/Cart'
import { useCartStore } from '@/store/cartStore'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuthStore } from '@/store/authStore'
import { Menu, X, Sun, Moon, ShoppingBag, LogIn, LogOut, Home, Rocket, Store, BookOpen, MessageSquare, User, LayoutDashboard } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const cartItems = useCartStore((state) => state.items)
  const { user, signOut } = useAuthStore()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/journey', label: 'Journey', icon: Rocket },
    { path: '/shop', label: 'Shop', icon: Store },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/contact', label: 'Contact', icon: MessageSquare },
  ]

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  }

  const linkVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const isAdmin = user?.email === 'mohamedali.jaadari@gmail.com';

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <motion.header 
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`sticky top-4 z-40 mx-4 transition-all duration-300 ${
          isScrolled ? 'translate-y-0' : 'translate-y-1'
        }`}
      >
        <nav className={`max-w-7xl mx-auto h-[50px] rounded-[15px] transition-all duration-300 relative overflow-hidden ${
          isScrolled 
            ? 'bg-primary-900/95 dark:bg-primary-900/95 shadow-lg backdrop-blur-md'
            : 'bg-primary-800/80 dark:bg-primary-900/80 backdrop-blur-sm'
        }`}>
          <NavbarStars />
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1.5 hover:bg-primary-700 dark:hover:bg-primary-800 rounded-lg text-white"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
              >
                <Link to="/" className="flex items-center gap-4">
  <motion.img 
    src="/logo.png"
    alt="SmartAero Logo"
className="w-20 h-20 object-contain shadow-xl"
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  />
  
</Link>
              </motion.div>
            </div>
            
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    whileHover="hover"
                    whileTap="tap"
                    variants={linkVariants}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-3 py-1.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-1.5 ${
                        isActive(item.path)
                          ? 'text-white'
                          : 'text-primary-100 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-primary-700 dark:bg-primary-700 rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-800 text-white"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-primary-600 text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartItems.length}
                  </span>
                )}
              </motion.button>

              {user && (
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Link
                    to={isAdmin ? "/dashboard" : "/profile"}
                    className="p-1.5 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-800 text-white"
                  >
                    {isAdmin ? <LayoutDashboard className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </Link>
                </motion.div>
              )}

              {user ? (
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </motion.button>
              ) : (
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Link
                    to="/signin"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-primary-50 text-primary-600 rounded-lg text-sm font-medium transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                </motion.div>
              )}

              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
                onClick={toggleTheme}
                className="p-1.5 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-800 text-white"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </nav>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 w-72 bg-primary-900 dark:bg-primary-900 shadow-lg lg:hidden"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-8">
                    <Link 
                      to="/" 
                      className="flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.img 
                        src="logo.png"
                        alt="Logo"
                        className="w-10 h-10 rounded-lg object-cover shadow-lg ring-2 ring-white/20"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      />
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-primary-700 dark:hover:bg-primary-800 rounded-lg text-white"
                      aria-label="Close menu"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 font-medium transition-colors px-4 py-3 rounded-lg ${
                            isActive(item.path)
                              ? 'bg-primary-700 dark:bg-primary-700 text-white'
                              : 'text-primary-100 hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                        </Link>
                      );
                    })}
                    {user && (
                      <Link
                        to={isAdmin ? "/dashboard" : "/profile"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 font-medium transition-colors px-4 py-3 rounded-lg text-primary-100 hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white"
                      >
                        {isAdmin ? (
                          <>
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                          </>
                        ) : (
                          <>
                            <User className="w-5 h-5" />
                            My Profile
                          </>
                        )}
                      </Link>
                    )}
                    <div className="mt-4 pt-4 border-t border-primary-700 dark:border-primary-700">
                      {user ? (
                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      ) : (
                        <Link
                          to="/signin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-primary-50 text-primary-600 px-4 py-3 rounded-lg font-medium transition-colors text-center"
                        >
                          <LogIn className="w-4 h-4" />
                          Sign In
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              />
            </>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="relative bg-gradient-to-b from-white to-primary-50 dark:from-secondary-900 dark:to-secondary-800 border-t border-secondary-100 dark:border-secondary-800 overflow-hidden">
  <ShootingStars />
  <div className="container relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
      {/* Company Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Link to="/" className="inline-block">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            SmartAero
          </h2>
        </Link>
        <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
          Revolutionizing agriculture through innovative IoT solutions and smart technology.
        </p>

        {/* Social Links */}
        <div className="flex gap-4">
          {[
            { platform: 'LinkedIn', icon: 'In', link: 'https://www.linkedin.com/company/smartaerotun' },
            { platform: 'Facebook', icon: 'F', link: 'https://www.facebook.com/profile.php?id=61568452772855' },
            { platform: 'Instagram', icon: 'IG', link: 'https://www.instagram.com/smartaero/' },
          ].map(({ platform, icon, link }) => (
            <motion.a
              key={platform}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors"
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </motion.div>


            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <motion.li key={item.path} whileHover={{ x: 3 }}>
                    <Link
                      to={item.path}
                      className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <address className="not-italic space-y-3 text-secondary-600 dark:text-secondary-400">
                <p className="flex items-center gap-2">
                  <span className="text-primary-600">📍</span>
                  Higher Institute of Computer Science of Mahdia,<br />
                  Route de Réjiche, Mahdia 5121
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary-600">📞</span>
                  <a 
                    href="tel:+21626531980"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    +216 26531980
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary-600">📧</span>
                  <a 
                    href="mailto:mohamedali.jaadari@gmail.com"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    mohamedali.jaadari@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary-600">🕒</span>
                  Mon - Fri: 9:00 - 18:00
                </p>
              </address>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold">Stay Updated</h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Subscribe to our newsletter for the latest updates and exclusive offers.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-secondary-100 dark:border-secondary-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-600 dark:text-secondary-400">
              <p>© 2024 SmartAero. All rights reserved.</p>
              <div className="flex gap-6">
                <Link
                  to="/privacy"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
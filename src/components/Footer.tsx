import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Linkedin, Instagram, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/journey', label: 'Journey' },
    { to: '/shop', label: 'Shop' },
    { to: '/contact', label: 'Contact' },
    { to: '/resources', label: 'Resources' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61568452772855', label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/smartaerotun/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/smartaero/', label: 'Instagram' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      content: 'Higher Institute of Computer Science of Mahdia, Route de Réjiche, Mahdia 5121'
    },
    {
      icon: Phone,
      content: '+216 26531980',
      href: 'tel:+21626531980'
    },
    {
      icon: Mail,
      content: 'mohamedali.jaadari@gmail.com',
      href: 'mailto:mohamedali.jaadari@gmail.com'
    },
    {
      icon: Clock,
      content: 'Mon - Fri: 9:00 - 18:00'
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-primary-50 dark:from-secondary-900 dark:to-secondary-800 border-t border-secondary-100 dark:border-secondary-800">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                <motion.img src="/logo.png"/>
              </h2>
            </Link>
            <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
              Revolutionizing agriculture through innovative IoT solutions and smart technology.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ to, label }) => (
                <motion.li 
                  key={to}
                  onHoverStart={() => setHoveredLink(label)}
                  onHoverEnd={() => setHoveredLink(null)}
                  whileHover={{ x: 3 }}
                >
                  <Link
                    to={to}
                    className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                    <AnimatePresence>
                      {hoveredLink === label && (
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          exit={{ width: 0 }}
                          className="absolute bottom-0 left-0 h-0.5 bg-primary-500"
                        />
                      )}
                    </AnimatePresence>
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
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <address className="not-italic space-y-4">
              {contactInfo.map(({ icon: Icon, content, href }, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  {href ? (
                    <a
                      href={href}
                      className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <span className="text-secondary-600 dark:text-secondary-400">
                      {content}
                    </span>
                  )}
                </div>
              ))}
            </address>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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
        <div className="border-t border-secondary-100 dark:border-secondary-800 mt-12 pt-8">
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
  );
};

export default Footer;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`relative w-full max-w-md rounded-2xl overflow-hidden ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            } shadow-xl`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <X size={20} />
            </button>

            <div className="p-6">
              {/* Toggle buttons */}
              <div className="flex mb-8 space-x-2">
                <button
                  onClick={() => setIsSignIn(true)}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                    isSignIn
                      ? isDarkMode
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-500 text-white'
                      : isDarkMode
                      ? 'text-gray-400 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignIn(false)}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                    !isSignIn
                      ? isDarkMode
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-500 text-white'
                      : isDarkMode
                      ? 'text-gray-400 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Auth forms */}
              <AnimatePresence mode="wait">
                {isSignIn ? (
                  <SignIn key="signin" isDarkMode={isDarkMode} onClose={onClose} />
                ) : (
                  <SignUp key="signup" isDarkMode={isDarkMode} onClose={onClose} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface LoadingScreenProps {
  isDarkMode: boolean;
  onFinish: () => void; // callback when loading is done
}

const NUM_PARTICLES = 30;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isDarkMode, onFinish }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [visible, setVisible] = useState(true);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const words = ['Smart.', 'Aero.'];

  useEffect(() => {
    // Switch word every 1.5s
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 1500);

    // Hide loading screen after 3 seconds
    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // Track resize
    const handleResize = () =>
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(hideTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Background */}
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900'
                : 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600'
            }`}
          />

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: NUM_PARTICLES }).map((_, i) => {
              const size = Math.random() * 30 + 20;
              const xStart = Math.random() * screenSize.width;
              const yStart = screenSize.height + 50;
              const xEnd = Math.random() * screenSize.width;
              const delay = Math.random() * 3;

              return (
                <motion.div
                  key={i}
                  className={`absolute ${
                    isDarkMode ? 'text-emerald-400/30' : 'text-white/30'
                  }`}
                  initial={{ opacity: 0, x: xStart, y: yStart }}
                  animate={{ opacity: [0, 1, 0], x: xEnd, y: -100, rotate: 360 }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    delay,
                    ease: 'linear',
                  }}
                >
                  <Leaf size={size} />
                </motion.div>
              );
            })}
          </div>

          {/* Center Text */}
          <div className="relative text-center">
            <div className="h-48 flex justify-center items-center mb-12">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="text-9xl md:text-[12rem] font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <motion.div
              className="mt-8 w-64 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-md shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 3,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

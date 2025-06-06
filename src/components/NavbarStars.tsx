import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const NavbarStars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const createStar = (): Star => ({
      id: Date.now() + Math.random(), // Unique key
      x: Math.random() * 100, // percentage
      y: -20, // starting from top
      size: Math.random() * 2 + 1, // 1px to 3px
      duration: 2 + Math.random() * 2, // 2s to 4s
      delay: Math.random() * 1.5, // up to 1.5s delay
    });

    // Initial stars
    setStars(Array.from({ length: 20 }, createStar));

    // Periodically add a new star
    const interval = setInterval(() => {
      setStars(prev => [...prev.slice(-19), createStar()]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map(star => (
        <motion.div
          key={star.id}
          initial={{ x: `${star.x}%`, y: star.y, opacity: 0 }}
          animate={{ y: '120%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: 'linear',
          }}
          className="absolute"
        >
          <div
            className="bg-white rounded-full"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default NavbarStars;

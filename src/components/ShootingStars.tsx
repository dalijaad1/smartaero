import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
  size: number;
  angle: number;
}

const ShootingStars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const createStar = (): Star => {
      const angle = -15 - Math.random() * 30; // Angle between -45 and -15 degrees
      return {
        id: Math.random(),
        startX: Math.random() * 100,
        startY: -10,
        endX: Math.random() * 100 + 20,
        endY: 110,
        duration: 1 + Math.random() * 1,
        delay: Math.random() * 4,
        size: 1 + Math.random() * 1.5,
        angle,
      };
    };

    setStars(Array.from({ length: 20 }, createStar));

    const interval = setInterval(() => {
      setStars(prev => [...prev.slice(-19), createStar()]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <motion.div
          key={star.id}
          initial={{
            opacity: 0,
            x: `${star.startX}%`,
            y: `${star.startY}%`,
            rotate: star.angle,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: `${star.endX}%`,
            y: `${star.endY}%`,
            rotate: star.angle,
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: "linear",
            times: [0, 0.15, 1],
          }}
          className="absolute"
        >
          <div
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            className="bg-primary-200 dark:bg-white rounded-full shadow-[0_0_3px_rgba(255,255,255,0.8)] relative"
          >
            <div
              className="absolute h-[1px] w-[50px] origin-right"
              style={{
                background: 'linear-gradient(to left, var(--tw-gradient-from), var(--tw-gradient-to))',
                '--tw-gradient-from': 'rgb(255 255 255 / 0.2)',
                '--tw-gradient-to': 'rgb(255 255 255 / 0)',
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ShootingStars;
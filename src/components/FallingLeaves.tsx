import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
  type: 'circle' | 'leaf';
}

const LeafSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="fill-primary-600/20"
  >
    <path d="M12 2C7.03 2 3 6.03 3 11c0 2.1.74 4.03 1.96 5.54.24.28.7.29.97.03l1.42-1.42c.2-.2.2-.51 0-.71-.57-.57-.89-1.35-.89-2.16 0-1.66 1.34-3 3-3s3 1.34 3 3v8c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-8c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .81-.32 1.59-.89 2.16-.2.2-.2.51 0 .71l1.42 1.42c.27.26.73.25.97-.03C20.26 15.03 21 13.1 21 11c0-4.97-4.03-9-9-9z"/>
  </svg>
);

const CircleSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="fill-primary-600/20"
  >
    <circle cx="12" cy="12" r="8" />
  </svg>
);

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const createLeaf = (): Leaf => ({
      id: Math.random(),
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 4,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      type: Math.random() > 0.5 ? 'leaf' : 'circle',
    });

    setLeaves(Array.from({ length: 30 }, createLeaf));

    const interval = setInterval(() => {
      setLeaves(prev => [...prev.slice(-29), createLeaf()]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {leaves.map(leaf => (
          <motion.div
            key={leaf.id}
            initial={{
              opacity: 0,
              x: `${leaf.x}vw`,
              y: -20,
              rotate: leaf.rotation,
              scale: leaf.scale,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [
                `${leaf.x}vw`,
                `${leaf.x + (Math.random() * 40 - 20)}vw`,
                `${leaf.x + (Math.random() * 60 - 30)}vw`,
              ],
              y: ['0vh', '50vh', '100vh'],
              rotate: [leaf.rotation, leaf.rotation + 180, leaf.rotation + 360],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute"
          >
            {leaf.type === 'leaf' ? <LeafSVG /> : <CircleSVG />}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FallingLeaves;
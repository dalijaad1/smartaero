import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Droplet, Fan, Lightbulb, FlaskRound as Flask, Wrench, Award, Timer, Info } from 'lucide-react';
import useSound from 'use-sound';

interface TowerGameProps {
  isDarkMode: boolean;
}

interface TowerPart {
  id: string;
  type: string;
  icon: React.FC<{ size?: number; className?: string }>;
  name: string;
  description: string;
}

const TOWER_PARTS: TowerPart[] = [
  { id: 'nozzle', type: 'nozzle', icon: Droplet, name: 'Mist Nozzle', description: 'Sprays nutrient-rich mist' },
  { id: 'fan', type: 'fan', icon: Fan, name: 'Air Fan', description: 'Circulates air for healthy roots' },
  { id: 'light', type: 'light', icon: Lightbulb, name: 'LED Lights', description: 'Provides optimal light spectrum' },
  { id: 'tank', type: 'tank', icon: Flask, name: 'Nutrient Tank', description: 'Stores nutrient solution' },
];

const CORRECT_ORDER = ['tank', 'nozzle', 'fan', 'light'];

const DraggablePart: React.FC<{ part: TowerPart; isToolbox?: boolean }> = ({ part, isToolbox }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'tower-part',
    item: { id: part.id, type: part.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const Icon = part.icon;

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${
        isDragging ? 'opacity-50' : 'opacity-100'
      } cursor-grab active:cursor-grabbing`}
    >
      <div className={`p-4 rounded-lg flex flex-col items-center justify-center space-y-2 ${
        isToolbox ? 'bg-emerald-500/20 hover:bg-emerald-500/30' : 'bg-gray-700'
      }`}>
        <Icon size={24} className="text-emerald-500" />
        <span className="text-sm font-medium">{part.name}</span>
      </div>
    </motion.div>
  );
};

const DroppableSlot: React.FC<{
  accept: string[];
  onDrop: (item: any) => void;
  children?: React.ReactNode;
}> = ({ accept, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'tower-part',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`h-24 w-full rounded-lg border-2 border-dashed transition-colors ${
        isOver ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-600 bg-gray-800/50'
      } flex items-center justify-center`}
    >
      {children}
    </div>
  );
};

const TowerGame: React.FC<TowerGameProps> = ({ isDarkMode }) => {
  const [slots, setSlots] = useState<(string | null)[]>(Array(4).fill(null));
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [playDrop] = useSound('/sounds/drop.mp3', { volume: 0.5 });
  const [playSuccess] = useSound('/sounds/success.mp3', { volume: 0.7 });
  const [playError] = useSound('/sounds/error.mp3', { volume: 0.3 });

  const tips = [
    'Start with the nutrient tank at the bottom!',
    'Mist nozzles work best above the nutrient tank',
    'Air circulation is crucial for healthy roots',
    'LED lights should be at the top for optimal coverage',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        if (Math.random() < 0.1) {
          setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  useEffect(() => {
    if (timer === 0) {
      setIsPlaying(false);
      checkTower();
    }
  }, [timer]);

  const handleDrop = (index: number) => (item: { id: string }) => {
    playDrop();
    const newSlots = [...slots];
    newSlots[index] = item.id;
    setSlots(newSlots);
    checkTower();
  };

  const checkTower = () => {
    if (slots.every((slot, i) => slot === CORRECT_ORDER[i])) {
      setGameComplete(true);
      playSuccess();
      setScore(score + Math.floor(timer * 10));
    }
  };

  const startGame = () => {
    setSlots(Array(4).fill(null));
    setTimer(120);
    setGameComplete(false);
    setIsPlaying(true);
    setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">
                Build Your <span className="text-emerald-500">SmartAero Tower</span>
              </h1>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Drag and drop the components to assemble your aeroponic tower!
              </p>
            </div>

            <div className={`relative rounded-2xl p-8 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              {/* Score & Timer */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Award className="text-emerald-500" />
                  <span className="font-mono text-xl">{score}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Timer className="text-emerald-500" />
                  <span className="font-mono text-xl">{timer}s</span>
                </div>
              </div>

              {/* Tower Assembly Area */}
              <div className="space-y-4 mb-8">
                {slots.map((slot, index) => (
                  <DroppableSlot
                    key={index}
                    accept={['tower-part']}
                    onDrop={handleDrop(index)}
                  >
                    {slot && (
                      <DraggablePart
                        part={TOWER_PARTS.find(p => p.id === slot)!}
                      />
                    )}
                  </DroppableSlot>
                ))}
              </div>

              {/* Toolbox */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {TOWER_PARTS.map((part) => (
                  <DraggablePart
                    key={part.id}
                    part={part}
                    isToolbox
                  />
                ))}
              </div>

              {/* Tips */}
              <AnimatePresence mode="wait">
                {currentTip && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center space-x-2 p-4 rounded-lg bg-gray-700/50 mb-4"
                  >
                    <Info size={20} className="text-emerald-500 flex-shrink-0" />
                    <p className="text-sm">{currentTip}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Game Over / Start Screen */}
              <AnimatePresence>
                {(!isPlaying || timer === 0 || gameComplete) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  >
                    <div className="text-center p-8 rounded-xl bg-white/10 backdrop-blur-md">
                      {gameComplete ? (
                        <>
                          <h2 className="text-2xl font-bold mb-4 text-emerald-400">
                            Tower Complete!
                          </h2>
                          <p className="text-white mb-4">
                            Score: {score}
                          </p>
                        </>
                      ) : timer === 0 ? (
                        <>
                          <h2 className="text-2xl font-bold mb-4 text-red-400">
                            Time's Up!
                          </h2>
                          <p className="text-white mb-4">
                            Score: {score}
                          </p>
                        </>
                      ) : (
                        <>
                          <h2 className="text-2xl font-bold mb-4 text-white">
                            Ready to Build?
                          </h2>
                          <p className="text-white mb-6">
                            Assemble the tower in the correct order to win!
                          </p>
                        </>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                      >
                        {gameComplete || timer === 0 ? 'Play Again' : 'Start Game'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TowerGame;
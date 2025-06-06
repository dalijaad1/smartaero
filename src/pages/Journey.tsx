import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { journeyMilestones } from '../constants/journey';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Award, Trophy, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Initialize current image index for each milestone
    const initialImages = journeyMilestones.reduce((acc, milestone) => {
      acc[milestone.id] = 0;
      return acc;
    }, {} as { [key: string]: number });
    setCurrentImages(initialImages);

    // Set up image rotation intervals
    const intervals = journeyMilestones.map(milestone => {
      return setInterval(() => {
        setCurrentImages(prev => ({
          ...prev,
          [milestone.id]: (prev[milestone.id] + 1) % milestone.images.length
        }));
      }, 5000); // Rotate every 5 seconds
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const milestoneElements = containerRef.current.querySelectorAll('.milestone');
    
    milestoneElements.forEach((element, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        }
      });

      // Animate milestone content
      tl.fromTo(
        element.querySelector('.milestone-content'),
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
          rotateX: -30,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Animate milestone image
      tl.fromTo(
        element.querySelector('.milestone-image'),
        {
          opacity: 0,
          x: index % 2 === 0 ? 100 : -100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // Animate achievement items
      element.querySelectorAll('.achievement-item').forEach((item, i) => {
        tl.fromTo(
          item,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          `-=${i ? 0.3 : 0}`
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleImageNavigation = (milestoneId: string, direction: 'prev' | 'next') => {
    const milestone = journeyMilestones.find(m => m.id === milestoneId);
    if (!milestone) return;

    setCurrentImages(prev => ({
      ...prev,
      [milestoneId]: direction === 'next'
        ? (prev[milestoneId] + 1) % milestone.images.length
        : (prev[milestoneId] - 1 + milestone.images.length) % milestone.images.length
    }));
  };

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Rocket className="w-6 h-6" />;
      case 1: return <Star className="w-6 h-6" />;
      case 2: return <Award className="w-6 h-6" />;
      case 3: return <Trophy className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-secondary-900">
      {/* Progress indicator */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="space-y-4">
          {journeyMilestones.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-primary-500 scale-150'
                  : 'bg-secondary-300 dark:bg-secondary-700 hover:bg-secondary-400 dark:hover:bg-secondary-600'
              }`}
              onClick={() => {
                const element = containerRef.current?.querySelectorAll('.milestone')[index];
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-primary-500">Journey</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-secondary-600 dark:text-secondary-400">
            From a bold idea to revolutionizing agriculture with smart technology
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <div className="w-8 h-12 rounded-full border-2 border-current p-1">
                <div className="w-1 h-3 bg-current rounded-full mx-auto mt-2" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-4 py-20">
        {journeyMilestones.map((milestone, index) => (
          <div 
            key={milestone.id}
            className="milestone relative mb-32 last:mb-0"
          >
            <div className="milestone-content">
              <div className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-24`}>
                <motion.div 
                  className="milestone-image w-full lg:w-1/2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImages[milestone.id]}
                        src={milestone.images[currentImages[milestone.id]]}
                        alt={milestone.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setSelectedImage(milestone.images[currentImages[milestone.id]])}
                      />
                    </AnimatePresence>

                    {/* Image navigation */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageNavigation(milestone.id, 'prev');
                        }}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageNavigation(milestone.id, 'next');
                        }}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {milestone.images.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === currentImages[milestone.id]
                              ? 'bg-white'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500">
                      {getIcon(index)}
                    </div>
                    <span className="text-sm font-medium text-secondary-500 dark:text-secondary-400">
                      {milestone.date}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-6">{milestone.title}</h2>
                  <p className="text-lg mb-8 text-secondary-600 dark:text-secondary-400">
                    {milestone.description}
                  </p>

                  {milestone.quote && (
                    <blockquote className="relative pl-6 mb-8 text-secondary-600 dark:text-secondary-400">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-full" />
                      <p className="text-lg italic">{milestone.quote.text}</p>
                      {milestone.quote.author && (
                        <footer className="mt-2 font-medium text-primary-500">
                          — {milestone.quote.author}
                        </footer>
                      )}
                    </blockquote>
                  )}

                  {milestone.achievements && (
                    <div className="space-y-4">
                      {milestone.achievements.map((achievement, i) => (
                        <div 
                          key={i}
                          className="achievement-item flex items-center space-x-3 p-4 rounded-lg bg-primary-500/10"
                        >
                          <div className="text-primary-500">
                            <Star className="w-5 h-5" />
                          </div>
                          <span className="text-secondary-600 dark:text-secondary-400">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen image viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Full size"
              initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Journey;
import React from 'react';
import { motion } from 'framer-motion';
import { features, getFeatureIcon } from '../constants/data';

const Features: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const featureVariants = {
    hidden: (isEven: boolean) => ({ 
      opacity: 0, 
      x: isEven ? 50 : -50 
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7
      }
    }
  };

  return (
    <section 
      id="features" 
      className={`py-20 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4" 
            variants={itemVariants}
          >
            Key <span className="text-emerald-500">Features</span>
          </motion.h2>
          
          <motion.div className="w-20 h-1 bg-emerald-500 mx-auto mb-8" variants={itemVariants}></motion.div>
          
          <motion.p 
            className="text-base md:text-lg" 
            variants={itemVariants}
          >
            Explore the innovative capabilities that make SmartAero the leading choice for 
            smart agriculture and home automation.
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = getFeatureIcon(feature.icon);
              
              return (
                <motion.div 
                  key={feature.id}
                  custom={isEven}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
                >
                  <div className={`w-full md:w-1/3 flex justify-center ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                    <motion.div 
                      className={`w-24 h-24 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-emerald-600' : 'bg-emerald-100'
                      }`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <IconComponent 
                        size={48} 
                        className={isDarkMode ? 'text-white' : 'text-emerald-600'} 
                      />
                    </motion.div>
                  </div>
                  
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
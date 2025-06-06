import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../constants/data';

const About: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const teamCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section 
      id="about" 
      className={`py-20 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-center" 
            variants={itemVariants}
          >
            About <span className="text-emerald-500">SmartAero</span>
          </motion.h2>
          
          <motion.div className="w-20 h-1 bg-emerald-500 mx-auto mb-8" variants={itemVariants}></motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl font-semibold mb-6 text-center" 
            variants={itemVariants}
          >
            We're on a mission to revolutionize agriculture and home management through innovative IoT solutions.
          </motion.p>
          
          <motion.p 
            className="text-base md:text-lg mb-8 text-center" 
            variants={itemVariants}
          >
            We believe in creating smart technology that makes life <span className="font-semibold">simpler</span>, 
            <span className="font-semibold"> more efficient</span>, and <span className="font-semibold">more sustainable</span> for everyone.
          </motion.p>
          
          <motion.h3 
            className="text-xl md:text-2xl font-semibold mb-4" 
            variants={itemVariants}
          >
            Our Story
          </motion.h3>
          
          <motion.p 
            className="text-base md:text-lg mb-8" 
            variants={itemVariants}
          >
            Founded in 2024, SmartAero began as a <span className="text-emerald-500 font-semibold">TN Challenge-winning idea</span> focused 
            on smart agriculture. Our passion for innovation led us to develop a complete ecosystem of IoT devices that now powers both 
            <span className="font-semibold"> modern farms and smart homes</span> across the globe.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h3 
            className="text-2xl font-semibold mb-12 text-center" 
            variants={itemVariants}
          >
            Meet Our Team
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                custom={index}
                variants={teamCardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg overflow-hidden shadow-md`}
              >
                <a 
                  href={member.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{member.role}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
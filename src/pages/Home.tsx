import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import FallingLeaves from '@/components/FallingLeaves'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import VideoPlayer from '@/components/VideoPlayer'

const Home = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current && heroInView) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = '';
      
      text.split(' ').forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block';
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(20px)';
        wordSpan.innerText = word + ' ';
        titleRef.current?.appendChild(wordSpan);

        gsap.to(wordSpan, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.2
        });
      });
    }
  }, [heroInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="min-h-screen">
      <FallingLeaves />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-white dark:from-primary-900/10 dark:to-secondary-900 -z-10" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 text-center"
        >
     <motion.div variants={itemVariants} className="mb-6">
  <img 
    src="logo.png" 
    alt="SmartAero Logo" 
    className="mx-auto shadow-xl mb-8 object-contain"
    style={{ width: '400px', height: '400px' }}
  />
</motion.div>

          <motion.h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent"
          >
            Smart Farming. Smart Living.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            IoT-powered remote monitoring and control solutions for your environment.
            Experience the future of agriculture and home automation with SmartAero.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-12"
          >
            <Link
              to="/shop"
              className="group relative px-8 py-3 bg-primary-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20"
            >
              <span className="relative z-10">Shop Now</span>
              <motion.div
                className="absolute inset-0 bg-primary-500 rounded-lg -z-0"
                initial={false}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-6"
          >
            <motion.a
              href="#video"
              className="text-secondary-600 dark:text-secondary-400 flex flex-col items-center gap-2 group"
              whileHover={{ y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-lg font-medium group-hover:text-primary-600 transition-colors">
                Watch Our Story
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600"
              >
                ↓
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-gradient-to-b from-white to-primary-50/30 dark:from-secondary-900 dark:to-secondary-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
  Discover SmartAero
</h2>
<p className="text-lg text-secondary-600 dark:text-secondary-400 text-center mb-12 max-w-3xl mx-auto">
  Watch how our innovative IoT solutions are transforming agriculture and home automation.
</p>

<VideoPlayer
  url="smartaero.mp4"
  poster="banner.png"
  sources={[
    {
      src: "smartaero.mp4",
      type: "video/mp4"
    }
  ]}
/>
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Founded in 2024, SmartAero began as a TN Challenge-winning startup with a vision to transform
              agriculture. Our passion for innovation led us to create a complete IoT ecosystem that supports
              modern farms and smart homes worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-primary-50 dark:bg-secondary-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              The innovative minds behind SmartAero, working together to revolutionize agriculture through technology.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {team.map((member) => (
              <motion.a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="w-52 flex-shrink-0"
              >
                <div className="bg-white dark:bg-secondary-900 rounded-xl overflow-hidden transition-shadow duration-300 group-hover:shadow-xl h-full flex flex-col">
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-base group-hover:text-primary-600 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-secondary-900 py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary-50 dark:bg-secondary-800 p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const team = [
  {
    name: 'Med Ghaith Romdhani',
    role: 'Co-Founder & Lead R&D',
    image: 'ghaith.jpg',
    linkedin: 'https://www.linkedin.com/in/mohamedghaithromdhani/'
  },
  {
    name: 'Mohamed Ali Jaadari',
    role: 'Co-Founder & Lead Developer',
    image: 'me.jpg',
    linkedin: 'https://www.linkedin.com/in/mohamed-ali-jaadari-191b9412b/'
  },
  {
    name: 'Aziz Ben Salem',
    role: 'Co-Founder & Lead Developer',
    image: 'aziz.jpg',
    linkedin: 'https://www.linkedin.com/in/aziz-ben-salem-5946842b3/'
  },
  {
    name: 'Oumayma Nacib',
    role: 'Co-Founder & Finance Manager',
    image: 'ncib.jpg',
    linkedin: 'https://www.linkedin.com/in/oumayma-nacib-b25622329/'
  },
  {
    name: 'Yassine Ben Younes',
    role: 'Co-Founder & Media Manager',
    image: 'yassin.jpg',
    linkedin: 'https://www.linkedin.com/in/yassine-ben-younes-9537ba1b9/'
  }
];

const features = [
  {
    title: 'Wireless Connectivity',
    description: 'Our ESP32 bluetooth enabled devices offer seamless, reliable data transmission — no messy wiring needed.',
    icon: '📡',
  },
  {
    title: 'Remote Control',
    description: 'Manage your environment from anywhere via our mobile and web apps.',
    icon: '📱',
  },
  {
    title: 'Real-time Alerts',
    description: 'Instant notifications help you respond quickly to critical changes.',
    icon: '🔔',
  }
];

export default Home;
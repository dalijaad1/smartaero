import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { articles, benefits, growingGuides } from '@/constants/data';

const Resources = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    if (selectedCategory !== 'all' && article.category !== selectedCategory) return false;
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary-50 to-white dark:from-secondary-800 dark:to-secondary-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn About <span className="text-primary-500">Smart Agriculture</span>
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Discover the future of agriculture through our comprehensive guides, from beginner basics to advanced techniques.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-2.5 text-secondary-400">
                  <BookOpen size={20} />
                </div>
              </div>
              
              <div className="flex gap-2">
                {['all', 'beginner', 'intermediate', 'advanced'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as any)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-secondary-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-primary-50 dark:bg-secondary-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Aeroponics?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-secondary-900 p-8 rounded-2xl text-center"
                >
                  <div className="text-4xl font-bold text-primary-500 mb-2">{benefit.value}</div>
                  <div className="text-lg font-medium mb-2">{benefit.title}</div>
                  <p className="text-secondary-600 dark:text-secondary-400">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Growing Guide Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Can You Grow?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {growingGuides.map((guide, index) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-secondary-800 p-6 rounded-2xl shadow-lg"
              >
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h3 className="text-xl font-bold mb-4">{guide.title}</h3>
                <div className="space-y-2 text-secondary-600 dark:text-secondary-400">
                  <p><strong>Varieties:</strong> {guide.varieties.join(', ')}</p>
                  <p><strong>Growth Time:</strong> {guide.growthTime}</p>
                  <p><strong>Expected Yield:</strong> {guide.yield}</p>
                  <p><strong>Difficulty Level:</strong> {guide.difficulty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Learn More</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredArticles.map((article) => {
                const Icon = article.icon;
                return (
                  <motion.div
                    key={article.title}
                    variants={itemVariants}
                    layout
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-500">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{article.title}</h3>
                        <span className="text-sm text-secondary-500 dark:text-secondary-400 capitalize">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      {article.description}
                    </p>
                    <div className="text-primary-500 hover:text-primary-600 font-medium flex items-center space-x-2">
                      <span>Read more</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-secondary-800 p-8 shadow-xl"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-500">
                    <selectedArticle.icon size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
                    <span className="text-sm text-secondary-500 dark:text-secondary-400 capitalize">
                      {selectedArticle.category} Level
                    </span>
                  </div>
                </div>
                
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                  {selectedArticle.content?.intro}
                </p>
              </div>

              <div className="space-y-8">
                {selectedArticle.content?.sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {section.content}
                    </p>
                    
                    {section.subsections && (
                      <div className="mt-4 space-y-4">
                        {section.subsections.map((subsection, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-lg bg-secondary-50 dark:bg-secondary-700"
                          >
                            <h4 className="font-medium mb-2">{subsection.title}</h4>
                            <p className="text-secondary-600 dark:text-secondary-400">
                              {subsection.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {(selectedArticle.content?.tips || selectedArticle.content?.warnings) && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedArticle.content?.tips && (
                    <div className="p-6 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                      <div className="flex items-center space-x-2 mb-4">
                        <Lightbulb className="text-primary-500\" size={20} />
                        <h4 className="font-semibold">Pro Tips</h4>
                      </div>
                      <ul className="space-y-2">
                        {selectedArticle.content.tips.map((tip, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="text-primary-500 mt-1" size={16} />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedArticle.content?.warnings && (
                    <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <div className="flex items-center space-x-2 mb-4">
                        <AlertTriangle className="text-red-500" size={20} />
                        <h4 className="font-semibold">Important Warnings</h4>
                      </div>
                      <ul className="space-y-2">
                        {selectedArticle.content.warnings.map((warning, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <AlertTriangle className="text-red-500 mt-1" size={16} />
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700">
                <p className="text-lg font-medium text-secondary-600 dark:text-secondary-400">
                  {selectedArticle.content?.conclusion}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resources;
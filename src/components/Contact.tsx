import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setError(null);
  };
  
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setSubmitting(true);
      setError(null);
      
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(formState)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to send message');
        }

        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } catch (error) {
        setError((error as Error).message || 'Failed to send message. Please try again later.');
        console.error('Failed to send message:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <section className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center z-10 px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get in <span className="text-emerald-500">Touch</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear from you.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3"
          >
            <div className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            } rounded-2xl p-8 sticky top-24`}>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } text-emerald-500`}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Our Location</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      sidi massoud,<br />
                      Cité universitaire,<br />
                      Hiboun 5147
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } text-emerald-500`}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      +216 26531980
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } text-emerald-500`}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      mohamedali.jaadari@gmail.com
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12">
                <h3 className="font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61568452772855' },
                    { icon: Instagram, url: 'https://www.instagram.com/smartaero/' },
                    { icon: Linkedin, url: 'https://www.linkedin.com/company/smartaerotun/' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-gray-700 hover:bg-emerald-500' : 'bg-white hover:bg-emerald-500'
                      } text-emerald-500 hover:text-white transition-all duration-300`}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3"
          >
            <div className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            } rounded-2xl p-8`}>
              <h2 className="text-2xl font-bold mb-8">Send Us a Message</h2>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                      isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    <CheckCircle size={20} />
                    <span>Your message has been sent successfully!</span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                      isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    <AlertCircle size={20} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 focus:border-emerald-500'
                          : 'bg-white border-gray-300 focus:border-emerald-500'
                      } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 focus:border-emerald-500'
                          : 'bg-white border-gray-300 focus:border-emerald-500'
                      } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 focus:border-emerald-500'
                        : 'bg-white border-gray-300 focus:border-emerald-500'
                    } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales</option>
                    <option value="partnership">Partnership</option>
                  </select>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 focus:border-emerald-500'
                        : 'bg-white border-gray-300 focus:border-emerald-500'
                    } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                    isDarkMode
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  } text-white transition-colors ${
                    submitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  whileHover={!submitting ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                >
                  <Send size={20} />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
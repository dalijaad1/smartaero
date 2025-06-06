import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Linkedin, Instagram, CheckCircle, AlertCircle } from 'lucide-react';

const subjects = [
  'General Inquiry',
  'Product Support',
  'Sales',
  'Technical Support',
  'Partnership',
  'Other'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-primary-50/30 dark:from-secondary-800 dark:via-secondary-900 dark:to-secondary-800">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium text-sm mb-6"
            >
              Let's Connect
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto leading-relaxed">
              Have questions about our products or services? We're here to help and would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-lg">Our Location</h3>
                      <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                        Higher Institute of Computer Science of Mahdia,<br />
                        Route de Réjiche, Mahdia 5121
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-lg">Phone</h3>
                      <a
                        href="tel:+21626531980"
                        className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 transition-colors"
                      >
                        +216 26531980
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-lg">Email</h3>
                      <a
                        href="mailto:mohamedali.jaadari@gmail.com"
                        className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 transition-colors"
                      >
                        mohamedali.jaadari@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-lg">Working Hours</h3>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        Monday - Friday: 9:00 - 18:00
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Connect With Us
                </h2>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: '#', label: 'Facebook' },
                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                    { icon: Instagram, href: '#', label: 'Instagram' }
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Send Us a Message
              </h2>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl mb-6 flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl mb-6 flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  {errorMessage || 'Oops! Something went wrong. Please try again.'}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    rows={5}
                    placeholder="Your message..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-primary-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/10 to-transparent dark:via-primary-900/5 pointer-events-none" />
      </section>
    </div>
  );
};

export default Contact;
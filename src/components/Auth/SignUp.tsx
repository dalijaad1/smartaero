import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { AlertCircle } from 'lucide-react';

interface SignUpProps {
  isDarkMode: boolean;
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ isDarkMode, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const signUp = useAuthStore((state) => state.signUp);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      onClose();
    } catch (err) {
      setError('Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className={`block text-sm font-medium mb-1.5 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          required
        />
      </div>

      <div>
        <label
          htmlFor="fullName"
          className={`block text-sm font-medium mb-1.5 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className={`block text-sm font-medium mb-1.5 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          required
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className={`block text-sm font-medium mb-1.5 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isDarkMode
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
        } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </motion.form>
  );
};

export default SignUp;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../store/authStore';
import { Camera, AlertCircle, Phone } from 'lucide-react';

interface ProfileProps {
  isDarkMode: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isDarkMode }) => {
  const { user, profile, updateProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    avatarUrl: profile?.avatar_url || '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        avatarUrl: profile.avatar_url || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await updateProfile({
        full_name: formData.fullName,
        phone: formData.phone,
      });
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically:
    // 1. Upload the file to Supabase Storage
    // 2. Get the public URL
    // 3. Update the profile with the new avatar URL
    // For now, we'll just show a message
    alert('Avatar upload will be implemented with Supabase Storage');
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className={`w-24 h-24 rounded-full overflow-hidden ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">{formData.fullName?.[0] || 'U'}</span>
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 w-8 h-8 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              } shadow-lg flex items-center justify-center cursor-pointer hover:bg-emerald-500 hover:text-white transition-colors`}
            >
              <Camera size={16} />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div>
            <h3 className="font-medium">Profile Picture</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              JPG, GIF or PNG. Max size of 2MB.
            </p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label 
              htmlFor="fullName"
              className="block text-sm font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-gray-300'
              } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
            />
          </div>

          <div>
            <label 
              htmlFor="email"
              className="block text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className={`w-full px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-gray-300'
              } border opacity-60 cursor-not-allowed`}
            />
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Email cannot be changed
            </p>
          </div>

          <div>
            <label 
              htmlFor="phone"
              className="block text-sm font-medium mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <Phone 
                size={20} 
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} 
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className={`w-full pl-12 pr-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
            </div>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Used for order updates and notifications
            </p>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-emerald-500 hover:bg-emerald-600'
          } text-white transition-colors ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </motion.button>
      </form>
    </div>
  );
};

export default Profile;
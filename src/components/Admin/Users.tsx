import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, UserPlus, Search } from 'lucide-react';

interface AdminUsersProps {
  isDarkMode: boolean;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data from Supabase
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
    // Add more mock users
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Users Management</h2>
        <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
          isDarkMode
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-emerald-500 hover:bg-emerald-600'
        } text-white transition-colors`}>
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-300'
            } border focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-left ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.role === 'Admin'
                      ? isDarkMode
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-emerald-100 text-emerald-600'
                      : isDarkMode
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'Active'
                      ? isDarkMode
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-green-100 text-green-600'
                      : isDarkMode
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className={`p-2 rounded-lg ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    } transition-colors`}>
                      <Edit2 size={16} />
                    </button>
                    <button className={`p-2 rounded-lg ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    } transition-colors text-red-500`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
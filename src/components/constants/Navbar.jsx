import React from 'react';
import { useTheme } from 'next-themes';

/**
 * Navbar component that displays date range filters and user profile.
 * @param {Object} props
 * @param {string} props.startDate - The selected start date
 * @param {string} props.endDate - The selected end date
 * @param {Function} props.onStartDateChange - Callback when start date changes
 * @param {Function} props.onEndDateChange - Callback when end date changes
 */
const Navbar = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Date Range Filters */}
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Priyadharshan JH
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                AI Research Student
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              👤
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 
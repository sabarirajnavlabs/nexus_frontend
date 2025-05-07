'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useUser, UserButton } from '@clerk/nextjs';
import { useConfig } from '@/components/config-provider';

// Custom icons to avoid heroicons issues
const CustomIcon = {
  Clock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
  ),
  Beaker: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path fillRule="evenodd" d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z" clipRule="evenodd" />
    </svg>
  ),
  ChartBar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
    </svg>
  ),
  Calendar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
    </svg>
  ),
};

export default function DashboardPage() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { backgroundColor, textColor: configTextColor } = useConfig();
  const [startDate, setStartDate] = useState('2024-04-03');
  const [endDate, setEndDate] = useState('2024-04-10');

  // Theme-based styles
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  // Mock data for app usage
  const appUsage = [
    { name: 'VS Code', hours: 28 },
    { name: 'JupyterLab', hours: 15 },
    { name: 'Terminal', hours: 8 }
  ];

  // Mock data for AI libraries
  const aiLibraries = [
    { name: 'TensorFlow', usage: 85 },
    { name: 'PyTorch', usage: 65 },
    { name: 'Scikit-learn', usage: 45 },
    { name: 'OpenCV', usage: 30 }
  ];

  // Mock data for active projects
  const activeProjects = [
    { name: 'Image Classification', progress: 75, category: 'Computer Vision' },
    { name: 'NLP Chatbot', progress: 60, category: 'Natural Language' },
    { name: 'Time Series Analysis', progress: 40, category: 'Data Analytics' }
  ];

  // Mock data for top models
  const topModels = [
    { name: 'OpenAI GPT-4', uses: 250, accuracy: 98 },
    { name: 'Anthropic Claude Sonnet 3.5 v2', uses: 180, accuracy: 96 },
    { name: 'Google Gemini Fast 2', uses: 160, accuracy: 94 },
    { name: 'Amazon Nova Pro', uses: 140, accuracy: 92 }
  ];

  // Training statistics
  const trainingStats = {
    hours: 156,
    successRate: 92,
    modelsDeployed: 12
  };

  // Add a Lightning icon for the "Active Projects" section
  const Lightning = (props) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={props.className || "w-6 h-6"}
    >
      <path 
        fillRule="evenodd" 
        d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" 
        clipRule="evenodd" 
      />
    </svg>
  );

  return (
    <div className={`p-6 ${textColorClass}`} style={{ backgroundColor, color: theme === 'dark' ? 'white' : 'inherit' }}>
      {/* Header with Date Range and User Profile */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Welcome{user?.firstName ? `, ${user.firstName}` : ' to Nexus AI Platform'}
            </h1>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
          <p className={`text-gray-500 dark:text-gray-300 mt-2`}>
            Monitor your AI development metrics and performance
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-300 mb-1.5">Start Date</div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full sm:w-44 px-3 py-2 rounded-lg border ${borderColor} ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              style={theme === 'dark' ? { color: 'white' } : {}}
            />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-300 mb-1.5">End Date</div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-full sm:w-44 px-3 py-2 rounded-lg border ${borderColor} ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              style={theme === 'dark' ? { color: 'white' } : {}}
            />
          </div>
        </div>
      </div>

      {/* AI Hardware Suite Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-blue-500">&lt;/&gt;</span>
          AI Hardware Suite Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* App Usage Time */}
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-6`}>
            <h3 className="text-base font-medium mb-6 flex items-center gap-2">
              <CustomIcon.Clock className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              App Usage Time
            </h3>
            <div className="space-y-4">
              {appUsage.map((app, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-base">{app.name}</span>
                  <span className="text-base text-gray-500 dark:text-gray-300">{app.hours}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Libraries Usage */}
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-6`}>
            <h3 className="text-base font-medium mb-6 flex items-center gap-2">
              <CustomIcon.Beaker className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              AI Libraries Usage
            </h3>
            <div className="space-y-6">
              {aiLibraries.map((lib, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-base">
                    <span>{lib.name}</span>
                    <span className="text-gray-500 dark:text-gray-300">{lib.usage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${lib.usage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-6`}>
            <h3 className="text-base font-medium mb-6 flex items-center gap-2">
              <Lightning className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              Active Projects
            </h3>
            <div className="space-y-6">
              {activeProjects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-base">
                    <div>
                      <p>{project.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{project.category}</p>
                    </div>
                    <span className="text-gray-500 dark:text-gray-300">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Model Hub Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CustomIcon.ChartBar className="h-5 w-5 text-blue-500" />
          AI Model Hub Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Models */}
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-6`}>
            <h3 className="text-base font-medium mb-6 flex items-center gap-2">
              <CustomIcon.Clock className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              Top Models
            </h3>
            <div className="space-y-6">
              {topModels.map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-base">
                    <div>
                      <p>{model.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{model.uses} uses this month</p>
                    </div>
                    <span className="text-gray-500 dark:text-gray-300">{model.accuracy}% acc.</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${model.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training Statistics */}
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-6`}>
            <h3 className="text-base font-medium mb-6">Training Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                  {trainingStats.hours}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">Training Hours</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-semibold text-green-600 dark:text-green-400">
                  {trainingStats.successRate}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-3xl font-semibold text-purple-600 dark:text-purple-400">
                  {trainingStats.modelsDeployed}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">Models Deployed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
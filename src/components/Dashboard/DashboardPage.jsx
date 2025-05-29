'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useUser, UserButton, useSession } from '@clerk/nextjs';
import { useConfig } from '@/components/config-provider';
import { usePathname } from 'next/navigation';

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
  const { session, isLoaded } = useSession();
  const { backgroundColor, textColor: configTextColor } = useConfig();
  const [startDate, setStartDate] = useState('2024-04-03');
  const [endDate, setEndDate] = useState('2024-04-10');
  const [availableModels, setAvailableModels] = useState([]);
  const [budget, setBudget] = useState(null);
  const [spent, setSpent] = useState(null);
  const [loadingModels, setLoadingModels] = useState(true);
  const [loadingSpent, setLoadingSpent] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const pathname = usePathname();
  const hasFetched = useRef(false);

  // Reset hasFetched on route change
  useEffect(() => {
    hasFetched.current = false;
  }, [pathname]);

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

  // Fetch user details from /users/me, then fetch /spend
  useEffect(() => {
    if (!isLoaded || !session || hasFetched.current) return;
    hasFetched.current = true;
    let isMounted = true;
    const fetchData = async () => {
      const token = await session.getToken();
      if (!token) return;
      setLoadingModels(true);
      setLoadingSpent(true);
      try {
        // Fetch user details
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!userRes.ok) throw new Error('Failed to fetch user details');
        const userData = await userRes.json();
        if (isMounted) setUserDetails(userData);
        // Fetch spend (with api_key query param)
        try {
          if (userData.lite_llm_key) {
            const spendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/spend?api_key=${userData.lite_llm_key}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (!spendRes.ok) throw new Error('Failed to fetch spend');
            const spendData = await spendRes.json();
            if (isMounted) setSpent(spendData.spend);
          } else {
            if (isMounted) setSpent(null);
          }
        } catch (spendErr) {
          if (isMounted) setSpent(null);
        }
      } catch (err) {
        if (isMounted) setUserDetails(null);
        if (isMounted) setSpent(null);
      } finally {
        if (isMounted) {
          setLoadingModels(false);
          setLoadingSpent(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [isLoaded, session]);
  

  useEffect(() => {
    if (userDetails?.max_budget) {
      setBudget(userDetails.max_budget);
    }
  }, [userDetails?.max_budget]);

  useEffect(() => {
    console.log('User Details:', userDetails);
    console.log('Models:', userDetails?.models);
    console.log('Max Budget:', userDetails?.max_budget);
  }, [userDetails]);

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

      {/* AI Model Metrics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CustomIcon.ChartBar className="h-5 w-5 text-blue-500" />
          AI Model Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Available Models */}
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 flex flex-col items-center`}>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {loadingModels ? '...' : userDetails && userDetails.models ? userDetails.models.length : '0'}
            </div>
            <div className="text-base text-black dark:text-gray-300">Available Models</div>
          </div>
          {/* Budget */}
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 flex flex-col items-center`}>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {loadingModels ? '...' : userDetails && userDetails.max_budget !== undefined ? userDetails.max_budget : '0'}
            </div>
            <div className="text-base text-black dark:text-gray-300">Budget</div>
          </div>
          {/* Spent */}
          <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 flex flex-col items-center`}>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {loadingSpent ? '...' : spent !== null ? spent : '0'}
            </div>
            <div className="text-base text-black dark:text-gray-300">Spent</div>
          </div>
        </div>
      </div>

      {/* Learning Streak Section */}
      {/* <div className={`mb-8 ${cardBg} rounded-2xl border ${borderColor} p-6`}> 
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
          <div className="flex flex-1 gap-4 md:gap-8">
            <div className="flex-1 flex flex-col items-center justify-center bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <div className="text-3xl font-bold text-yellow-600 mb-1">7</div>
              <div className="text-base text-black dark:text-gray-300">Current Streak</div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-600 mb-1">15</div>
              <div className="text-base text-black dark:text-gray-300">Longest Streak</div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
              <div className="text-base text-black dark:text-gray-300">This Week</div>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center mt-6 md:mt-0">
            <span className="text-green-600 font-medium flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Today's goal completed
            </span>
          </div>
        </div>
      </div> */}

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Learning Paths */}
        <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 flex flex-col items-start`}>
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
            <span className="font-semibold text-black dark:text-gray-300">Learning Paths</span>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-1">3</div>
          <div className="text-black dark:text-gray-300">Paths in progress</div>
          <div className="text-sm text-black dark:text-gray-300">2 completed</div>
          <div className="text-sm text-blue-500 mt-1 cursor-pointer underline">45 hours</div>
        </div>
        {/* Courses */}
        <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 flex flex-col items-start`}>
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
            <span className="font-semibold text-black dark:text-gray-300">Courses</span>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-1">4</div>
          <div className="text-black dark:text-gray-300">Courses in progress</div>
          <div className="text-sm text-black dark:text-gray-300">8 completed</div>
          <div className="text-sm text-green-500 mt-1">92% avg</div>
        </div>
        {/* Assessments */}
        <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 flex flex-col items-start`}>
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
            <span className="font-semibold text-black dark:text-gray-300">Assessments</span>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
          <div className="text-black dark:text-gray-300">Assessments taken</div>
          <div className="text-sm text-black dark:text-gray-300">10 passed</div>
          <div className="text-sm text-purple-500 mt-1">85% avg</div>
        </div>
        {/* Practice */}
        <div className={`${cardBg} rounded-2xl border ${borderColor} p-6 flex flex-col items-start`}>
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20" /></svg>
            <span className="font-semibold text-black dark:text-gray-300">Practice</span>
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-1">24</div>
          <div className="text-black dark:text-gray-300">Exercises completed</div>
          <div className="text-sm text-black dark:text-gray-300">5 this week</div>
          <div className="text-sm text-orange-500 mt-1">7 day streak</div>
        </div>
      </div>

      {/* Recent Activity & Upcoming Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className={`${cardBg} rounded-2xl border ${borderColor} p-6`}>
          <h3 className="text-base font-semibold mb-6 flex items-center gap-2 text-black dark:text-gray-300">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l1 2h13" /></svg>
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
              <div>
                <div className="font-medium text-black dark:text-gray-300">Prompt Engineering for LLMs</div>
                <div className="text-xs text-black dark:text-gray-300">65% complete · 2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
              <div>
                <div className="font-medium text-black dark:text-gray-300">AI Fundamentals Quiz</div>
                <div className="text-xs text-black dark:text-gray-300">90% score · 1 day ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20" /></svg>
              <div>
                <div className="font-medium text-black dark:text-gray-300">RAG Implementation</div>
                <div className="text-xs text-black dark:text-gray-300">Completed · 2 days ago</div>
              </div>
            </div>
          </div>
        </div>
        {/* Upcoming Goals */}
        <div className={`${cardBg} rounded-2xl border ${borderColor} p-6`}>
          <h3 className="text-base font-semibold mb-6 flex items-center gap-2 text-black dark:text-gray-300">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
            Upcoming Goals
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-black dark:text-gray-300">Complete RAG Course</span>
                <span className="text-xs text-black dark:text-gray-300">3 days left</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-black dark:text-gray-300">AI Agents Assessment</span>
              <span className="text-xs text-black dark:text-gray-300">5 days left</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-black dark:text-gray-300">Practice Multi-Modal Models</span>
              <span className="text-xs text-black dark:text-gray-300">1 week left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
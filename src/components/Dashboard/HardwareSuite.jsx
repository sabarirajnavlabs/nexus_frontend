'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';

// Custom icons instead of heroicons to avoid import problems
const CustomIcon = {
  Computer: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z" clipRule="evenodd" />
    </svg>
  ),
  Beaker: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path fillRule="evenodd" d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z" clipRule="evenodd" />
    </svg>
  ),
  Chip: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path fillRule="evenodd" d="M8.478 1.6a.75.75 0 01.273 1.025 3.72 3.72 0 00-.425 1.122c.058.057.118.114.18.168A4.491 4.491 0 0112 2.25c1.413 0 2.673.651 3.497 1.668.082-.06.166-.118.253-.173a3.722 3.722 0 00-.426-1.125.75.75 0 111.298-.75 5.22 5.22 0 01.654 2.515c.079.56-.123 1.116-.504 1.527a3 3 0 00-1.91 1.909c-.41.382-.964.583-1.526.503a5.225 5.225 0 01-2.516-.654.75.75 0 01.75-1.299c.434.186.902.334 1.39.407.879-.885.879-2.317 0-3.202a5.991 5.991 0 00-1.39.407.75.75 0 01-1.025-.272zM9 10.5a3 3 0 116 0 3 3 0 01-6 0zm3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
      <path d="M12 1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 1.5zM5.25 6a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM1.5 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM12 16.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM21.75 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM6 16.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 016 16.5zM18.75 6a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM16.5 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" />
    </svg>
  ),
  Star: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
  ),
  Clock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
  ),
  ChartBar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
    </svg>
  ),
  Server: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path d="M4.08 5.227A3 3 0 016.979 3H17.02a3 3 0 012.9 2.227l2.113 7.926A5.228 5.228 0 0018.75 12H5.25a5.228 5.228 0 00-3.284 1.153L4.08 5.227z" />
      <path fillRule="evenodd" d="M5.25 13.5a3.75 3.75 0 100 7.5h13.5a3.75 3.75 0 100-7.5H5.25zm10.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5zm3.75-.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" clipRule="evenodd" />
    </svg>
  ),
  Cube: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className || "w-6 h-6"}>
      <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
    </svg>
  )
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
);

// Instance type icons
const getInstanceIcon = (type) => {
  switch (type) {
    case 'vscode':
      return <CustomIcon.Computer className="h-6 w-6" />;
    case 'jupyter':
      return <CustomIcon.Beaker className="h-6 w-6" />;
    case 'gpu':
      return <CustomIcon.Server className="h-6 w-6" />;
    case 'cpu':
      return <CustomIcon.Chip className="h-6 w-6" />;
    default:
      return <CustomIcon.Server className="h-6 w-6" />;
  }
};

// Instance card component
const InstanceCard = ({ instance, isLoading, onLaunch, isActive, activeMetrics }) => {
  const { theme } = useTheme();
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  
  const toggleFavorite = (e) => {
    e.stopPropagation();
    // Handle favorite toggling logic
  };
  
  const MetricBar = ({ label, value, color }) => (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-xs">{label}</span>
        <span className="text-xs">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${color}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
  
  return (
    <div 
      className={`${cardBg} rounded-lg shadow-md border ${borderColor} p-4 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="text-2xl mr-3">{getInstanceIcon(instance.type)}</div>
          <div>
            <h3 className="font-medium">{instance.name}</h3>
            <p className="text-xs text-gray-500">{instance.provider}</p>
          </div>
        </div>
        <button 
          className="text-gray-400 hover:text-yellow-500"
          onClick={toggleFavorite}
        >
          {/* Star icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-sm">{instance.specs}</p>
      </div>
      
      <div className="mb-4 grid grid-cols-2 gap-x-2 gap-y-1">
        <div className="text-xs">
          <span className="text-gray-500">CPUs:</span> {instance.cpus}
        </div>
        <div className="text-xs">
          <span className="text-gray-500">RAM:</span> {instance.ram}GB
        </div>
        {instance.vram && (
          <div className="text-xs">
            <span className="text-gray-500">VRAM:</span> {instance.vram}GB
          </div>
        )}
      </div>
      
      {isActive && activeMetrics && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Current Usage</h4>
          <MetricBar 
            label="CPU" 
            value={activeMetrics.cpu} 
            color="bg-blue-500" 
          />
          <MetricBar 
            label="Memory" 
            value={activeMetrics.memory} 
            color="bg-green-500" 
          />
          {activeMetrics.gpu !== null && (
            <MetricBar 
              label="GPU" 
              value={activeMetrics.gpu} 
              color="bg-purple-500" 
            />
          )}
        </div>
      )}
      
      <div className="mt-auto">
        <button
          onClick={() => onLaunch(instance)}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2
            ${isActive
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
            transition-colors duration-200
          `}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Launching...
            </>
          ) : isActive ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Open
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Launch
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default function HardwareSuite() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orgName, setOrgName] = useState('testing');
  const [activeInstances, setActiveInstances] = useState({});
  const [selectedType, setSelectedType] = useState('all');
  
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  
  // Wrap instances in useMemo to prevent it from being recreated on every render
  const instances = useMemo(() => [
    {
      id: 'vscode-small',
      name: 'VS Code Small',
      type: 'vscode',
      provider: 'AWS',
      cpus: 4,
      ram: 16,
      specs: 'Development environment with VS Code Server',
    },
    {
      id: 'jupyter-small',
      name: 'Jupyter Small',
      type: 'jupyter',
      provider: 'AWS',
      cpus: 4,
      ram: 16,
      specs: 'Jupyter Notebook environment for data analysis',
    },
    {
      id: 'a5000',
      name: 'NVIDIA A5000',
      type: 'gpu',
      provider: 'AWS',
      cpus: 8,
      ram: 32,
      vram: 24,
      specs: 'High-performance GPU for ML training',
    },
    {
      id: 'a6000',
      name: 'NVIDIA A6000',
      type: 'gpu',
      provider: 'AWS',
      cpus: 12,
      ram: 64,
      vram: 48,
      specs: 'Enterprise-grade GPU for large model training',
    },
    {
      id: 'cpu-inference',
      name: 'CPU Inference',
      type: 'cpu',
      provider: 'AWS',
      cpus: 16,
      ram: 32,
      specs: 'Optimized for CPU-based inference',
    }
  ], []);

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    if (hostname === "localhost" || subdomain === "dev") {
      setOrgName("testing");
    } else {
      setOrgName(subdomain);
    }
  }, []);
  
  const checkActiveInstances = useCallback(async () => {
    try {
      const response = await fetch(`/api/instances/active?org=${orgName}`);
      const data = await response.json();
      
      if (data.active) {
        // Update active instances with mock metrics for demo
        const activeWithMetrics = Object.fromEntries(
          Object.entries(data.active).map(([id, isActive]) => [
            id,
            {
              active: isActive,
              metrics: {
                cpu: Math.floor(Math.random() * 100),
                memory: Math.floor(Math.random() * 100),
                gpu: Math.floor(Math.random() * 100),
              }
            }
          ])
        );
        setActiveInstances(activeWithMetrics);
      }
    } catch (error) {
      console.error('Error checking active instances:', error);
    }
  }, [orgName]);

  useEffect(() => {
    // Check for active instances on component mount
    checkActiveInstances();
  }, [checkActiveInstances]);

  const launchInstance = async (instance) => {
    const instanceId = instance.id;
    setLoading(prev => ({ ...prev, [instanceId]: true }));
    setError('');
    setSuccess('');

    try {
      // Determine the endpoint based on instance type
      const endpoint = instance.type === 'vscode' 
        ? `/api/diy/${orgName}`
        : instance.type === 'jupyter'
          ? `/api/jupyter/${orgName}`
          : `/api/instances/${instanceId}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instanceId }),
      });

      if (response.status === 409) {
        // Instance exists, get URL from cookies
        const existingUrl = Cookies.get(`instance_${instanceId}`);
        if (existingUrl) {
          window.open(existingUrl, '_blank');
          setSuccess('Opened existing instance in new tab');
        } else {
          setError('Instance exists but URL has expired. Please stop the instance and try again.');
        }
      } else if (response.ok) {
        const data = await response.json();
        if (data.url) {
          // Store URL in cookies with expiration
          Cookies.set(`instance_${instanceId}`, data.url, { expires: 1 }); // 1 day expiration
          window.open(data.url, '_blank');
          setSuccess('Instance launched successfully!');
          
          // Update active instances
          setActiveInstances(prev => ({
            ...prev,
            [instanceId]: {
              active: true,
              metrics: {
                cpu: Math.floor(Math.random() * 100),
                memory: Math.floor(Math.random() * 100),
                gpu: instance.type === 'gpu' ? Math.floor(Math.random() * 100) : null,
              }
            }
          }));
        }
      } else {
        throw new Error('Failed to launch instance');
      }
    } catch (error) {
      console.error('Error launching instance:', error);
      setError('Failed to launch instance. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, [instanceId]: false }));
    }
  };

  const filteredInstances = useMemo(() => {
    return instances.filter(instance => {
      const matchesSearch = instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          instance.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          instance.specs.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || instance.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [instances, searchTerm, selectedType]);

  const getInstanceMetrics = (instanceId) => {
    return activeInstances[instanceId]?.metrics;
  };

  const isInstanceActive = (instanceId) => {
    return Boolean(activeInstances[instanceId]?.active);
  };

  // Make sure we have a function to handle search and filter
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const handleFilter = (type) => {
    setSelectedType(type);
  };

  return (
    <div className={`p-4 sm:p-6 md:p-8 ${bgColor} ${textColor} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Hardware Suite</h1>
            <p className="text-sm sm:text-base text-gray-500">Faster and easier training and deployments of state-of-the-art machine learning models.</p>
          </div>

          {/* Search and Filter - Define inline instead of using the component */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <input
                type="text"
                placeholder="Search instances..."
                className="w-full px-4 py-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <select 
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 w-full sm:w-auto"
              value={selectedType}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="vscode">VS Code</option>
              <option value="jupyter">Jupyter</option>
              <option value="gpu">GPU</option>
              <option value="cpu">CPU</option>
            </select>
          </div>
        </div>

        {/* Active Instances */}
        {Object.keys(activeInstances).length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Active Instances
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Object.entries(activeInstances).map(([id, data]) => {
                const instance = instances.find(i => i.id === id);
                return instance && (
                  <InstanceCard
                    key={instance.id}
                    instance={instance}
                    isLoading={loading[instance.id]}
                    onLaunch={launchInstance}
                    isActive={true}
                    activeMetrics={data.metrics}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Available Instances */}
        <div>
          <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Available Instances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredInstances.map((instance, index) => (
              <div 
                key={index}
                className={`
                  rounded-lg ${cardBg} border ${borderColor}
                  flex flex-col
                  h-full
                `}
              >
                {/* Card Header */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                        {getInstanceIcon(instance.type)}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{instance.name}</h3>
                        <p className="text-sm text-gray-500">{instance.provider}</p>
                      </div>
                    </div>
                  </div>

                  {/* Instance Specs */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <CustomIcon.Chip className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{instance.cpus} CPUs</span>
                      {instance.ram && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{instance.ram} RAM</span>
                        </>
                      )}
                    </div>
                    {instance.vram && (
                      <div className="flex items-center text-sm">
                        <CustomIcon.Cube className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{instance.vram} VRAM</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500">{instance.specs}</p>
                </div>

                {/* Card Footer */}
                <div className="mt-auto p-4 sm:p-6 pt-0 sm:pt-0">
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center">
                      <span className={`
                        w-2 h-2 rounded-full mr-2
                        ${isInstanceActive(instance.id)
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-gray-400'
                        }
                      `} />
                      <span className={
                        isInstanceActive(instance.id)
                          ? 'text-green-500'
                          : 'text-gray-500'
                      }>
                        {isInstanceActive(instance.id) ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {isInstanceActive(instance.id) && (
                      <span className="text-gray-500">
                        {/* You can add uptime or other metrics here */}
                        4h 23m uptime
                      </span>
                    )}
                  </div>

                  {/* Launch Button */}
                  <button
                    onClick={() => launchInstance(instance)}
                    disabled={loading[instance.id]}
                    className={`
                      w-full py-2 px-4 rounded-lg font-medium
                      ${loading[instance.id]
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }
                      transition-colors duration-200
                    `}
                  >
                    {loading[instance.id] ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Launching...
                      </div>
                    ) : (
                      'Launch Instance'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
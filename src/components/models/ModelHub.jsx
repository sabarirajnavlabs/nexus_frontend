'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';

export default function ModelHub() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAPIKey, setShowAPIKey] = useState(false);
  const [filter, setFilter] = useState('All Models');
  const [apiKey, setApiKey] = useState('');
  const [isLoadingKey, setIsLoadingKey] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [availableModels, setAvailableModels] = useState([]);
  
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  
  // Helper function to determine provider from model ID
  const getProviderFromModel = (modelId) => {
    if (modelId.includes('gpt')) return 'OpenAI';
    if (modelId.includes('claude')) return 'Anthropic';
    if (modelId.includes('gemini')) return 'Google';
    if (modelId.includes('llama')) return 'Meta';
    return 'Unknown Provider';
  };
  
  // Process models data into card format with icons and descriptions
  const processModelsData = (modelsData) => {
    const modelGroups = {};
    
    // Group models by provider
    modelsData.forEach(model => {
      const provider = getProviderFromModel(model.id);
      if (!modelGroups[provider]) {
        modelGroups[provider] = [];
      }
      modelGroups[provider].push(model.id);
    });
    
    // Create cards for each provider group
    return [
      {
        id: 1,
        name: 'OpenAI GPT Models',
        description: 'State-of-the-art language models from OpenAI',
        icon: '🤖',
        type: 'access',
        provider: 'OpenAI',
        models: modelGroups['OpenAI'] || []
      },
      {
        id: 2,
        name: 'Anthropic Claude Models',
        description: 'Efficient and powerful models from Anthropic',
        icon: '🧠',
        type: 'access',
        provider: 'Anthropic',
        models: modelGroups['Anthropic'] || []
      },
      {
        id: 3,
        name: 'Google Gemini Models',
        description: 'High-performance AI models by Google',
        icon: '🚀',
        type: 'access',
        provider: 'Google',
        models: modelGroups['Google'] || []
      },
      {
        id: 4,
        name: 'Meta Llama Models',
        description: 'Open-source large language models from Meta AI',
        icon: '🦙',
        type: 'explore',
        provider: 'Meta',
        models: modelGroups['Meta'] || []
      },
      {
        id: 5,
        name: 'DeepSeek Models',
        description: 'Advanced open-source AI models for various tasks',
        icon: '🔍',
        type: 'explore',
        provider: 'DeepSeek',
        models: modelGroups['Unknown Provider'] || []
      },
      {
        id: 6,
        name: 'Huggingface Models',
        description: 'Community-driven open-source models and tools',
        icon: '🤗',
        type: 'explore',
        provider: 'Huggingface',
        models: modelGroups['Huggingface'] || []
      }
    ];
  };
  
  // Fetch API key from LiteLLM server
  const fetchAPIKey = useCallback(async () => {
    setIsLoadingKey(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_2}/nexus/v1/key`,
        {
          method: 'GET',
          headers: {
            Token: Cookies.get('__session') || '',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setApiKey(data.api_key || '••••••••••••••••••••••••••••••••••');
    } catch (error) {
      console.error('Failed to fetch API key:', error);
      setErrorMessage('Failed to load API key. Please try again.');
      setApiKey('••••••••••••••••••••••••••••••••••');
    } finally {
      setIsLoadingKey(false);
    }
  }, []);
  
  // Fetch available models
  const fetchModels = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_2}/nexus/v1/models`,
        {
          method: 'GET',
          headers: {
            Token: Cookies.get('__session') || '',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Process models into card format
      const processedModels = processModelsData(data.data);
      setAvailableModels(processedModels);
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
  }, []);
  
  useEffect(() => {
    fetchAPIKey();
    fetchModels();
  }, [fetchAPIKey, fetchModels]);
  
  // Clear status messages after 5 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);
  
  // Update API Key
  const updateAPIKey = async () => {
    setIsLoadingKey(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_2}/nexus/v1/key/regenerate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Token: Cookies.get('__session') || '',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setApiKey(data.api_key || 'API Key not available');
      setSuccessMessage('API Key updated successfully!');
    } catch (error) {
      console.error('Failed to update API key:', error);
      setErrorMessage('Failed to update API key. Please try again.');
    } finally {
      setIsLoadingKey(false);
    }
  };
  
  // Copy API key to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setSuccessMessage('API Key copied to clipboard!');
    } catch (err) {
      setErrorMessage('Failed to copy to clipboard');
      console.error('Failed to copy: ', err);
    }
  };
  
  // Filter models based on search and filter criteria
  const filteredModels = availableModels
    .filter(model => 
      (filter === 'All Models' || model.provider === filter) &&
      (searchQuery.trim() === '' || 
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.models.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  
  return (
    <div className={`p-4 sm:p-6 md:p-8 ${bgColor} ${textColor} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Model Hub</h1>
            <p className="text-sm sm:text-base text-gray-500">Access and manage your AI models through LiteLLM integration.</p>
          </div>
        </div>

        {/* Status Messages */}
        {successMessage && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-100 text-green-700 rounded-lg flex items-center text-sm sm:text-base">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 text-red-700 rounded-lg flex items-center text-sm sm:text-base">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            {errorMessage}
          </div>
        )}

        {/* API Key Management */}
        <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-lg ${cardBg} border ${borderColor}`}>
          <div className="mb-4 flex items-center">
            <div className="w-5 h-5 mr-2 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold">API Key Management</h2>
          </div>
          
          <div className="mb-2">
            <p className="text-sm mb-1">Your Nexus API Key</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                type={showAPIKey ? 'text' : 'password'}
                value={isLoadingKey ? 'Loading...' : apiKey}
                readOnly
                className={`flex-grow p-2 rounded border ${borderColor} ${inputBg} ${textColor} text-sm`}
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAPIKey(!showAPIKey)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                  disabled={isLoadingKey}
                >
                  {showAPIKey ? 'Hide' : 'Show'}
                </button>
                <button
                  className="px-4 py-2 text-white rounded bg-gray-500 hover:bg-gray-600 transition flex items-center text-sm"
                  onClick={copyToClipboard}
                  disabled={isLoadingKey}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center text-sm ${isLoadingKey ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={updateAPIKey}
              disabled={isLoadingKey}
            >
              {isLoadingKey ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Update API Key
                </>
              )}
            </button>
            
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center justify-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Increase Limits
            </button>
          </div>
          
          <div className="mt-4 text-xs sm:text-sm text-gray-500">
            <p>Use this API key to access LiteLLM services from external applications. Keep this key secure!</p>
          </div>
        </div>
        
        {/* Model Search and Filter */}
        <div className={`mb-6 flex flex-col sm:flex-row gap-3`}>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full p-2 pl-10 rounded-lg border ${borderColor} ${inputBg} ${textColor} text-sm`}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`p-2 rounded-lg border ${borderColor} ${inputBg} ${textColor} text-sm`}
          >
            <option>All Models</option>
            <option>OpenAI</option>
            <option>Anthropic</option>
            <option>Google</option>
            <option>Meta</option>
            <option>DeepSeek</option>
            <option>Huggingface</option>
          </select>
        </div>
        
        {/* Model Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredModels.map(model => (
            <div key={model.id} className={`rounded-lg ${cardBg} border ${borderColor} overflow-hidden shadow-sm hover:shadow-md transition`}>
              <div className="p-4 sm:p-6">
                <div className="text-3xl sm:text-4xl mb-4">{model.icon}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{model.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{model.description}</p>
                
                {model.models.length > 0 && (
                  <div className="text-xs sm:text-sm text-gray-500 mb-3">
                    <span className="font-medium">{model.models.length}</span> models available
                  </div>
                )}
                
                <button 
                  className={`w-full py-2 px-4 rounded text-white text-sm ${
                    model.type === 'access' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                  } transition`}
                >
                  {model.type === 'access' ? 'Access Models' : 'Explore Models'}
                </button>
              </div>
            </div>
          ))}
          
          {filteredModels.length === 0 && (
            <div className={`col-span-full p-6 sm:p-8 text-center ${cardBg} rounded-lg border ${borderColor}`}>
              <div className="text-3xl sm:text-4xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No models found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
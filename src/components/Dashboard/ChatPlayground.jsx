'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';

export default function ChatPlayground() {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const chatContainerRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  
  // Fetch available models on component mount
  useEffect(() => {
    fetchModels();
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowModelDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  
  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);
  
  // Fetch available models from LiteLLM proxy server
  const fetchModels = async () => {
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
      
      // Map the models into our format with name and provider
      const formattedModels = data.data.map((model) => {
        const provider = getProviderFromModel(model.id);
        return {
          name: model.id,
          provider: provider
        };
      });
      
      setAvailableModels(formattedModels);
      
      // Set first model as default if we have models and none is selected
      if (formattedModels.length > 0 && !selectedModel) {
        setSelectedModel(formattedModels[0].name);
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
  };
  
  // Helper function to determine provider from model ID
  const getProviderFromModel = (modelId) => {
    if (modelId.includes('gpt')) return 'OpenAI';
    if (modelId.includes('claude')) return 'Anthropic';
    if (modelId.includes('gemini')) return 'Google';
    if (modelId.includes('llama')) return 'Meta';
    return 'Unknown Provider';
  };
  
  // Send message to LiteLLM proxy server
  const sendMessage = async () => {
    if (message.trim() === '' || isLoading) return;
    
    setIsLoading(true);
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Add an empty assistant message that will be updated as the stream comes in
    let assistantMessageIndex;
    setChatHistory(prev => {
      assistantMessageIndex = prev.length;
      return [...prev, { 
        role: 'assistant', 
        content: '', 
        timestamp: new Date(),
        isStreaming: true
      }];
    });
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_2}/nexus/v1/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Token: Cookies.get('__session') || '',
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: 'user',
                content: userMessage.content,
              },
            ],
            stream: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let partialMessage = '';
      let fullMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        partialMessage += chunk;

        const lines = partialMessage.split('\n');
        partialMessage = lines.pop();

        for (const line of lines) {
          if (!line.trim() || line === 'data: [DONE]') continue;
          try {
            const json = JSON.parse(line.replace(/^data:\s*/, ''));
            const content = json.choices[0]?.delta?.content;
            if (content) {
              fullMessage += content;

              setChatHistory(prev => {
                const updatedMessages = [...prev];
                updatedMessages[assistantMessageIndex] = {
                  ...updatedMessages[assistantMessageIndex],
                  content: fullMessage,
                };
                return updatedMessages;
              });
            }
          } catch (err) {
            console.error('Error parsing JSON chunk:', err);
          }
        }
      }
      
      // Mark the message as complete (no longer streaming)
      setChatHistory(prev => {
        const updatedMessages = [...prev];
        if (updatedMessages[assistantMessageIndex]) {
          updatedMessages[assistantMessageIndex] = {
            ...updatedMessages[assistantMessageIndex],
            isStreaming: false,
          };
        }
        return updatedMessages;
      });
      
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add an error message
      setChatHistory(prev => {
        const updatedMessages = [...prev];
        if (updatedMessages[assistantMessageIndex]) {
          updatedMessages[assistantMessageIndex] = {
            ...updatedMessages[assistantMessageIndex],
            content: 'Sorry, there was an error connecting to the AI service. Please try again.',
            isError: true,
            isStreaming: false,
          };
        }
        return updatedMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle Enter key to send message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const models = availableModels.length > 0 ? availableModels : [
    { name: 'gpt-4', provider: 'OpenAI' },
    { name: 'claude-3-haiku-20240307', provider: 'Anthropic' },
    { name: 'gemini-pro', provider: 'Google' },
    { name: 'llama3-8b-8192', provider: 'Meta' }
  ];
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="p-4">
          <h1 className="text-3xl font-bold">Chat Playground</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Interact with AI models through LiteLLM integration
          </p>

          {/* Model Selector */}
          <div className="mt-4">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={`w-full sm:w-auto p-2 rounded-lg border ${borderColor} ${cardBg} ${textColor}`}
            >
              {models.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name} ({model.provider})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 min-h-0">
        <div className={`h-full rounded-lg border ${borderColor} ${cardBg} flex flex-col`}>
          {/* Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto min-h-0"
          >
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="text-6xl mb-6">💬</div>
                <h3 className="text-xl font-semibold mb-3">Start a conversation</h3>
                <p className="text-center max-w-md">
                  Select a model and start chatting to see AI-generated responses.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-4 ${
                      chat.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : `${cardBg} border ${borderColor} ${chat.isError ? 'border-red-500' : ''}`
                    }`}>
                      <div className="text-sm">
                        {chat.content}
                        {chat.isStreaming && (
                          <span className="inline-block ml-1 w-2 h-4 bg-gray-400 dark:bg-gray-600 animate-pulse"></span>
                        )}
                      </div>
                      <div className={`text-xs mt-2 ${chat.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className={`border-t ${borderColor} p-4 flex-shrink-0`}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 p-2 rounded-lg border ${borderColor} ${cardBg} ${textColor}`}
              />
              <button
                onClick={sendMessage}
                disabled={message.trim() === '' || isLoading}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
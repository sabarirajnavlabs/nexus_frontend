'use client';

import ChatPlayground from '@/components/Dashboard/ChatPlayground';
import ChatPage from '@/components/Dashboard/ChatPage';
import { useState } from 'react';

export default function ChatPageContainer() {
  // Default to gpt-4 as the initial model
  const defaultModel = 'gpt-4';
  
  // For toggling between different chat components during debugging
  // Set to false to use the upgraded ChatPlayground component
  const useSimpleChat = false;
  
  return useSimpleChat ? 
    <ChatPage model={defaultModel} /> : 
    <ChatPlayground />;
} 
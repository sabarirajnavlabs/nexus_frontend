'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import ChatPlayground from '@/components/Dashboard/ChatPlayground';
import ChatPage from '@/components/Dashboard/ChatPage';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useConfig } from '@/components/config-provider';

export default function ChatPageContainer() {
  // Default to gpt-4 as the initial model
  const defaultModel = 'gpt-4';
  const { theme } = useTheme();
  const { textColor } = useConfig();
  
  // For toggling between different chat components during debugging
  // Set to false to use the upgraded ChatPlayground component
  const useSimpleChat = false;
  
  return (
    <>
      <SignedIn>
    <div 
      className={`w-full h-full ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
      style={{ color: theme === 'dark' ? 'white' : 'inherit' }}
    >
      {useSimpleChat ? 
        <ChatPage model={defaultModel} /> : 
        <ChatPlayground />}
    </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/sign-in" />
      </SignedOut>
    </>
  );
} 
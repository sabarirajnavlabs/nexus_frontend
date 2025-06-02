'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import { useConfig } from '@/components/config-provider';
import { useTheme } from 'next-themes';

// Disable SSR for the ModelHub component and add loading state
const ModelHub = dynamic(() => import('@/components/models/ModelHub'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
});

export default function ModelHubPage() {
  const { backgroundColor } = useConfig();
  const { theme } = useTheme();
  
  return (
    <>
      <SignedIn>
        <div 
          className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} 
          style={{ 
            backgroundColor,
            color: theme === 'dark' ? 'white' : 'inherit'
          }}
        >
          <ModelHub />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/sign-in" />
      </SignedOut>
    </>
  );
} 
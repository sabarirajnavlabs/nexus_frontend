'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import { useConfig } from '@/components/config-provider';
import { useTheme } from 'next-themes';

const DashboardPage = dynamic(() => import('@/components/Dashboard/DashboardPage'), {
  ssr: false
});

export default function Dashboard() {
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
      <DashboardPage />
    </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/sign-in" />
      </SignedOut>
    </>
  );
} 
'use client';

import dynamic from 'next/dynamic';
import { useConfig } from '@/components/config-provider';
import { useTheme } from 'next-themes';

const HardwareSuite = dynamic(() => import('@/components/Dashboard/HardwareSuite'), {
  ssr: false
});

export default function HardwareSuitePage() {
  const { backgroundColor } = useConfig();
  const { theme } = useTheme();
  
  return (
    <div 
      className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} 
      style={{ 
        backgroundColor,
        color: theme === 'dark' ? 'white' : 'inherit'
      }}
    >
      <HardwareSuite />
    </div>
  );
} 
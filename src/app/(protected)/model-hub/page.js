'use client';

import dynamic from 'next/dynamic';
import { useConfig } from '@/components/config-provider';
import { useTheme } from 'next-themes';

const ModelHub = dynamic(() => import('@/components/models/ModelHub'), {
  ssr: false
});

export default function ModelHubPage() {
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
      <ModelHub />
    </div>
  );
} 
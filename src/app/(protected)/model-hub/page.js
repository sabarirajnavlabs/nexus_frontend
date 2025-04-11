'use client';

import dynamic from 'next/dynamic';
import { useConfig } from '@/components/config-provider';

const ModelHub = dynamic(() => import('@/components/models/ModelHub'), {
  ssr: false
});

export default function ModelHubPage() {
  const { backgroundColor } = useConfig();
  
  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <ModelHub />
    </div>
  );
} 
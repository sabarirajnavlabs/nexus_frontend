'use client';

import dynamic from 'next/dynamic';
import { useConfig } from '@/components/config-provider';

const HardwareSuite = dynamic(() => import('@/components/Dashboard/HardwareSuite'), {
  ssr: false
});

export default function HardwareSuitePage() {
  const { backgroundColor } = useConfig();
  
  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <HardwareSuite />
    </div>
  );
} 
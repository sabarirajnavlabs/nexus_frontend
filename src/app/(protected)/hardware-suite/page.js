'use client';

import dynamic from 'next/dynamic';

const HardwareSuite = dynamic(() => import('@/components/Dashboard/HardwareSuite'), {
  ssr: false
});

export default function HardwareSuitePage() {
  return (
    <div className="min-h-screen">
      <HardwareSuite />
    </div>
  );
} 
'use client';

import dynamic from 'next/dynamic';
import { useConfig } from '@/components/config-provider';

const DashboardPage = dynamic(() => import('@/components/Dashboard/DashboardPage'), {
  ssr: false
});

export default function Dashboard() {
  const { backgroundColor } = useConfig();
  
  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <DashboardPage />
    </div>
  );
} 
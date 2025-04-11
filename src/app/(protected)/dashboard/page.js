'use client';

import dynamic from 'next/dynamic';

const DashboardPage = dynamic(() => import('@/components/Dashboard/DashboardPage'), {
  ssr: false
});

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <DashboardPage />
    </div>
  );
} 
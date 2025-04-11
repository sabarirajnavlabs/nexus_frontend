'use client';

import dynamic from 'next/dynamic';

const ModelHub = dynamic(() => import('@/components/models/ModelHub'), {
  ssr: false
});

export default function ModelHubPage() {
  return (
    <div className="min-h-screen">
      <ModelHub />
    </div>
  );
} 
'use client';

import Sidebar from '@/components/MainPage/Sidebar';

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-2 px-2 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
} 
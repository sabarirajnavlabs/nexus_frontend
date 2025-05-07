import Sidebar from '@/components/MainPage/Sidebar';

export default function ExploreLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 bg-gray-50">
        {children}
      </main>
    </div>
  );
} 
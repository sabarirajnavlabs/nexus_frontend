import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightOnRectangleIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useClerk } from '@clerk/nextjs';
import Link from 'next/link';

const sidebarItems = [
  { key: 'organizations', label: 'Organizations', icon: '🏢' },
  { key: 'invites', label: 'User Invitations', icon: '✉️' },
];

export default function AdminSidebar({ selected, onSelect }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();

  // Close mobile menu when selection changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [selected]);

  const handleLogout = async () => {
    localStorage.removeItem('adminSession');
    await signOut();
    router.push('/sign-in');
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 right-0 left-0 h-16 z-[100] bg-[#0A1628]">
        <div className="h-full px-4 flex justify-between items-center">
          <span className="flex items-center space-x-2">
            <img src="/NavigateLabs-CIR.png" alt=""  className='w-10 h-10'/>
            <span className="text-xl font-semibold text-white">Admin</span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 lg:hidden
          ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0A1628] text-white z-[95]
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 hidden lg:block">
          <span className="flex items-center space-x-2">
            <img src="/NavigateLabs-CIR.png" alt=""  className='w-10 h-10'/>
            <span className="text-xl font-semibold">Admin</span>
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 mt-16 lg:mt-0">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => onSelect(item.key)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                    selected === item.key
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Switch to Admin (disabled in admin sidebar) */}
        <div className="p-4 border-t border-gray-700">
          <Link
            className="w-full flex items-center space-x-3 px-2 py-3 rounded-lg bg-blue-600"
            href="/dashboard"
          >
            <HomeIcon className="w-6 h-6" />
            <span>Switch to Dashboard</span>
          </Link>
        </div>
        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
} 
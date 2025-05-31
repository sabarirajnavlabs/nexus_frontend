'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { UserButton, useClerk, useUser, useAuth } from '@clerk/nextjs';
import { ChevronDownIcon, ChevronUpIcon, BookOpenIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, ComputerDesktopIcon, Squares2X2Icon, AcademicCapIcon, ClipboardDocumentListIcon, PuzzlePieceIcon, UsersIcon, ArrowRightOnRectangleIcon, HomeIcon, WindowIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  useEffect(() => {
    const checkRole = async () => {
      if (!user) return;
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data && (data.role === 'admin' || data.role === 'super_admin')) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkRole();
  }, [user, getToken]);
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <HomeIcon className="w-6 h-6" /> },
    { name: 'Model Hub', path: '/model-hub', icon: <BookOpenIcon className="w-6 h-6" /> },
    { name: 'Hardware Suite', path: '/hardware-suite', icon: <ComputerDesktopIcon className="w-6 h-6" /> },
    { name: 'Chat', path: '/chat', icon: <ChatBubbleLeftRightIcon className="w-6 h-6" /> },
  ];

  const exploreItems = [
    { name: 'Courses', path: '/explore/courses', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: 'Learning Paths', path: '/explore/learning-paths', icon: <AcademicCapIcon className="w-5 h-5" /> },
    { name: 'Practice', path: '/explore/practice', icon: <PuzzlePieceIcon className="w-5 h-5" /> },
    { name: 'Assessments', path: '/explore/assessments', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
    { name: 'Mock Interviews', path: '/explore/mock-interviews', icon: <UsersIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 right-0 left-0 h-16 z-[100] bg-[#0A1628]">
        <div className="h-full px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
           <img src="/NavigateLabs-CIR.png" alt="" srcset="" className='w-10 h-10'/>
            <span className="text-xl font-semibold text-white">Nexus AI</span>
          </Link>
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
          <Link href="/" className="flex items-center space-x-2">
            <img src="/NavigateLabs-CIR.png" alt="" srcset="" className='w-10 h-10'/>
            <span className="text-xl font-semibold">Nexus AI</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 mt-16 lg:mt-0">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
            {/* Explore Section */}
            <li>
              <button
                onClick={() => setIsExploreOpen((v) => !v)}
                className={`flex items-center w-full space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-700 ${pathname.startsWith('/explore') ? 'bg-blue-600 text-white' : ''}`}
              >
                <Squares2X2Icon className="w-6 h-6" />
                <span>Explore</span>
                <span className="ml-auto">{isExploreOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}</span>
              </button>
              {isExploreOpen && (
                <ul className="ml-8 mt-2 space-y-1">
                  {exploreItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-2 px-2 py-2 rounded-lg transition-colors ${
                          pathname === item.path
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* End Explore Section */}
            <li>
              <a
                href="https://dify.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === '/ai-app-builder'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <WindowIcon className="w-6 h-6" />
                <span>AI App Builder</span>
              </a>
            </li>
            <li>
              <Link
                href="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === '/settings'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Cog6ToothIcon className="w-6 h-6" />
                <span>Settings</span>
              </Link>
            </li>
           
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4">
           {/* Switch to Admin Button (only for admin/super_admin) */}
           {isAdmin && (
              <div className="p-2 border-t border-gray-700">
              <Link
                className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg bg-blue-600"
                href="/nexus-admin/dashboard"
              >
                <ShieldCheckIcon className="w-6 h-6" />
                <span>Switch to Admin</span>
              </Link>
            </div>
            )}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              signOut();
            }}
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
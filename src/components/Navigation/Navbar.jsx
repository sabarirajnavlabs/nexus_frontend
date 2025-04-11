'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊'
    },
    {
      name: 'Model Hub',
      href: '/model-hub',
      icon: '🤖'
    },
    {
      name: 'Hardware Suite',
      href: '/hardware-suite',
      icon: '💻'
    },
    {
      name: 'Chat',
      href: '/chat',
      icon: '💬'
    },
    {
      name: 'Datasets',
      href: '/datasets',
      icon: '📁'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: '📈'
    },
    {
      name: 'Team',
      href: '/team',
      icon: '👥'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: '⚙️'
    }
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Navigation Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-[280px] z-[95]
          bg-gray-900 text-white
          border-r border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="p-4 flex items-center space-x-3">
          <div className="w-8 h-8">
            <Image
              src="/brain-icon.png"
              alt="Nexus AI Logo"
              width={32}
              height={32}
            />
          </div>
          <span className="text-xl font-bold">Nexus AI</span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                flex items-center px-4 py-3 mx-2 rounded-lg
                transition-colors duration-200
                ${isActive(item.href)
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-800 hover:text-white'}
              `}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-800">
          <Link
            href="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`
              flex items-center px-4 py-3 rounded-lg mb-2
              bg-blue-500 text-white
              hover:bg-blue-600 transition-colors duration-200
            `}
          >
            <span className="text-xl mr-3">👑</span>
            <span className="font-medium">Switch to Admin</span>
          </Link>

          <Link
            href="/logout"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <span className="text-xl mr-3">🚪</span>
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 lg:hidden
          ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 right-0 left-0 h-16 z-[100] bg-transparent">
        <div className="absolute right-4 top-4">
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

      {/* Main Content */}
      <main className="flex-1 lg:ml-[280px]">
        {/* Your page content goes here */}
      </main>
    </div>
  );
} 
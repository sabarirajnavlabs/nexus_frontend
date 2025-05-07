'use client';

import { usePathname } from 'next/navigation';
import { useConfig } from '@/components/config-provider';
import { useEffect } from 'react';

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const { orgName, favicon } = useConfig();
  
  // Ensure we're in an auth route
  const isAuthRoute = pathname?.includes('sign-in') || pathname?.includes('sign-up');

  // Set page title and favicon dynamically
  useEffect(() => {
    if (isAuthRoute) {
      // Update page title
      document.title = `${orgName} - Sign In`;
      
      // Update favicon
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = favicon;
      }
    }
  }, [isAuthRoute, orgName, favicon]);

  if (!isAuthRoute) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#e9f6fe]">
      {children}
    </div>
  );
} 
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConfig } from '@/components/config-provider';

export default function SignUpPage() {
  const router = useRouter();
  const { primaryColor, textColor } = useConfig();

  useEffect(() => {
    // Redirect to sign-in after a short delay
    const timer = setTimeout(() => {
      router.push('/sign-in');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

    return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
          Invite-Only Access
        </h1>
        <p className="text-gray-600 mb-6">
          This platform is invite-only. Please contact your administrator for access.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to sign-in page...
        </p>
      </div>
    </div>
  );
} 
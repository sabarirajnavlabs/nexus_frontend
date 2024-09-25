'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null;
  }

  return <div>Protected content</div>;
}

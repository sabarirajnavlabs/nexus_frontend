'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@clerk/nextjs';

export default function SsoCallback() {
  const router = useRouter();
  const { isLoaded, session } = useSession();

  useEffect(() => {
    if (isLoaded && session) {
      router.push('/dashboard');
    }
  }, [isLoaded, session, router]);

  return <div>
    <h1>Logging in...</h1>
  </div>;
}
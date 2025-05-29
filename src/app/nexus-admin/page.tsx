'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useConfig } from '@/components/config-provider';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    logoCirclePath,
    orgName,
    primaryColor,
    secondaryColor,
    backgroundColor,
    textColor
  } = useConfig();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'nexusadmin@ulabsai.com' && password === 'nexusadmin@123') {
      // Store admin session
      localStorage.setItem('adminSession', 'true');
      router.push('/nexus-admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor }}>
      {/* Decorative elements */}
      <div className="absolute top-[-5%] left-[5%] w-[150px] h-[250px] rounded-[40px] opacity-20 -z-0" style={{ backgroundColor: 'rgba(178, 212, 240, 0.8)' }}></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30 -z-0" style={{ backgroundColor: 'rgba(157, 202, 235, 0.8)' }}></div>
      <div className="z-10 w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <Image src={logoCirclePath} alt={orgName} width={48} height={48} />
          <span style={{ color: textColor }} className="text-2xl font-bold">{orgName}</span>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: textColor }}>Admin Login</h2>
        <p className="text-gray-500 mb-6 text-center">Sign in to access the admin dashboard</p>
        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white font-semibold"
            style={{ background: primaryColor, transition: 'background 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.background = secondaryColor)}
            onMouseOut={e => (e.currentTarget.style.background = primaryColor)}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
} 
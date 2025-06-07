import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { ConfigProvider } from '../components/config-provider';
import { useConfig } from '../components/config-provider';

const inter = Inter({ subsets: ['latin'] });

// Dynamic metadata - will be set in page level now
export const metadata = {
  title: 'Nexus AI Platform',
  description: 'AI development and model management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#0F172A',
            },
          }}
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            forcedTheme="light"
            disableTransitionOnChange
          >
            <ConfigProvider>
              {children}
            </ConfigProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

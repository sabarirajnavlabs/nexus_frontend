import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Only allow unauthenticated access to sign-in, sign-up, and nexus-admin routes
const PUBLIC_ROUTES = [
  '/',
  '/sign-in',
  '/sign-in/(.*)',
  '/sign-up',
  '/sign-up/(.*)',
  '/nexus-admin',
  '/nexus-admin/(.*)',
  '/api/public/(.*)',
  '/_next/(.*)',
  '/favicon.ico',
  '/manifest.json'
];

// More specific public routes with better pattern matching
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: PUBLIC_ROUTES,
  // Routes that can always be accessed
  ignoredRoutes: [
    '/api/public/(.*)',
    '/_next/(.*)',
    '/favicon.ico',
    '/manifest.json'
  ],
  // Custom handling of unauthorized access and debug logging
  afterAuth(auth, req, evt) {
    try {
      // If user is signed in and trying to access auth pages, redirect to dashboard
      if (auth.userId && 
          !req.nextUrl.pathname.startsWith('/nexus-admin') && 
          (req.nextUrl.pathname === '/' || 
           req.nextUrl.pathname.startsWith('/sign-in') || 
           req.nextUrl.pathname.startsWith('/sign-up'))) {
        const dashboardUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(dashboardUrl);
      }

      // If user is not signed in and trying to access protected routes, redirect to sign-in
      if (!auth.userId && 
          !PUBLIC_ROUTES.some(route => {
            const pattern = new RegExp(`^${route.replace(/\*/g, '.*')}$`);
            return pattern.test(req.nextUrl.pathname);
          }) &&
          !req.nextUrl.pathname.startsWith('/api/')) {
        const signInUrl = new URL('/sign-in', req.url);
        return NextResponse.redirect(signInUrl);
      }

      // Let Clerk handle the auth check using publicRoutes configuration
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      // In case of error, allow the request to proceed
      return NextResponse.next();
    }
  }
});

// More specific matcher with better file type exclusions
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
}; 
import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Only allow unauthenticated access to sign-in, sign-up, and nexus-admin routes
const PUBLIC_ROUTES = [
  '/sign-in',
  '/sign-in/(.*)',
  '/sign-up',
  '/sign-up/(.*)',
  '/nexus-admin',
  '/nexus-admin/(.*)'
];

// More specific public routes with better pattern matching
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: PUBLIC_ROUTES,
  // Routes that can always be accessed
  ignoredRoutes: ['/api/public'],
  // Custom handling of unauthorized access and debug logging
  afterAuth(auth, req, evt) {
    console.log('Middleware: Starting processing', {
      url: req.url,
      method: req.method,
      userId: auth.userId || 'not authenticated'
    });

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
        !PUBLIC_ROUTES.some(route => req.nextUrl.pathname.startsWith(route)) &&
        !req.nextUrl.pathname.startsWith('/api/')) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Let Clerk handle the auth check using publicRoutes configuration
    return NextResponse.next();
  }
});

// More specific matcher with better file type exclusions
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}; 
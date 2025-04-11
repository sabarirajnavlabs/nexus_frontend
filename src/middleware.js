import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Define public routes as a constant so it can be reused
const PUBLIC_ROUTES = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/super-admin/sign-in(.*)'
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

    // Check if the route is public
    const isPublicRoute = PUBLIC_ROUTES.some(pattern => 
      new RegExp(`^${pattern.replace(/\*/g, '.*')}$`).test(req.nextUrl.pathname)
    );

    console.log('Middleware: Checking if public route', {
      isPublicRoute,
      pathname: req.nextUrl.pathname
    });

    if (!isPublicRoute && !auth.userId) {
      console.log('Middleware: Unauthorized access attempt, redirecting to sign-in');
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    console.log('Middleware: ' + (auth.userId ? 'Authenticated access to protected route' : 'Access to public route'));
    console.log('Middleware: Proceeding to next middleware/route');
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
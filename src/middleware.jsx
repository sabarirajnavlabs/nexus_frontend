import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/super-admin/sign-in(.*)']);

export default clerkMiddleware((auth, request) => {
  const { userId } = auth();

  console.log('Middleware: Starting processing', {
    url: request.url,
    method: request.method,
    userId: userId || 'not authenticated'
  });

  console.log('Middleware: Checking if public route', {
    isPublicRoute: isPublicRoute(request)
  });

  if (!isPublicRoute(request)) {
    if (!userId) {
      console.log('Middleware: Unauthorized access attempt, redirecting to sign-in');
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    console.log('Middleware: Authenticated access to protected route');
  } else {
    console.log('Middleware: Access to public route');
  }

  console.log('Middleware: Proceeding to next middleware/route');
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
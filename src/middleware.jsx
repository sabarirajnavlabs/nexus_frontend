import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/super-admin/sign-in(.*)']);

export default clerkMiddleware((auth, request) => {

  const { userId } = auth();



  console.log('Middleware: Before isPublicRoute check', { 
    url: request.url, 
    userId, 
    isPublicRoute: isPublicRoute(request) 
  });


  if (!isPublicRoute(request)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }


  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

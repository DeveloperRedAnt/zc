import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = (path: string) => {
  // Protect root path and dashboard routes
  return path === '/' || path.startsWith('/dashboard');
};

const isAuthPage = (path: string) => {
  return path.startsWith('/sign-in') || path.startsWith('/sign-up');
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // // Handle protected routes
  if (isProtectedRoute(pathname)) {
    const token = await getToken({ req: request });

    // Redirect to sign-in if not authenticated
    if (!token) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(signInUrl);
    }
  }

  // Handle auth pages (optional: redirect to dashboard if already signed in)
  if (isAuthPage(pathname)) {
    const token = await getToken({ req: request });

    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
};

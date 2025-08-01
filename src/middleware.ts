import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const DASHBOARD = '/dashboard';
const SIGN_IN = '/sign-in';
const SELECT_ORG = '/login/select-organization';
const STORE_ADD = '/login/add-store';

const isProtected = (p: string) =>
  p === '/' ||
  p.startsWith(DASHBOARD) ||
  p.startsWith(SELECT_ORG) ||
  p.startsWith('/login/add-store') ||
  p.startsWith('/login/add-organization');

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  const url = req.nextUrl;
  const path = url.pathname;
  const token = await getToken({ req });
  const flex = req.cookies.get('flex')?.value;

  if (token) {
    if (flex === 'dashboard') {
      if (
        path === '/' ||
        path === SIGN_IN ||
        path.startsWith(SELECT_ORG) ||
        path.startsWith(STORE_ADD)
      ) {
        return NextResponse.redirect(url.origin + DASHBOARD);
      }
    } else if (flex === 'select-organization') {
      if (path === '/' || path === SIGN_IN) {
        return NextResponse.redirect(url.origin + SELECT_ORG);
      }
    } else if (flex === 'add-store') {
      if (path === '/' || path === SIGN_IN || path !== STORE_ADD) {
        return NextResponse.redirect(url.origin + STORE_ADD);
      }
    }

    return NextResponse.next();
  }

  if (isProtected(path)) {
    const dest = `${url.origin}${SIGN_IN}?callbackUrl=${encodeURIComponent(req.url)}`;
    return NextResponse.redirect(dest);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next|_vercel|monitoring|api/auth|.*\\..*).*)',
};

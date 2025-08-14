import { NextResponse } from 'next/server';

// This route is deprecated, redirect to /api/devices for listing
export async function GET() {
  return NextResponse.redirect(
    new URL('/api/devices', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
  );
}

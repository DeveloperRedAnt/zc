'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const NextTopLoader = dynamic(() => import('nextjs-toploader'), { ssr: false });
const Toaster = dynamic(() => import('@/components/sonner/sonner').then((mod) => mod.Toaster), {
  ssr: false,
});

export default function ClientAppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <Toaster />
      {children}
    </>
  );
}

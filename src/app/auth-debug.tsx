'use client';

import EnvDebug from '@/components/debug/EnvDebug';
import { useEffect, useState } from 'react';

export default function AuthDebugPage() {
  const [isAuthDisabled, setIsAuthDisabled] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for auth disabled flag in various places
    const fromEnv = process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true';
    const fromWindow =
      typeof window !== 'undefined' &&
      (window as Window & { __NEXT_PUBLIC_DISABLE_AUTH__?: string })
        .__NEXT_PUBLIC_DISABLE_AUTH__ === 'true';

    setIsAuthDisabled(fromEnv || fromWindow);

    // This is a hack to make the variable available in the client
    if (typeof window !== 'undefined') {
      (window as Window & { __NEXT_PUBLIC_DISABLE_AUTH__?: string }).__NEXT_PUBLIC_DISABLE_AUTH__ =
        'true';
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Page</h1>

      <div className="p-4 border rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Auth Status</h2>
        {isAuthDisabled === null ? (
          <p>Loading...</p>
        ) : (
          <p className={isAuthDisabled ? 'text-green-600' : 'text-red-600'}>
            Authentication is {isAuthDisabled ? 'DISABLED' : 'ENABLED'}
          </p>
        )}
      </div>

      <EnvDebug />

      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Note: If auth disabling isn't working, try these solutions:
        </p>
        <ol className="list-decimal ml-6 mt-2 text-sm">
          <li>
            Restart your Next.js server with{' '}
            <code className="bg-gray-100 px-1 rounded">pnpm dev</code>
          </li>
          <li>
            Make sure <code className="bg-gray-100 px-1 rounded">.env.development</code> has{' '}
            <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_DISABLE_AUTH=true</code>
          </li>
          <li>Clear your browser cache and cookies</li>
        </ol>
      </div>
    </div>
  );
}

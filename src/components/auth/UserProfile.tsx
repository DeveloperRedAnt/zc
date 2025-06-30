'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function UserProfile() {
  const { data: session, status } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: '/sign-in' });
  };

  if (status === 'loading') {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p>Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-4 border rounded-lg bg-red-50">
        <p>Not authenticated. Please sign in.</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start gap-4">
        {session.user.image && (
          <div className="relative w-16 h-16">
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="rounded-full object-cover"
              fill
              sizes="64px"
            />
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{session.user.name}</h2>
          <p className="text-gray-600">{session.user.email}</p>
          <p className="text-sm bg-blue-100 text-blue-800 rounded px-2 py-1 inline-block mt-1">
            Role: {session.user.role}
          </p>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isSigningOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-4 w-full">
          <h3 className="font-medium mb-2">Session Info:</h3>
          <pre className="text-xs overflow-auto bg-gray-100 p-2 rounded">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Define user type based on what UserNav component expects
interface User {
  id: string;
  fullName: string;
  emailAddresses: {
    emailAddress: string;
  }[];
  imageUrl?: string;
  role: 'admin' | 'user';
}

export function useUser() {
  // Use NextAuth session if available
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // If we have a session, create a user object with the necessary properties
    if (session?.user) {
      setUser({
        id: session.user.id || '1',
        fullName: session.user.name || 'Test User',
        emailAddresses: [{ emailAddress: session.user.email || 'user@example.com' }],
        imageUrl: session.user.image || undefined,
        role: (session.user.role as 'admin' | 'user') || 'user',
      });
    } else {
      // For development purposes, always provide a mock user
      // In production, you'd want to return null if no session exists
      setUser({
        id: '1',
        fullName: 'Test User',
        emailAddresses: [{ emailAddress: 'user@example.com' }],
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        role: 'user',
      });
    }
  }, [session]);

  return { user, isSignedIn: !!user };
}

export default useUser;

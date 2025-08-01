import { signOut } from 'next-auth/react';

/**
 * Custom hook for NextAuth logout functionality
 * Returns a logout function that can be used in any component
 * Optionally accepts a callbackUrl for redirect after logout
 */
export function useLogout(defaultCallbackUrl = '/sign-in') {
  return () => signOut({ redirect: true, callbackUrl: defaultCallbackUrl });
}

export default useLogout;

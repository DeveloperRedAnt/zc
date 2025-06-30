'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { create } from 'zustand';
import { allPermissions, permissionsByRole } from './permissions-config';

// Define custom window interface to avoid using 'any'
interface CustomWindow extends Window {
  __NEXT_PUBLIC_DISABLE_AUTH__?: string;
}

// Define custom session user interface to avoid using 'any'
interface ExtendedUser {
  id: string;
  role?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  permissions?: string[];
}

// Define the permissions store state type
interface PermissionsState {
  userPermissions: string[];
  isLoading: boolean;
  setUserPermissions: (permissions: string[]) => void;
  setLoading: (isLoading: boolean) => void;
  hasPermission: (permission: string | string[]) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
}

// Create the Zustand store
export const usePermissionsStore = create<PermissionsState>((set, get) => ({
  userPermissions: [],
  isLoading: true,

  // Actions to update state
  setUserPermissions: (permissions: string[]) => set({ userPermissions: permissions }),
  setLoading: (isLoading: boolean) => set({ isLoading }),

  // Permission check functions
  hasPermission: (permission: string | string[]): boolean => {
    // If auth is disabled in development, grant all permissions
    if (
      process.env.NODE_ENV === 'development' &&
      (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true' ||
        (typeof window !== 'undefined' &&
          (localStorage.getItem('DISABLE_AUTH') === 'true' ||
            (window as unknown as CustomWindow).__NEXT_PUBLIC_DISABLE_AUTH__ === 'true')))
    ) {
      return true;
    }

    // Get current state
    const { userPermissions } = get();

    if (Array.isArray(permission)) {
      // Must have ALL permissions in the array
      return permission.every((p) => userPermissions.includes(p));
    }

    // Check for a single permission
    return userPermissions.includes(permission);
  },

  hasAnyPermission: (permissions: string[]): boolean => {
    // If auth is disabled in development, grant all permissions
    if (
      process.env.NODE_ENV === 'development' &&
      (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true' ||
        (typeof window !== 'undefined' &&
          (localStorage.getItem('DISABLE_AUTH') === 'true' ||
            (window as unknown as CustomWindow).__NEXT_PUBLIC_DISABLE_AUTH__ === 'true')))
    ) {
      return true;
    }

    // Get current state
    const { userPermissions } = get();

    // Check if user has at least one of the permissions
    return permissions.some((p) => userPermissions.includes(p));
  },
}));

/**
 * Hook to initialize permissions based on user session
 * This should be used in a layout or high-level component
 */
export function useInitializePermissions() {
  const { data: session, status } = useSession();
  const setUserPermissions = usePermissionsStore((state) => state.setUserPermissions);
  const setLoading = usePermissionsStore((state) => state.setLoading);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    // If authenticated, determine permissions based on user role
    if (session?.user) {
      const userRole = (session.user.role as string) || 'employee';

      // Get permissions from the role, or use custom permissions if defined on the user
      const rolePermissions = permissionsByRole[userRole] || [];
      // Use the ExtendedUser interface to access the permissions property
      const userCustomPermissions = (session.user as unknown as ExtendedUser).permissions || [];

      // Combine and deduplicate permissions
      const combinedPermissions = [...new Set([...rolePermissions, ...userCustomPermissions])];

      // Ensure all permissions are valid
      const validPermissions = combinedPermissions.filter((p) => allPermissions.includes(p));

      setUserPermissions(validPermissions);
    } else {
      // No session means no permissions
      setUserPermissions([]);
    }

    setLoading(false);
  }, [session, status, setUserPermissions, setLoading]);

  return null;
}

'use client';

import { useSession } from 'next-auth/react';
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
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

// Define the context type
type PermissionsContextType = {
  userPermissions: string[];
  hasPermission: (permission: string | string[]) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  isLoading: boolean;
};

// Create the context with default values
const PermissionsContext = createContext<PermissionsContextType>({
  userPermissions: [],
  hasPermission: () => false,
  hasAnyPermission: () => false,
  isLoading: true,
});

// Custom hook to use the permissions context
export const usePermissions = () => useContext(PermissionsContext);

// Provider component
export function PermissionsProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
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

    setIsLoading(false);
  }, [session, status]);

  // Check if user has a specific permission or all permissions in an array
  const hasPermission = (permission: string | string[]): boolean => {
    // If auth is disabled in development, grant all permissions
    if (
      process.env.NODE_ENV === 'development' &&
      (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true' ||
        localStorage.getItem('DISABLE_AUTH') === 'true' ||
        (typeof window !== 'undefined' &&
          (window as unknown as CustomWindow).__NEXT_PUBLIC_DISABLE_AUTH__ === 'true'))
    ) {
      return true;
    }

    // For admin role, always return true
    if (session?.user?.role === 'admin') {
      return true;
    }

    if (Array.isArray(permission)) {
      // Must have ALL permissions in the array
      return permission.every((p) => userPermissions.includes(p));
    }

    // Check for a single permission
    return userPermissions.includes(permission);
  };

  // Check if user has ANY of the permissions in the array
  const hasAnyPermission = (permissions: string[]): boolean => {
    // If auth is disabled in development, grant all permissions
    if (
      process.env.NODE_ENV === 'development' &&
      (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true' ||
        localStorage.getItem('DISABLE_AUTH') === 'true' ||
        (typeof window !== 'undefined' &&
          (window as unknown as CustomWindow).__NEXT_PUBLIC_DISABLE_AUTH__ === 'true'))
    ) {
      return true;
    }

    // For admin role, always return true
    if (session?.user?.role === 'admin') {
      return true;
    }

    // Check if user has at least one of the permissions
    return permissions.some((p) => userPermissions.includes(p));
  };

  return (
    <PermissionsContext.Provider
      value={{
        userPermissions,
        hasPermission,
        hasAnyPermission,
        isLoading,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}

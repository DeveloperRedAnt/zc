'use client';

import React from 'react';
import { usePermission } from './use-permission';

type WithPermissionProps = {
  permission: string | string[];
  fallback?: React.ReactNode;
};

/**
 * Higher-order component to conditionally render content based on user permissions
 *
 * @example
 * // Protect a component with a single permission
 * <WithPermission permission="user_management.browse">
 *   <UserList />
 * </WithPermission>
 *
 * // Protect with multiple required permissions
 * <WithPermission
 *   permission={['user_management.browse', 'user_management.edit']}
 *   fallback={<AccessDenied />}
 * >
 *   <UserEditor />
 * </WithPermission>
 */
export function WithPermission({
  children,
  permission,
  fallback = null,
}: React.PropsWithChildren<WithPermissionProps>) {
  const { isAllowed, isLoading } = usePermission(permission);

  if (isLoading) {
    return <div>Checking permissions...</div>;
  }

  if (!isAllowed) {
    return fallback;
  }

  return <>{children}</>;
}

/**
 * Create a component that requires specific feature permissions
 *
 * @example
 * const ProtectedUserSection = withFeaturePermission(UserSection, 'user_management.browse');
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: string | string[],
  fallback: React.ReactNode = null
) {
  return function PermissionGuardedComponent(props: P) {
    return (
      <WithPermission permission={permission} fallback={fallback}>
        <Component {...props} />
      </WithPermission>
    );
  };
}

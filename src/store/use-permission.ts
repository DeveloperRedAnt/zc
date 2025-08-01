import { useProfileStore } from './user-store';

/**
 * Hook to check if current profile has a specific permission
 */
export function useHasPermission(permission: string): boolean {
  const permissions = useProfileStore((state) => state.profile?.permissions ?? []);
  return permissions.includes(permission);
}

/**
 * Hook to check if current profile has any of the given permissions
 */
export function useHasAnyPermission(permissionsToCheck: string[]): boolean {
  const permissions = useProfileStore((state) => state.profile?.permissions ?? []);
  return permissionsToCheck.some((p) => permissions.includes(p));
}

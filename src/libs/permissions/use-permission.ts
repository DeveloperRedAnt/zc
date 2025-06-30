'use client';

import { usePermissionsStore } from './permissions-store';

/**
 * Custom hook to check if the current user has a specific permission
 * @param permission Single permission string or array of permissions (all required)
 * @returns Boolean indicating if the user has the permission(s)
 */
export function usePermission(permission: string | string[]) {
  const hasPermission = usePermissionsStore((state) => state.hasPermission);
  const isLoading = usePermissionsStore((state) => state.isLoading);

  return {
    isAllowed: hasPermission(permission),
    isLoading,
  };
}

/**
 * Custom hook to check if the current user has any of the specified permissions
 * @param permissions Array of permissions (any one is sufficient)
 * @returns Boolean indicating if the user has any of the permissions
 */
export function useAnyPermission(permissions: string[]) {
  const hasAnyPermission = usePermissionsStore((state) => state.hasAnyPermission);
  const isLoading = usePermissionsStore((state) => state.isLoading);

  return {
    isAllowed: hasAnyPermission(permissions),
    isLoading,
  };
}

/**
 * Function to create a permission check for a specific feature area
 * This makes permission checks more concise in components
 *
 * @example
 * // Create a hook for user management permissions
 * export const useUserPermissions = createFeaturePermissionHook('user_management');
 *
 * // Then in a component:
 * const { canBrowse, canEdit, canDelete } = useUserPermissions();
 */
export function createFeaturePermissionHook(featurePrefix: string) {
  return function useFeaturePermission() {
    const hasPermission = usePermissionsStore((state) => state.hasPermission);
    const isLoading = usePermissionsStore((state) => state.isLoading);

    return {
      canBrowse: hasPermission(`${featurePrefix}.browse`),
      canRead: hasPermission(`${featurePrefix}.read`),
      canEdit: hasPermission(`${featurePrefix}.edit`),
      canAdd: hasPermission(`${featurePrefix}.add`),
      canDelete: hasPermission(`${featurePrefix}.delete`),
      isLoading,
    };
  };
}

// Pre-defined hooks for common feature areas
export const useUserPermissions = createFeaturePermissionHook('user_management');
export const useOrganizationPermissions = createFeaturePermissionHook('organization_management');
export const useStorePermissions = createFeaturePermissionHook('store_management');

// New feature area hooks
export const useProductPermissions = createFeaturePermissionHook('product_management');
export const useReportPermissions = () => {
  const hasPermission = usePermissionsStore((state) => state.hasPermission);
  const isLoading = usePermissionsStore((state) => state.isLoading);

  return {
    canViewSales: hasPermission('report_management.sales'),
    canViewInventory: hasPermission('report_management.inventory'),
    canViewFinancial: hasPermission('report_management.financial'),
    canExport: hasPermission('report_management.export'),
    canCreate: hasPermission('report_management.create'),
    isLoading,
  };
};

export const useSettingsPermissions = () => {
  const hasPermission = usePermissionsStore((state) => state.hasPermission);
  const isLoading = usePermissionsStore((state) => state.isLoading);

  return {
    canView: hasPermission('settings.view'),
    canEdit: hasPermission('settings.edit'),
    canManageSystem: hasPermission('settings.system'),
    canManageBackups: hasPermission('settings.backup'),
    canManageIntegrations: hasPermission('settings.integrations'),
    isLoading,
  };
};

export const useDashboardPermissions = () => {
  const hasPermission = usePermissionsStore((state) => state.hasPermission);
  const isLoading = usePermissionsStore((state) => state.isLoading);

  return {
    canViewRoot: hasPermission('dashboard.root'),
    canViewEmployee: hasPermission('dashboard.employee'),
    canViewAnalytics: hasPermission('dashboard.analytics'),
    canViewReports: hasPermission('dashboard.reports'),
    isLoading,
  };
};

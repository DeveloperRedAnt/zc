export type PermissionGroup = {
  name: string;
  permissions: Record<string, string>;
};

export const permissionsConfig: PermissionGroup[] = [
  {
    name: 'Dashboard',
    permissions: {
      'dashboard.root': 'View Dashboard',
      'dashboard.employee': 'View Employee Dashboard',
      'dashboard.analytics': 'View Analytics Dashboard',
      'dashboard.reports': 'View Reports Dashboard',
    },
  },
  {
    name: 'User Management',
    permissions: {
      'user_management.browse': 'Browse Users',
      'user_management.read': 'Create Users',
      'user_management.edit': 'Edit Users',
      'user_management.add': 'Add Users',
      'user_management.delete': 'Delete Users',
    },
  },
  {
    name: 'Organization Management',
    permissions: {
      'organization_management.browse': 'Browse Organizations',
      'organization_management.read': 'Create Organizations',
      'organization_management.edit': 'Edit Organizations',
      'organization_management.add': 'Add Organizations',
      'organization_management.delete': 'Delete Organizations',
    },
  },
  {
    name: 'Store Management',
    permissions: {
      'store_management.browse': 'Browse Stores',
      'store_management.read': 'Create Stores',
      'store_management.edit': 'Edit Stores',
      'store_management.add': 'Add Stores',
      'store_management.delete': 'Delete Stores',
    },
  },
  {
    name: 'Product Management',
    permissions: {
      'product_management.browse': 'Browse Products',
      'product_management.read': 'View Product Details',
      'product_management.edit': 'Edit Products',
      'product_management.add': 'Add Products',
      'product_management.delete': 'Delete Products',
      'product_management.pricing': 'Manage Product Pricing',
      'product_management.inventory': 'Manage Product Inventory',
    },
  },
  {
    name: 'Report Management',
    permissions: {
      'report_management.sales': 'View Sales Reports',
      'report_management.inventory': 'View Inventory Reports',
      'report_management.financial': 'View Financial Reports',
      'report_management.export': 'Export Reports',
      'report_management.create': 'Create Custom Reports',
    },
  },
  {
    name: 'Settings',
    permissions: {
      'settings.view': 'View Settings',
      'settings.edit': 'Edit Settings',
      'settings.system': 'Manage System Settings',
      'settings.backup': 'Manage Backups',
      'settings.integrations': 'Manage Integrations',
    },
  },
];

// Flatten all permission keys for easy access
export const allPermissions = permissionsConfig.reduce<string[]>((acc, group) => {
  // Use push instead of spread to avoid O(n^2) time complexity
  acc.push(...Object.keys(group.permissions));
  return acc;
}, []);

// Create permission groups for role-based assignment
export const permissionsByRole: Record<string, string[]> = {
  admin: allPermissions, // Admin has all permissions
  manager: [
    // Dashboard permissions
    'dashboard.root',
    'dashboard.analytics',
    'dashboard.reports',

    // User management permissions
    'user_management.browse',
    'user_management.read',
    'user_management.edit',

    // Organization management permissions
    'organization_management.browse',
    'organization_management.read',
    'organization_management.edit',

    // Store management permissions
    'store_management.browse',
    'store_management.read',
    'store_management.edit',

    // Product management permissions
    'product_management.browse',
    'product_management.read',
    'product_management.edit',

    // Report management permissions
    'report_management.sales',
    'report_management.inventory',
    'report_management.export',

    // Settings permissions
    'settings.view',
  ],
  employee: [
    // Limited dashboard access
    'dashboard.employee',

    // Limited product access
    'product_management.browse',
    'product_management.read',

    // Limited store access
    'store_management.browse',
    'store_management.read',
  ],
  // Example of a specialized role
  analyst: [
    'dashboard.root',
    'dashboard.analytics',
    'dashboard.reports',
    'report_management.sales',
    'report_management.inventory',
    'report_management.financial',
    'report_management.export',
    'report_management.create',
  ],
};

// Helper to check if a permission exists
export function isValidPermission(permission: string): boolean {
  return allPermissions.includes(permission);
}

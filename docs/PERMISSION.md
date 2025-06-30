# Permissions System

This directory contains a comprehensive permissions system for the Zycash Dashboard application. It provides an easy way to check user permissions throughout your application.

## Setup

To use the permissions system, you need to wrap your application with the `PermissionsProvider`. Add it to your app layout or main component, making sure it's inside the `NextAuthProvider`:

```tsx
// In your app layout or main component
import { PermissionsProvider } from '@/lib/permissions';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <PermissionsProvider>
        {children}
      </PermissionsProvider>
    </NextAuthProvider>
  );
}
```

## Usage

### Basic Permission Checking

```tsx
import { usePermission } from '@/lib/permissions';

function MyComponent() {
  // Check a single permission
  const { isAllowed, isLoading } = usePermission('user_management.browse');
  
  // Check multiple permissions (requires ALL)
  const { isAllowed: canManageUsers } = usePermission([
    'user_management.browse',
    'user_management.edit'
  ]);
  
  if (isLoading) return <div>Loading permissions...</div>;
  
  if (!isAllowed) return <div>Access denied</div>;
  
  return <div>User has permission to browse users</div>;
}
```

### Feature-Specific Permission Hooks

For common feature areas, you can use the pre-defined hooks:

```tsx
import { 
  useUserPermissions,
  useOrganizationPermissions,
  useStorePermissions,
  useDashboardPermissions
} from '@/lib/permissions';

function UserManagementPage() {
  const { canBrowse, canEdit, canAdd, canDelete } = useUserPermissions();
  
  return (
    <div>
      {canBrowse && <UserList />}
      {canAdd && <AddUserButton />}
      {canEdit && <EditUserButton />}
      {canDelete && <DeleteUserButton />}
    </div>
  );
}
```

### Protecting Components with HOC

You can protect entire components or sections using the `WithPermission` component:

```tsx
import { WithPermission } from '@/lib/permissions';

function AdminDashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Protect a section with a single permission */}
      <WithPermission permission="user_management.browse">
        <UserStats />
      </WithPermission>
      
      {/* Protect with multiple required permissions and custom fallback */}
      <WithPermission 
        permission={['organization_management.edit', 'organization_management.delete']}
        fallback={<p>You need advanced organization permissions to view this section</p>}
      >
        <OrganizationControls />
      </WithPermission>
    </div>
  );
}
```

### Higher-Order Component

You can also use the higher-order component pattern:

```tsx
import { withPermission } from '@/lib/permissions';

function SensitiveComponent() {
  return <div>This contains sensitive information</div>;
}

// Create a protected version of the component
const ProtectedComponent = withPermission(
  SensitiveComponent, 
  'user_management.browse',
  <div>Access denied</div>
);

// Use it elsewhere
function App() {
  return <ProtectedComponent />;
}
```

## Custom Feature Permissions

If you need to create a permission hook for a custom feature area:

```tsx
import { createFeaturePermissionHook } from '@/lib/permissions';

// Create a custom hook for a new feature area
export const useProductPermissions = createFeaturePermissionHook('product_management');

// Then use it in components
function ProductPage() {
  const { canBrowse, canEdit, canAdd } = useProductPermissions();
  
  // Use the permissions...
}
```

## Updating Permissions

To add new permissions, modify the `permissions-config.ts` file. The system is designed to be easily extensible.

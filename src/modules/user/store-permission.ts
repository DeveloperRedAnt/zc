import type { OptionType } from '@/components/dropdown/dropdown';
import { create } from 'zustand';

export type Permission = {
  id: string;
  label: string;
  enabled: boolean;
};

export type PermissionGroup = {
  title: string;
  permissions: Permission[];
};

export type StorePermission = {
  id: string;
  name: string;
  position: OptionType | null;
  permissions: PermissionGroup[];
};

type PermissionState = {
  storePermissions: StorePermission[];
  togglePermission: (storeIndex: number, groupIndex: number, permIndex: number) => void;
  toggleAllPermissions: (storeIndex: number) => void;
  countGranted: (permissions: PermissionGroup[]) => number;
  setStorePermissions: (perms: StorePermission[]) => void;
  getIncompletePositionStores: () => StorePermission[];
  isSaveButtonEnabled: () => boolean;
};

type Store = PermissionState;

export const usePermissionStore = create<Store>()((set, get) => ({
  storePermissions: [],

  setStorePermissions: (perms) => set({ storePermissions: perms }),

  togglePermission: (storeIndex, groupIndex, permIndex) => {
    const storePermissions = [...get().storePermissions];
    const target = storePermissions[storeIndex]?.permissions[groupIndex]?.permissions[permIndex];
    if (!target) return;
    target.enabled = !target.enabled;
    set({ storePermissions });
  },

  toggleAllPermissions: (storeIndex) => {
    const storePermissions = [...get().storePermissions];
    const current = storePermissions[storeIndex];
    if (!current) return;

    const allEnabled = current.permissions.every((group) =>
      group.permissions.every((perm) => perm.enabled)
    );

    const updatedPermissions = current.permissions.map((group) => ({
      ...group,
      permissions: group.permissions.map((perm) => ({
        ...perm,
        enabled: !allEnabled,
      })),
    }));

    storePermissions[storeIndex] = { ...current, permissions: updatedPermissions };
    set({ storePermissions });
  },

  countGranted: (permissions) =>
    permissions.reduce(
      (total, group) => total + group.permissions.filter((p) => p.enabled).length,
      0
    ),

  getIncompletePositionStores: () => {
    const storePermissions = [...get().storePermissions];
    return storePermissions.filter((store) => !store.position);
  },

  isSaveButtonEnabled: () => {
    const storePermissions = [...get().storePermissions];
    return storePermissions.some(
      (store) =>
        store.position &&
        store.permissions.some((group) => group.permissions.some((perm) => perm.enabled))
    );
  },
}));

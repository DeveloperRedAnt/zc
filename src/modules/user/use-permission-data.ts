import * as api from '@/__generated__/api/client';
import { useGetEmployeeDetail, useGetStore } from '@/__generated__/api/hooks';
import type { OptionType } from '@/components/dropdown/dropdown';
import { usePermissionStore } from '@/modules/user/store-permission';
import { useQueries } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

export function usePermissionData({ isEdit = false }: { isEdit?: boolean }) {
  const storePermissions = usePermissionStore((state) => state.storePermissions);
  const setStorePermissions = usePermissionStore((state) => state.setStorePermissions);
  const hasSetRef = useRef(false);
  const router = useRouter();
  const params = useParams();
  const [employeeId, setEmployeeId] = useState<number | null>(
    params.userId ? Number(params.userId) : null
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!employeeId) {
      router.push('/dashboard/users'); // redirect jika tidak ada ID
    } else {
      setEmployeeId(employeeId);
    }
  }, [router, employeeId]);

  const paramsStore = useMemo(
    () => ({
      'x-device-id': '1',
      'x-store-id': '1', // Added required parameter
      'x-organization-id': '1',
      body: {
        sort_by: 'id',
        sort_direction: 'asc' as 'asc' | 'desc',
        per_page: 50,
      },
    }),
    []
  );

  const { data } = useGetStore(paramsStore);
  const stores = data?.data ?? [];

  const isStoreFetched = stores.length > 0;

  // Inisialisasi storePermissions jika masih kosong
  useEffect(() => {
    if (!isStoreFetched || storePermissions.length > 0) return;

    const perms = stores.map((store) => ({
      id: String(store.id), // Convert to string to match StorePermission type
      name: store.name,
      position: null,
      permissions: [],
    }));

    setStorePermissions(perms);
  }, [isStoreFetched, setStorePermissions, stores, storePermissions.length]);

  // Get employee detail jika isEdit
  const employeeDetailQuery = useGetEmployeeDetail(
    employeeId ?? 0, // Just pass the ID, headers are handled by injectHeaders
    {
      enabled: isEdit && !!employeeId,
    } as Parameters<typeof useGetEmployeeDetail>[1]
  );

  // Unused variable commented out
  // const _employeeDetail = employeeDetailQuery.data;

  // Fetch posisi per toko
  const positionQueries = useQueries({
    queries: storePermissions.map((store) => ({
      queryKey: ['getListPosition', { storeId: store.id }],
      queryFn: async () => {
        const result = await api.listPosition({
          body: {},
        });
        return { storeId: store.id, data: result };
      },
    })),
  });

  // Map posisi berdasarkan storeId
  const positionMap = useMemo(() => {
    const map = new Map<number, OptionType[]>();
    for (const q of positionQueries) {
      if (q.status === 'success') {
        const { storeId, data } = q.data ?? {};
        if (storeId && data) {
          map.set(Number(storeId), data);
        }
      }
    }
    return map;
  }, [positionQueries]);

  // Fetch permission group per toko
  const permissionGroupQueries = useQueries({
    queries: storePermissions.map((store) => ({
      queryKey: ['getPermissionGroup', store.id],
      queryFn: async () => {
        const result = await api.listPermissionGroup({
          body: {},
        });
        return { storeId: store.id, data: result };
      },
    })),
  });

  // Fix status comparison to match actual available status values
  const anyLoading = permissionGroupQueries.some((q) => q.status === 'pending');

  // Use API response type for backend data structure
  interface ApiPermissionGroup {
    id: number;
    name: string;
    permissions: {
      id: number;
      name: string;
      key: string;
      is_attached?: boolean;
    }[];
  }

  const permissionGroupMap = useMemo(() => {
    const entries: [number, ApiPermissionGroup[]][] = [];

    for (const q of permissionGroupQueries) {
      if (q.status === 'success') {
        const { storeId, data } = q.data ?? {};
        if (storeId && data) {
          entries.push([Number(storeId), data]);
        }
      }
    }

    return new Map(entries);
  }, [permissionGroupQueries]);

  // Update loading status berdasarkan kondisi loading
  useEffect(() => {
    const shouldWait =
      storePermissions.length === 0 || permissionGroupQueries.length === 0 || anyLoading;

    setIsLoading(shouldWait);
  }, [storePermissions.length, permissionGroupQueries.length, anyLoading]);

  // Set permissions ke store ketika semua berhasil di-fetch
  useEffect(() => {
    const ready =
      storePermissions.length > 0 &&
      permissionGroupQueries.length === storePermissions.length &&
      permissionGroupQueries.every((q) => q.status === 'success') &&
      (!isEdit || (isEdit && employeeDetailQuery.status === 'success'));

    if (!ready || hasSetRef.current) return;

    const updated = storePermissions.map((store, _index) => {
      const groups = permissionGroupMap.get(Number(store.id)) ?? [];

      const mappedPermissions = groups.map((group) => {
        const employeeGroup = employeeDetailQuery.data?.stores
          ?.find((s) => String(s.id) === store.id)
          ?.permission_groups.find((g) => g.id === group.id);

        const enabledKeys = new Set(employeeGroup?.permissions.map((perm) => perm.key) ?? []);

        return {
          title: group.name,
          permissions: group.permissions.map((perm) => ({
            id: String(perm.id), // Convert to string to match Permission type
            label: perm.name,
            key: perm.key,
            enabled: isEdit ? enabledKeys.has(perm.key) : perm.is_attached ?? false,
          })),
        };
      });

      const matchedStore = employeeDetailQuery.data?.stores?.find((s) => String(s.id) === store.id);

      const position: OptionType | null = matchedStore?.position
        ? {
            label: matchedStore.position.name,
            value: String(matchedStore.position.id),
          }
        : null;

      return {
        ...store,
        position,
        permissions: mappedPermissions,
      };
    });

    setStorePermissions(updated);
    hasSetRef.current = true;
    setIsFinished(true);
  }, [
    storePermissions,
    permissionGroupQueries,
    isEdit,
    employeeDetailQuery.status,
    employeeDetailQuery.data,
    setStorePermissions,
    permissionGroupMap,
  ]);

  return {
    storePermissions,
    positionQueries,
    positionMap,
    permissionGroupQueries,
    isLoading,
    isFinished,
  };
}

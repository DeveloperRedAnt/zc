'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import { Switch } from '@/components/switch/switch';
import { usePermissionStore } from '@/modules/user/store-permission';
import { usePermissionData } from '@/modules/user/use-permission-data';
import { CheckOne, Right } from '@icon-park/react';
import { useEffect, useRef, useState } from 'react';

export default function PermissionSettings({
  isEdit = false,
  employeeId: _employeeId,
}: { isEdit?: boolean; employeeId?: number | null }) {
  const {
    storePermissions: fetchedPermissions,
    positionMap,
    isLoading,
    isFinished,
  } = usePermissionData({ isEdit });

  const {
    storePermissions,
    togglePermission,
    toggleAllPermissions,
    countGranted,
    setStorePermissions,
  } = usePermissionStore();

  const hasSetRef = useRef(false);

  // Sync storePermissions ketika semua permission sudah di-fetch
  useEffect(() => {
    const hasNoPermissions = storePermissions.every((s) => s.permissions.length === 0);
    if (isFinished && hasNoPermissions && !hasSetRef.current) {
      setStorePermissions(fetchedPermissions);
      hasSetRef.current = true;
    }
  }, [isFinished, fetchedPermissions, storePermissions, setStorePermissions]);

  const [togglePermissionForm, setTogglePermissionForm] = useState<number | null>(null);

  const handleChangePosition = (storeIndex: number, position: OptionType | null) => {
    const updated = [...storePermissions];
    if (!updated[storeIndex]) return;

    updated[storeIndex] = {
      ...updated[storeIndex],
      position,
    };

    setStorePermissions(updated);
  };

  // Validasi tombol simpan - removed unused variable declaration
  // const _isSaveButtonDisabled = storePermissions.some(
  //   (store) =>
  //     !store.position ||
  //     store.permissions.every((group) => group.permissions.every((perm) => !perm.enabled))
  // );

  if (isLoading) return <SkeletonCardContent className="w-full" />;
  if (!isFinished) return <SkeletonCardContent className="w-full" />;

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#555555]">Organisasi:</p>
          <p className="text-sm text-[#555555]">#1155230ASA5 - PT Mencari Cinta Sejati</p>
        </div>

        {storePermissions.length === 0 ? (
          <p className="text-sm italic text-gray-400">Belum ada data toko</p>
        ) : (
          storePermissions.map((store, storeIndex) => {
            const positionOptions = positionMap.get(Number(store.id)) ?? [];

            return (
              <Card key={store.id} className="text-[#555555] px-2 my-[1rem]">
                <CardHeader className="flex-row flex justify-between items-center pl-0">
                  <CardTitle className="text-[1rem] flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setTogglePermissionForm(
                          togglePermissionForm === storeIndex ? null : storeIndex
                        )
                      }
                      className="hover:bg-transparent p-0"
                    >
                      <div
                        className={`transform transition-transform duration-500 ${
                          togglePermissionForm === storeIndex ? 'rotate-90' : ''
                        }`}
                      >
                        <Right />
                      </div>
                    </Button>
                    #{store.id} - {store.name}
                  </CardTitle>
                  <div className="text-center p-[0.2rem] text-[0.75rem] bg-[#F08181] text-white rounded w-[8rem]">
                    {countGranted(store.permissions)} Permission
                  </div>
                </CardHeader>

                {togglePermissionForm === storeIndex && (
                  <CardContent className="text-sm pl-10">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-[40%]">
                        <Dropdown
                          label="Jabatan"
                          options={positionOptions}
                          value={store.position}
                          onChange={(value) => handleChangePosition(storeIndex, value)}
                          placeholder="Pilih Jabatan"
                          className="h-[40px] w-full"
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="hover:bg-none"
                        onClick={() => toggleAllPermissions(storeIndex)}
                      >
                        <CheckOne />
                        {store.permissions.every((group) =>
                          group.permissions.every((perm) => perm.enabled)
                        )
                          ? 'Uncheck Semua'
                          : 'Pilih Semua'}
                      </Button>
                    </div>

                    {store.permissions.map((group, groupIndex) => (
                      <Card key={group.title} className="px-2 my-[2rem]">
                        <CardHeader className="flex-row flex justify-between items-center border-b border-[#F1F5F9]">
                          <CardTitle className="text-[1rem]">{group.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 text-sm">
                          <div className="flex flex-wrap">
                            {group.permissions.map((perm, permIndex) => (
                              <div key={perm.id} className="flex items-center gap-2 w-1/3 mt-4">
                                <Switch
                                  checked={perm.enabled}
                                  onCheckedChange={() =>
                                    togglePermission(storeIndex, groupIndex, permIndex)
                                  }
                                />
                                <span className="text-sm font-medium text-[#555555]">
                                  {perm.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                )}
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/button/button';
import { Switch } from '@/components/switch/switch';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/card/card';
import Dropdown from '@/components/dropdown/dropdown';
import { Right, CheckOne } from '@icon-park/react';
import type { OptionType } from '@/components/dropdown/dropdown';
import { useUserStore } from '../store'; // pastikan path sesuai

const optionsPosition: OptionType[] = [
  { label: 'Owner', value: 1 },
  { label: 'Kasir', value: 2 },
];

export default function PermissionSettings() {
  const {
    orgPermissions,
    togglePermission,
    toggleAllPermissions,
    countGranted,
    setOrgPermissions,
  } = useUserStore();

  const [togglePermissionForm, setTogglePermissionForm] = useState<number | null>(null);

  const handleChangePosition = (orgIndex: number, position: OptionType | null) => {
    const updated = [...orgPermissions];

    if (!updated[orgIndex]) return;

    updated[orgIndex] = {
      ...updated[orgIndex],
      position,
    };

    setOrgPermissions(updated);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#555555]">Organisasi:</p>
        <p className="text-sm text-[#555555]">#1155230ASA5 - PT Mencari Cinta Sejati</p>
      </div>

      {orgPermissions.map((org, orgIndex) => (
        <Card key={org.orgId} className="text-[#555555] px-2 my-[1rem]">
          <CardHeader className="flex-row flex justify-between items-center pl-0">
            <CardTitle className="text-[1rem] flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setTogglePermissionForm(
                    togglePermissionForm === orgIndex ? null : orgIndex
                  )
                }
                className="hover:bg-transparent p-0"
              >
                <div
                  className={`transform transition-transform duration-500 ${
                    togglePermissionForm === orgIndex ? 'rotate-90' : ''
                  }`}
                >
                  <Right />
                </div>
              </Button>
              {org.orgId} - {org.name}
            </CardTitle>
            <div className="text-center p-[0.2rem] text-[0.75rem] bg-[#F08181] text-white rounded w-[8rem]">
              {countGranted(org.permissions)} Permission
            </div>
          </CardHeader>

          {togglePermissionForm === orgIndex && (
            <CardContent className="text-sm pl-10">
              <div className="flex justify-between items-center mb-4">
                <div className="w-[40%]">
                  <Dropdown
                    label="Jabatan"
                    options={optionsPosition}
                    value={org.position}
                    onChange={(value) => handleChangePosition(orgIndex, value)}
                    placeholder="Pilih Jabatan"
                    className="h-[40px] w-full"
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="hover:bg-none"
                  onClick={() => toggleAllPermissions(orgIndex)}
                >
                  <CheckOne />
                  {org.permissions.every((group) =>
                    group.permissions.every((perm) => perm.enabled)
                  )
                    ? 'Uncheck Semua'
                    : 'Pilih Semua'}
                </Button>
              </div>

              {org.permissions.map((group, groupIndex) => (
                <Card key={group.title} className="px-2 my-[2rem]">
                  <CardHeader className="flex-row flex justify-between items-center border-b border-[#F1F5F9]">
                    <CardTitle className="text-[1rem]">{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 text-sm">
                    <div className="flex flex-wrap">
                      {group.permissions.map((perm, permIndex) => (
                        <div
                          key={perm.id}
                          className="flex items-center gap-2 w-1/3 mt-4"
                        >
                          <Switch
                            checked={perm.enabled}
                            onCheckedChange={() =>
                              togglePermission(orgIndex, groupIndex, permIndex)
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
      ))}
    </div>
  );
}

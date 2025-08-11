'use client';

import type { OrganizationSchema } from '@/__generated__/api/dto/organization.dto';
import { useGetOrganizationsOfUser } from '@/__generated__/api/hooks/organization.hooks';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { useToast } from '@/components/toast/toast';
import { useOrganization } from '@/modules/organization/context';
import { useOrganizationStore } from '@/store/organization-store';
import { Check } from '@icon-park/react';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useCallback, useState } from 'react';
import OrganizationSelect from './components/organization-select';
import {
  formatOrganizationOptions,
  getSelectedOrganization,
} from './constants/format-organization-select';

export default function SelectOrganizationPage() {
  const setOrganization = useOrganizationStore((state) => state.setOrganization);
  const router = useRouter();
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [dataOrganization, setDataOrganization] = useState<{ value: string; label: string }[]>([]);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const toast = useToast();

  const { isLoading: isLoadingSelectedOrg } = useOrganization();
  const { data: session } = useSession();

  const userId = session?.user?.id;
  // Fetch organizations of user
  const { data: rawDataOrganizationOfUser, isLoading: isLoadingFetchOrganizations } =
    useGetOrganizationsOfUser(
      {
        'x-device-id': '1',
        'user-id': userId as string,
      } as const,
      {
        enabled: !!userId,
        retry: false,
        queryKey: [],
      }
    );

  const isLoadingOrganization = isLoadingFetchOrganizations || isLoadingSelectedOrg;

  // Strictly type organization data
  const dataOrganizationOfUser: OrganizationSchema[] = Array.isArray(rawDataOrganizationOfUser)
    ? (rawDataOrganizationOfUser as OrganizationSchema[])
    : [];

  const showNoOrganizationError = useCallback(() => {
    toast.showError(
      'Anda tidak memiliki organisasi',
      'Silahkan hubungi admin / Tolong tambahkan organisasi'
    );
  }, [toast]);

  useEffect(() => {
    if (isLoadingOrganization) return;
    if (dataOrganizationOfUser.length === 0) {
      // setOrganization({ id: 0, name: '', flex: 'choose-organization' });
      // router.replace('/login/add-organization');
      showNoOrganizationError();
      return;
    }
    setDataOrganization(formatOrganizationOptions(dataOrganizationOfUser));
  }, [dataOrganizationOfUser, isLoadingOrganization, showNoOrganizationError]);

  const onChangeOrg = useCallback((selectedVal: string) => {
    setSelectedOrg(selectedVal);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingLogin(true);

    try {
      // Find selected organization from list
      const orgList = dataOrganizationOfUser;
      const fullOrg = getSelectedOrganization(selectedOrg, dataOrganization, orgList);

      if (fullOrg) {
        // Set the selected organization in store
        setOrganization({ id: fullOrg.id, name: fullOrg.name, flex: 'dashboard' });
        Cookies.set('flex', 'dashboard');
        Cookies.set('x-organization-id', fullOrg.id.toString());
        Cookies.set('x-organization-name', fullOrg.name);
        // Navigate to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error selecting organization:', error);
    } finally {
      setLoadingLogin(false);
    }
  };

  // We'll handle the organization switching directly in handleSubmit instead of using an effect

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div>
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="/assets/zycas/zycas-logo.png"
              alt="Zycas Login"
              width={28}
              height={28}
              className="inline-block align-middle mr-2"
            />
            <span className="text-[1rem] font-light">Zycas</span>
            <span className="text-[1rem] font-light -ml-1">Dashboard</span>
          </div>
        </div>
        <Card className="text-[#555555] rounded-lg shadow-lg">
          <CardHeader className="border-b flex-row flex justify-between items-center">
            <CardTitle className="text-[1rem] font-semibold">Pilih:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-0 text-[14px] font-[400]">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="h-auto w-[27.5rem] p-4">
                <div className="w-full mb-2">
                  <OrganizationSelect
                    value={selectedOrg}
                    onChange={onChangeOrg}
                    organizations={dataOrganization}
                  />
                </div>
                <p className="my-6 text-gray-500">
                  Data shown on Dashboard is only from the organization you select.
                </p>
                <p className="text-[#F08181] text-sm">
                  Make sure your selection is correct, you must logout to choose another
                  organization.
                </p>
                <div className="mt-8 w-full">
                  <Button
                    type="submit"
                    variant="success"
                    className="!w-full flex items-center justify-center gap-2"
                    disabled={!selectedOrg || isLoadingOrganization || loadingLogin}
                  >
                    {loadingLogin ? (
                      'Processing...'
                    ) : (
                      <>
                        Select and Enter Dashboard
                        <Check theme="filled" size="18" fill="#fff" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

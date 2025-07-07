'use client';
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { usePageLoading } from '@/hooks/use-page-loading/use-page-loading';
import FilterStoreList from '@/modules/store/filter-store-list';
import TableOrganizationList from '@/modules/store/table-store-list';
import { Plus } from '@icon-park/react';
import { useEffect, useState } from 'react';

type Store = {
  id: string;
  storeName: string;
  storeType: string;
  storeCat: string;
  address: string;
  whatsapp: string;
};

export default function Index() {
  const [loadingDataStore, setLoadingDataStore] = useState(true);

  // Form state for inputs
  const [_, setFormData] = useState({
    storeName: '',
    storeType: '',
    storeCat: '',
    address: '',
    whatsapp: '',
  });

  const { isLoading, setLoading } = usePageLoading({
    autoStart: false,
    initialDelay: 0,
  });

  useEffect(() => {
    setLoading(true);
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 2000);
    }).then(() => {
      setTimeout(() => {
        setLoadingDataStore(false);
      }, 2000);
    });
  }, [setLoading]);

  const handleAddOrganization = () => {
    setFormData({
      storeName: '',
      storeType: '',
      storeCat: '',
      address: '',
      whatsapp: '',
    });
    window.location.href = '/dashboard/store/add';
  };

  const handleEditOrganization = (store: Store) => {
    setFormData({
      storeName: store.storeName,
      storeType: store.storeType,
      storeCat: store.storeCat,
      address: store.address,
      whatsapp: store.whatsapp,
    });
    window.location.href = `/dashboard/store/${store.id}/edit`;
  };

  return (
    <>
      <Card className="my-[1rem] font-normal">
        <CardHeader className="border-b flex-row flex justify-between items-center">
          {isLoading ? (
            <SkeletonPreset w="w-32" h="h-6" className="rounded-sm ml-2.5" />
          ) : (
            <CardTitle className="text-[1rem]"> List Toko </CardTitle>
          )}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <>
                <SkeletonButton className="w-[110px]" />
                <SkeletonButton className="w-[140px] mr-3.5" />
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#555555] flex items-center"
                  onClick={handleAddOrganization}
                >
                  <Plus />
                  Tambah Toko
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {isLoading ? (
            <SkeletonCardContent className="w-full" />
          ) : (
            <>
              <FilterStoreList loadingDataStore={loadingDataStore} />
              <TableOrganizationList
                isLoading={loadingDataStore}
                onEditOrganization={handleEditOrganization}
              />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

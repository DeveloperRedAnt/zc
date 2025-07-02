'use client';
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { usePageLoading } from '@/hooks/use-page-loading/use-page-loading';
import FilterProductList from '@/modules/product/components/filter-product-list';
import TableProductList from '@/modules/product/components/table-product-list';
import { DownloadOne, Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Index() {
  const [loadingDataProduct, setLoadingDataProduct] = useState(true);
  const router = useRouter();

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
        setLoadingDataProduct(false);
      }, 2000);
    });
  }, [setLoading]);

  return (
    <>
      <Card className="my-[1rem] font-normal">
        <CardHeader className="border-b flex-row flex justify-between items-center">
          {isLoading ? (
            <SkeletonPreset w="w-32" h="h-6" className="rounded-sm ml-2.5" />
          ) : (
            <CardTitle className="text-[1rem]"> List Produk </CardTitle>
          )}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <>
                <SkeletonButton className="w-[110px]" />
                <SkeletonButton className="w-[140px] mr-3.5" />
              </>
            ) : (
              <>
                <Button type="button" variant="outline" className="flex items-center">
                  <DownloadOne />
                  Import
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#555555] flex items-center"
                  onClick={() => router.push('/dashboard/product/add')}
                >
                  <Plus />
                  Tambah Produk
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
              <FilterProductList loadingDataProduct={loadingDataProduct} />
              <TableProductList isLoading={loadingDataProduct} />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

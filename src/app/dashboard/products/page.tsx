'use client';
import { ProductSchema } from '@/__generated__/api/dto';
import { useListProducts } from '@/__generated__/api/hooks';
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
  const router = useRouter();
  const [filters, setFilters] = useState<ProductSchema>({
    page: 1,
    per_page: 10,
    search: '',
    sort_by: 'name',
    sort_direction: 'asc',
    status: undefined,
  });

  const { isLoading, setLoading } = usePageLoading({
    autoStart: false,
    initialDelay: 0,
  });

  // API call untuk mendapatkan data products
  const {
    data: productsResponse,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useListProducts({
    body: filters,
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [setLoading]);

  // Set required headers in localStorage for development
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('x-device-id', '1');
      localStorage.setItem('x-store-id', '1');
      localStorage.setItem('x-organization-id', '1');
    }
  }, []);

  // Handle filter changes - Fixed function name
  const handleFilterChange = (newFilters: Partial<ProductSchema>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Handle error
  if (productsError) {
    console.error('Error fetching products:', productsError);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          {isLoading ? <SkeletonPreset /> : <CardTitle>List Produk</CardTitle>}
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
                  variant="info"
                  className="flex items-center"
                  onClick={() => router.push('/dashboard/product/add')}
                >
                  <Plus />
                  Tambah Produk
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonCardContent />
          ) : (
            <>
              <FilterProductList
                onFilterChange={handleFilterChange}
                currentFilters={filters}
                loadingDataProduct={isLoadingProducts}
              />
              <TableProductList
                data={productsResponse?.data || []}
                isLoading={isLoadingProducts}
                meta={productsResponse?.meta}
                onPageChange={handlePageChange}
                currentPage={filters.page || 1}
              />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

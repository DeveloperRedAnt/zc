'use client';
import { ProductSchema } from '@/__generated__/api/dto';
import { useListProducts } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { usePageLoading } from '@/hooks/use-page-loading/use-page-loading';
import { DownloadOne, Plus } from '@icon-park/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const FilterProductList = dynamic(
  () => import('@/modules/product/components/filter-product-list'),
  {
    loading: () => (
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`item-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

const TableProductList = dynamic(() => import('@/modules/product/components/table-product-list'), {
  loading: () => (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {['Image', 'Nama', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((_, i) => (
              <th key={`item-${i}`} className="px-6 py-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={`item-${i}`} className="border-b">
              <td className="px-6 py-4">
                <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
              </td>
              {Array.from({ length: 6 }).map((_, j) => (
                <td key={`cell-${j}`} className="px-6 py-4">
                  {j === 5 ? (
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ) : j === 4 ? (
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  ) : (
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`item-${i}`} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
});

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
              <Suspense
                fallback={
                  <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={`item-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                }
              >
                <FilterProductList
                  onFilterChange={handleFilterChange}
                  currentFilters={filters}
                  loadingDataProduct={isLoadingProducts}
                />
              </Suspense>

              <Suspense
                fallback={
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          {['Image', 'Nama', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map(
                            (_, i) => (
                              <th key={`item-${i}`} className="px-6 py-3">
                                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 10 }).map((_, i) => (
                          <tr key={`item-${i}`} className="border-b">
                            <td className="px-6 py-4">
                              <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
                            </td>
                            {Array.from({ length: 6 }).map((_, j) => (
                              <td key={`cell-${j}`} className="px-6 py-4">
                                {j === 5 ? (
                                  <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                                  </div>
                                ) : j === 4 ? (
                                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                                ) : (
                                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                }
              >
                <TableProductList
                  data={productsResponse?.data || []}
                  isLoading={isLoadingProducts}
                  meta={productsResponse?.pagination}
                  onPageChange={handlePageChange}
                  currentPage={filters.page || 1}
                />
              </Suspense>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}

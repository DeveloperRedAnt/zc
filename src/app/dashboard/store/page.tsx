'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useSearchParams } from '@/modules/store/hooks/use-search-params';
import { Plus } from '@icon-park/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';

const FilterStore = dynamic(() => import('@/modules/store/components/filter-store'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  ),
});

const TableStore = dynamic(() => import('@/modules/store/components/table-store'), {
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-24" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Nama Toko', 'Alamat', 'Telepon', 'Status', 'Tanggal Dibuat', 'Aksi'].map(
                (_, i) => (
                  <th key={`store-${i}`} className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={`store-${i}`} className="border-b">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`store-${i}`} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function StoreListPage() {
  const router = useRouter();
  const {
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useSearchParams();

  // Reset page to 1 when search changes
  React.useEffect(() => {
    if (search && page > 1) {
      setPage(1);
    }
  }, [search, page, setPage]);

  return (
    <>
      <PageLayout
        title="List Toko"
        button={
          <Button variant="outline" onClick={() => router.push('/dashboard/store/add')}>
            <Plus />
            Tambah Toko
          </Button>
        }
      >
        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          }
        >
          <FilterStore search={search} setSearch={setSearch} />
        </Suspense>

        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-24" />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Nama Toko', 'Alamat', 'Telepon', 'Status', 'Tanggal Dibuat', 'Aksi'].map(
                        (_, i) => (
                          <th key={`store-${i}`} className="px-6 py-3 text-left">
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <tr key={`store-${i}`} className="border-b">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                            <div className="space-y-1">
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                              <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                            </div>
                          </div>
                        </td>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <td key={`cell-${j}`} className="px-6 py-4">
                            {j === 2 ? (
                              <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                            ) : j === 4 ? (
                              <div className="flex gap-2">
                                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                              </div>
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
            </div>
          }
        >
          <TableStore
            search={search}
            page={page}
            limit={limit}
            setLimit={setLimit}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setPage={setPage}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
          />
        </Suspense>
      </PageLayout>
    </>
  );
}

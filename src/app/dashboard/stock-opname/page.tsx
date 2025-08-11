'use client';

import { useListProductStockOpnames } from '@/__generated__/api/hooks/product.hooks';
import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useSearchParams } from '@/modules/stock-opname/hooks/use-search-params';
import { Plus } from '@icon-park/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';

const FilterStockOpname = dynamic(
  () => import('@/modules/stock-opname/components/filter-stock-opname'),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`item-${i}`} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    ),
  }
);

const TableStockOpname = dynamic(
  () => import('@/modules/stock-opname/components/table-stock-opname'),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'Tanggal Opname',
                  'Tujuan Opname',
                  'Nama Toko',
                  'Jumlah Produk',
                  'Penanggung Jawab',
                  'Aksi',
                ].map((_, i) => (
                  <th key={`item-${i}`} className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={`item-${i}`} className="border-b">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
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
                <div key={`item-${i}`} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function StockOpnamePage() {
  const router = useRouter();
  const {
    page,
    setPage,
    perPage,
    setPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    from,
    setFrom,
    to,
    setTo,
  } = useSearchParams();

  const { data, isLoading } = useListProductStockOpnames({
    start_date: from,
    end_date: to,
    search: '',
    page: page,
    per_page: perPage,
    sort_by: sortBy,
    sort_direction: sortOrder,
  });

  const mappedStockOpnames = data?.data?.map((item) => ({
    id: String(item.id),
    opname_date: item.date_inspection,
    opname_purpose: item.note,
    store_name: item.store_name,
    product_count: String(item.total_items),
    responsible_person: item.person_in_charge,
  }));

  return (
    <>
      <PageLayout
        title="Stock Opname"
        button={
          <Button variant="primary" onClick={() => router.push('/dashboard/store/add')}>
            <Plus />
            Tambah Penyesuaian Stock Opname
          </Button>
        }
      >
        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`item-${i}`} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <FilterStockOpname
            loadingDataStockOpname={false}
            from={from}
            to={to}
            setTo={setTo}
            setFrom={setFrom}
          />
        </Suspense>

        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        'Tanggal Opname',
                        'Tujuan Opname',
                        'Nama Toko',
                        'Jumlah Produk',
                        'Penanggung Jawab',
                        'Aksi',
                      ].map((_, i) => (
                        <th key={`item-${i}`} className="px-6 py-3 text-left">
                          <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <tr key={`item-${i}`} className="border-b">
                        {Array.from({ length: 6 }).map((_, j) => (
                          <td key={`cell-${j}`} className="px-6 py-4">
                            {j === 5 ? (
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
          <TableStockOpname
            stockOpnames={mappedStockOpnames ?? []}
            limit={perPage}
            setLimit={setPerPage}
            sortBy={sortBy}
            sortOrder={sortOrder}
            page={page}
            setPage={(page) => setPage(page)}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            isLoading={isLoading}
            totalPages={data?.pagination.last_page ?? 1}
          />
        </Suspense>
      </PageLayout>
    </>
  );
}

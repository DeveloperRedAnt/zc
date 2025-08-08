'use client';

import { useListProductStockOpnames } from '@/__generated__/api/hooks/product.hooks';
import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import FilterStockOpname from '@/modules/stock-opname/components/filter-stock-opname';
import TableStockOpname from '@/modules/stock-opname/components/table-stock-opname';
import { useSearchParams } from '@/modules/stock-opname/hooks/use-search-params';
import { Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import React from 'react';

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
        <FilterStockOpname
          loadingDataStockOpname={false}
          from={from}
          to={to}
          setTo={setTo}
          setFrom={setFrom}
        />
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
      </PageLayout>
    </>
  );
}

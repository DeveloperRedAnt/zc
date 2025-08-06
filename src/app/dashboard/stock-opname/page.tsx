'use client';

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
          page={page}
          limit={perPage}
          setLimit={setPerPage}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setPage={setPage}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </PageLayout>
    </>
  );
}

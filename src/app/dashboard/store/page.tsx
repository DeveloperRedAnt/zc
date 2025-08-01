'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import FilterStore from '@/modules/store/components/filter-store';
import TableStore from '@/modules/store/components/table-store';
import { useSearchParams } from '@/modules/store/hooks/use-search-params';
import { Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import React from 'react';

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
        <FilterStore search={search} setSearch={setSearch} />
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
      </PageLayout>
    </>
  );
}

'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import FilterUserList from '@/modules/user/components/filter-user-list';
import TableUser from '@/modules/user/components/table-user';
import { useSearchParams } from '@/modules/user/hooks/use-search-params';
import { Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  const {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    setStatus,
    status,
  } = useSearchParams();

  return (
    <PageLayout
      title="List User"
      button={
        <Button
          variant="outline"
          onClick={() => {
            router.push('/dashboard/users/create');
          }}
        >
          <Plus />
          Tambah User
        </Button>
      }
    >
      <FilterUserList search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
      <TableUser
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </PageLayout>
  );
}

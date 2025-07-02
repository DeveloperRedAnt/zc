'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import FilterUserList from '@/modules/user/components/filter-user-list';
import TablerUser from '@/modules/user/components/table-user';
import { Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  return (
    <PageLayout
      title="List User"
      button={
        <Button variant="outline" onClick={() => router.push('/dashboard/users/add')}>
          <Plus />
          Tambah User
        </Button>
      }
    >
      <FilterUserList />
      <TablerUser />
    </PageLayout>
  );
}

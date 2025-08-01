'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import { Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  return (
    <PageLayout
      title="Detail Penjualan"
      button={
        <Button variant="outline" onClick={() => router.push('/dashboard/users/add')}>
          <Plus />
          Tambah User
        </Button>
      }
    >
      <p>Detail Penjualan</p>
    </PageLayout>
  );
}

'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  return (
    <PageLayout
      title="Detail User"
      button={
        <Button variant="default" onClick={() => router.push('/dashboard/users/form')}>
          Edit
        </Button>
      }
    >
      <p>vhvhvhv</p>
    </PageLayout>
  );
}

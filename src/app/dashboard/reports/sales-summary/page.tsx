'use client';

import { Button } from '@/components/button/button';
import { PageSection } from '@/components/page-section/page-section';
import { SummaryChart } from '@/modules/reports/sales-summary/components/summary-chart';
import SummaryTable from '@/modules/reports/sales-summary/components/summary-table';
import { Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  return (
    <>
      <PageSection title="Bar Chart Ringkasan Penjualan">
        <SummaryChart />
      </PageSection>
      <PageSection
        title="Ringkasan Penjualan"
        button={
          <Button variant="outline" onClick={() => router.push('/dashboard/users/add')}>
            <Plus />
            Tambah User
          </Button>
        }
      >
        <SummaryTable />
      </PageSection>
    </>
  );
}

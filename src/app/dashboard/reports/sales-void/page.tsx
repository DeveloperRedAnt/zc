'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import { SalesVoidTable } from '@/modules/reports/sales-void/components/sales-void-table';

export default function page() {
  return (
    <PageLayout title="Laporan Void">
      <SalesVoidTable />
    </PageLayout>
  );
}

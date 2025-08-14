'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import { VoidReportTable } from '@/modules/reports/sales-cashier/components';

export default function page() {
  return (
    <PageLayout title="Penjualan per Kasir">
      <VoidReportTable />
    </PageLayout>
  );
}

'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import { SalesProfitLossTable } from '@/modules/reports/sales-profit-loss/components/sales-profit-loss-table';

export default function page() {
  return (
    <PageLayout title="Laporan Laba Rugi">
      <SalesProfitLossTable />
    </PageLayout>
  );
}

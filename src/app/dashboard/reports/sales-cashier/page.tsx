'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import { SalesCashierTable } from '@/modules/reports/sales-cashier/components/sales-cashier-table';

export default function page() {
  return (
    <PageLayout title="Penjualan per Kasir">
      <SalesCashierTable />
    </PageLayout>
  );
}

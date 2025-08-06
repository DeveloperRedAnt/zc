'use client';
import { PageLayout } from '@/components/page-layout/page-layout';
import { FilterCashierTable } from '@/modules/reports/sales-details/components/filter-sales-detail';
import SalesDetailsTable from '@/modules/reports/sales-details/components/table-sales-detail';

export default function page() {
  return (
    <PageLayout title="Detail Penjualan">
      <FilterCashierTable responsiblePersonOptions={[]} cashierOptions={[]} />
      <SalesDetailsTable />
    </PageLayout>
  );
}

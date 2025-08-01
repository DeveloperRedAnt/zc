'use client';

import { PageSection } from '@/components/page-section/page-section';
import { SalesProductChart } from '@/modules/reports/sales-product/components/sales-product-chart';
import { SalesProductTable } from '@/modules/reports/sales-product/components/sales-product-table';

export default function page() {
  return (
    <>
      <PageSection title="Bar Chart Ringkasan Penjualan">
        <SalesProductChart />
      </PageSection>
      <PageSection title="Ringkasan Penjualan">
        <SalesProductTable />
      </PageSection>
    </>
  );
}

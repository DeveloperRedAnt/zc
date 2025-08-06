'use client';

import { PageSection } from '@/components/page-section/page-section';
import { SalesProductChart } from '@/modules/reports/sales-product/components/sales-product-chart';
import { SalesProductTable } from '@/modules/reports/sales-product/components/sales-product-table';

export default function page() {
  return (
    <>
      <PageSection title="Bar Chart Ringkasan Penjualan">
        <h6>Pie Chart Penjualan</h6>
        <span className="text-sm">
          Minggu 1 (1 Jan - 7 Jan 2025) - Minggu 3 (15 Jan -21 Jan 2025)
        </span>
        <SalesProductChart />
      </PageSection>
      <PageSection title="Ringkasan Penjualan">
        <SalesProductTable />
      </PageSection>
    </>
  );
}

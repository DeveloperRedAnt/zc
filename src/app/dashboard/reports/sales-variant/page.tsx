'use client';

import { PageSection } from '@/components/page-section/page-section';
import { SalesVariantChart } from '@/modules/reports/sales-variant/components/sales-variant-chart';
import { SalesVariantTable } from '@/modules/reports/sales-variant/components/sales-variant-table';

export default function page() {
  return (
    <>
      <PageSection title="Pie Chart Penjualan Varian">
        <SalesVariantChart />
      </PageSection>
      <PageSection title="Penjualan Varian">
        <SalesVariantTable />
      </PageSection>
    </>
  );
}

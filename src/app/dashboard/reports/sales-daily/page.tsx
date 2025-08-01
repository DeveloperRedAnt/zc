'use client';

import { PageSection } from '@/components/page-section/page-section';
import { SalesDailyChart } from '@/modules/reports/sales-daily/components/sales-daily-chart';
import SalesDailyTable from '@/modules/reports/sales-daily/components/sales-daily-table';

export default function page() {
  return (
    <>
      <PageSection title="Bar Chart Ringkasan Penjualan">
        <SalesDailyChart />
      </PageSection>
      <PageSection title="Ringkasan Penjualan">
        <SalesDailyTable />
      </PageSection>
    </>
  );
}

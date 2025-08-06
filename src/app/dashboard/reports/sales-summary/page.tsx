'use client';

import { PageSection } from '@/components/page-section/page-section';
import { FilterCashierTable } from '@/modules/reports/sales-details/components/filter-sales-detail';

import { Period } from '@/components/popup-datepicker/types-datepircker-popup';
import { SummaryChart } from '@/modules/reports/sales-summary/components/summary-chart';
import { SummaryTable } from '@/modules/reports/sales-summary/components/summary-table';
import { CardComponentFilter } from '@/modules/reports/sales-variant/components/card-component-filter';

interface FilterData {
  period: Period | undefined;
  productName: string;
  variantName: string;
  storeName: string;
}

export default function page() {
  const handleFilterChange = (_filters: FilterData) => {};
  return (
    <>
      <PageSection title="Bar Chart Ringkasan Penjualan">
        <CardComponentFilter title={'Bar Chart Ringkasan Penjualan'} subtitle="2020 - 2022">
          <FilterCashierTable onFilterChange={handleFilterChange} responsiblePersonOptions={[]} />
          <SummaryChart />
        </CardComponentFilter>
      </PageSection>
      <PageSection title="Ringkasan Penjualan">
        <SummaryTable />
      </PageSection>
    </>
  );
}

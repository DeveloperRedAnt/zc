'use client';

import { PageSection } from '@/components/page-section/page-section';
import { Period } from '@/components/popup-datepicker/types-datepircker-popup';
import { FilterSalesDailyTable } from '@/modules/reports/sales-daily/components/filter-sales-daily';
import { SalesDailyChart } from '@/modules/reports/sales-daily/components/sales-daily-chart';
import SalesDailyTable from '@/modules/reports/sales-daily/components/sales-daily-table';
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
      <CardComponentFilter title={'Line Chart Penjualan Harian'} subtitle="2020 - 2022">
        <FilterSalesDailyTable onFilterChange={handleFilterChange} responsiblePersonOptions={[]} />
        <SalesDailyChart />
      </CardComponentFilter>

      <PageSection title="Ringkasan Penjualan">
        <SalesDailyTable />
      </PageSection>
    </>
  );
}

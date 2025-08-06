'use client';

import { PageSection } from '@/components/page-section/page-section';
import { Period } from '@/components/popup-datepicker/types-datepircker-popup';
import { CardComponentFilter } from '@/modules/reports/sales-variant/components/card-component-filter';
import { SalesVariantChart } from '@/modules/reports/sales-variant/components/sales-variant-chart';
import { SalesVariantTable } from '@/modules/reports/sales-variant/components/sales-variant-table';
import { FilterSalesVariantData } from '@/modules/reports/sales-variant/form-report-variant';

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
      <CardComponentFilter
        title={'Pie Chart Penjualan Varian'}
        subtitle="Minggu 1 (1 Jan - 7 Jan 2025) - Minggu 3 (15 Jan – 21 Jan 2025)"
      >
        <FilterSalesVariantData onFilterChange={handleFilterChange} />
        <SalesVariantChart />
      </CardComponentFilter>
      <PageSection title="Penjualan Varian">
        <SalesVariantTable />
      </PageSection>
    </>
  );
}

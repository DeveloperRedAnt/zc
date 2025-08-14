'use client';

import { useSalesVariantData } from '@/__generated__/api/hooks/reports/sales-variant.hooks';
import { PageSection } from '@/components/page-section/page-section';
import { SalesVariantChart } from '@/modules/reports/sales-variant/components/sales-variant-chart';
import { SalesVariantFilter } from '@/modules/reports/sales-variant/components/sales-variant-filter';
import { SalesVariantTable } from '@/modules/reports/sales-variant/components/sales-variant-table';
import { useSalesVariantFilters } from '@/modules/reports/sales-variant/hooks/use-sales-variant-filter';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function SalesVariantPage() {
  const { graphData, tableData, isLoading, error } = useSalesVariantData();
  const { filters } = useSalesVariantFilters();

  // Format periode untuk display
  let periodText = '';
  if (filters.start_date && filters.end_date) {
    const startDate = new Date(filters.start_date);
    const endDate = new Date(filters.end_date);
    periodText = `${format(startDate, 'd MMM yyyy', { locale: id })} - ${format(
      endDate,
      'd MMM yyyy',
      { locale: id }
    )}`;
  } else {
    // Default ke bulan ini jika tidak ada tanggal
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    periodText = `${format(startOfCurrentMonth, 'd MMM yyyy', { locale: id })} - ${format(
      endOfCurrentMonth,
      'd MMM yyyy',
      { locale: id }
    )}`;
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center text-red-600">Terjadi kesalahan saat memuat data</div>
      </div>
    );
  }

  return (
    <>
      <PageSection title="Pie Chart Penjualan Varian">
        <span className="text-grey">{periodText}</span>
        <SalesVariantFilter />
        <SalesVariantChart data={graphData} isLoading={isLoading} />
      </PageSection>

      <PageSection title="Penjualan Produk">
        <SalesVariantTable tableData={tableData} isLoading={isLoading} />
      </PageSection>
    </>
  );
}

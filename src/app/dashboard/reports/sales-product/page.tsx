'use client';

import { useSalesProductData } from '@/__generated__/api/hooks/reports/sales-product.hooks';
import { PageSection } from '@/components/page-section/page-section';
import { SalesProductChart } from '@/modules/reports/sales-product/components/sales-product-chart';
import { SalesProductFilter } from '@/modules/reports/sales-product/components/sales-product-filter';
import { SalesProductTable } from '@/modules/reports/sales-product/components/sales-product-table';
import { useSalesProductFilters } from '@/modules/reports/sales-product/hooks/use-sales-product-filter';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function SalesProductPage() {
  const { graphData, tableData, isLoading, error } = useSalesProductData();
  const { filters } = useSalesProductFilters();

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
      <PageSection title="Pie Chart Penjualan">
        <span className="text-grey">{periodText}</span>
        <SalesProductFilter />
        <SalesProductChart data={graphData} isLoading={isLoading} />
      </PageSection>

      <PageSection title="Penjualan Produk">
        <SalesProductTable tableData={tableData} isLoading={isLoading} />
      </PageSection>
    </>
  );
}

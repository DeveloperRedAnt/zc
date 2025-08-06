import { Period } from '@/components/popup-datepicker/types-datepircker-popup';
import { FilterSalesVariantData } from './form-report-variant';

interface FilterData {
  period: Period | undefined;
  productName: string;
  variantName: string;
  storeName: string;
}

export function SalesVariantReport() {
  const handleFilterChange = (_filters: FilterData) => {
    // You can make API calls, update state, etc.
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Laporan Penjualan Varian</h1>
      <FilterSalesVariantData onFilterChange={handleFilterChange} />
      {/* Add your table or chart components here */}
    </div>
  );
}

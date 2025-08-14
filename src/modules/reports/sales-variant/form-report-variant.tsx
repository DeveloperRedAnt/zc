import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import { Period } from '@/components/popup-datepicker/types-datepircker-popup';
import { SelectFilter } from '@/modules/reports/sales-void/components/select-filter';
import { useEffect, useState } from 'react';

interface FilterData {
  period: Period | undefined;
  productName: string;
  variantName: string;
  storeName: string;
}

interface FilterSalesVariantProps {
  onFilterChange: (filters: FilterData) => void;
}

export function FilterSalesVariantData({ onFilterChange }: FilterSalesVariantProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedVariant, setSelectedVariant] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<string>('all');

  useEffect(() => {
    onFilterChange({
      period: selectedPeriod,
      productName: selectedProduct,
      variantName: selectedVariant,
      storeName: selectedStore,
    });
  }, [selectedPeriod, selectedProduct, selectedVariant, selectedStore, onFilterChange]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Periode</label>
          <DateRangePicker
            initialPeriod={selectedPeriod}
            onApply={(period) => {
              setSelectedPeriod(period);
            }}
            className="max-w-md h-12 bg-white w-[278px]"
          />
        </div>
        <div className="space-y-2">
          <SelectFilter
            value={selectedProduct}
            onChange={setSelectedProduct}
            options={[]}
            label="Semua Produk"
            placeholder="Semua Produk"
            id="Semua Produk-void"
            allOptionValue="all-responsible"
          />
        </div>

        <div className="space-y-2">
          <SelectFilter
            value={selectedVariant}
            onChange={setSelectedVariant}
            options={[]}
            label="Nama Varian"
            placeholder="Nama Varian"
            id="nama-varian-void"
            allOptionValue="all-responsible"
          />
        </div>

        <div className="space-y-2">
          <SelectFilter
            value={selectedStore}
            onChange={setSelectedStore}
            options={[]}
            label="Semua Toko"
            placeholder="Semua Toko"
            id="semua-varian-void"
            allOptionValue="all-responsible"
          />
        </div>
      </div>
    </>
  );
}

import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { getMonthRange } from '@/utils/dateRange';
import { Down } from '@icon-park/react';

type FilterOption = {
  value: string;
  label: string;
};

type FilterCashierTableProps = {
  productOptions: FilterOption[];
  cashierOptions: FilterOption[];
  isLoading?: boolean;
  onCashierChange?: (cashier: string | undefined) => void;
  onProductChange?: (productId: string | undefined) => void;
  onDateRangeChange?: (startDate: string | undefined, endDate: string | undefined) => void;
  onDateRangeReset?: () => void;
  selectedCashier?: string;
  selectedProduct?: string;
  startDate?: string;
  endDate?: string;
  defaultDateRange?: { start: string; end: string };
};

export function FilterCashierTable({
  productOptions = [],
  cashierOptions = [],
  isLoading = false,
  onCashierChange,
  onProductChange,
  onDateRangeChange,
  onDateRangeReset,
  selectedCashier,
  selectedProduct,
  startDate,
  endDate,
  defaultDateRange,
}: FilterCashierTableProps) {
  // Create a stable reference for default range
  const stableDefaultRange = defaultDateRange || getMonthRange();

  const handleCashierChange = (value: string) => {
    if (value === 'all') {
      onCashierChange?.(undefined);
    } else {
      onCashierChange?.(value);
    }
  };

  const handleProductChange = (value: string) => {
    if (value === 'all') {
      onProductChange?.(undefined);
    } else {
      onProductChange?.(value);
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 mb-6 p-4 bg-white shadow-sm">
        <div className="flex flex-col gap-2 min-w-[200px]">
          <label className="text-sm font-medium text-gray-700">Tanggal</label>
          <div className="h-10 bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 min-w-[200px]">
          <label className="text-sm font-medium text-gray-700">Kasir</label>
          <div className="h-10 bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 min-w-[200px]">
          <label className="text-sm font-medium text-gray-700">Produk</label>
          <div className="h-10 bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 mb-6 p-4 bg-white shadow-sm">
      <div className="flex flex-col gap-2 min-w-[200px]">
        <label className="text-sm font-medium text-gray-700">Periode Tanggal</label>
        <DateRangePicker
          allowedViews={['daily', 'weekly', 'monthly', 'quarterly']}
          initialPeriod={{
            type: 'daily',
            value: {
              from: startDate ? new Date(startDate) : new Date(stableDefaultRange.start),
              to: endDate ? new Date(endDate) : new Date(stableDefaultRange.end),
            },
          }}
          onApply={(period) => {
            const startDateStr = period?.value?.from
              ? period.value.from instanceof Date
                ? period.value.from.toISOString().slice(0, 10)
                : String(period.value.from)
              : undefined;

            const endDateStr = period?.value?.to
              ? period.value.to instanceof Date
                ? period.value.to.toISOString().slice(0, 10)
                : String(period.value.to)
              : undefined;

            onDateRangeChange?.(startDateStr, endDateStr);
          }}
          onReset={() => {
            // Call the reset handler to clear all query params
            onDateRangeReset?.();
          }}
          className="max-w-md h-13 bg-white w-[278px]"
        />
      </div>

      <div className="flex flex-col gap-2 min-w-[200px]">
        <label className="text-sm font-medium text-gray-700">Filter Kasir</label>
        <Select
          value={selectedCashier ? selectedCashier.toString() : 'all'}
          onValueChange={handleCashierChange}
        >
          <SelectTrigger className="w-full" icon={<Down className="h-4 w-4" />}>
            <SelectValue placeholder="Pilih Kasir" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kasir</SelectItem>
            {cashierOptions.map((cashier) => (
              <SelectItem key={cashier.value} value={cashier.value.toString()}>
                {cashier.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 min-w-[200px]">
        <label className="text-sm font-medium text-gray-700">Filter Produk</label>
        <Select
          value={selectedProduct ? selectedProduct.toString() : 'all'}
          onValueChange={handleProductChange}
        >
          <SelectTrigger className="w-full" icon={<Down className="h-4 w-4" />}>
            <SelectValue placeholder="Pilih Produk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Produk</SelectItem>
            {productOptions.map((product) => (
              <SelectItem key={product.value} value={product.value.toString()}>
                {product.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

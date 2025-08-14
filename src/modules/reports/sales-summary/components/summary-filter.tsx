// summary-filter.tsx
import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import { PeriodType } from '@/components/popup-datepicker/types-datepircker-popup';
import { getMonthRange } from '@/utils/dateRange';
// import { SelectToko } from '@/modules/stock-variant/select-toko';
import dynamic from 'next/dynamic';

type StoreOption = {
  value: string;
  label: string;
};

type SummaryFilterProps = {
  onStoreChange?: (storeOption: StoreOption | null) => void;
  onDateRangeChange?: (
    startDate: string | undefined,
    endDate: string | undefined,
    periodeType: string
  ) => void;
  onDateRangeReset?: () => void;
  selectedStore?: StoreOption | null;
  startDate?: string;
  endDate?: string;
  periodeType?: string;
  defaultDateRange?: { start: string; end: string };
};
const TokoDropdown = dynamic(
  () => import('../../sales-cashier/shared-components/select-toko').then((mod) => mod.TokoDropdown),
  { ssr: false }
);

export function SummaryFilter({
  onStoreChange,
  onDateRangeChange,
  onDateRangeReset,
  selectedStore,
  startDate,
  endDate,
  periodeType,
  defaultDateRange,
}: SummaryFilterProps) {
  // Create a stable reference for default range
  const stableDefaultRange = defaultDateRange || getMonthRange();

  const handleStoreChange = (option: StoreOption | null) => {
    onStoreChange?.(option);
  };

  return (
    <div className="flex gap-4 mb-6 p-4 bg-white shadow-sm">
      <div className="flex flex-col gap-2 min-w-[200px]">
        <label className="text-sm font-medium text-gray-700">Periode Tanggal</label>
        <DateRangePicker
          allowedViews={['daily', 'monthly', 'quarterly', 'yearly']}
          initialPeriod={{
            type: (periodeType as PeriodType) || 'daily',
            value: {
              from: startDate ? new Date(startDate) : new Date(stableDefaultRange.start),
              to: endDate ? new Date(endDate) : new Date(stableDefaultRange.end),
            },
          }}
          // Set default ranges for reset functionality
          //   defaultDailyRange={{
          //     from: new Date(stableDefaultRange.start),
          //     to: new Date(stableDefaultRange.end),
          //   }}
          onApply={(period) => {
            if (period?.value) {
              const { from, to } = period.value as { from: Date; to: Date };

              // Helper function untuk format date tanpa timezone issues
              const formatDateLocal = (date: Date): string => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
              };

              if (from && to) {
                const startDateStr = from instanceof Date ? formatDateLocal(from) : String(from);
                const endDateStr = to instanceof Date ? formatDateLocal(to) : String(to);
                onDateRangeChange?.(startDateStr, endDateStr, period.type);
              }
            }
          }}
          onReset={() => {
            // Call the reset handler to clear all query params
            onDateRangeReset?.();
          }}
          className="max-w-md h-13 bg-white w-[278px]"
        />
      </div>

      <div className="flex flex-col gap-2 min-w-[200px]">
        <TokoDropdown
          label="Pilih Toko"
          value={selectedStore}
          onChange={handleStoreChange}
          className="w-[278px]"
        />
      </div>
    </div>
  );
}

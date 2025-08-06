import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import { Period } from '@/modules/reports/sales-payment/types';

interface DateRangeSectionProps {
  onApply: (period: Period) => void;
  defaultDailyRange: {
    from: Date;
    to: Date;
  };
  defaultMonthlyRange: {
    from: Date;
  };
  defaultQuarterlyRange: {
    from: {
      quarter: number;
      year: number;
    };
  };
  defaultYearlyRange: {
    from: number;
    to?: number;
  };
  className?: string;
}

export default function DateRangeSection({
  onApply,
  defaultDailyRange = {
    from: new Date(2025, 6, 17),
    to: new Date(2025, 6, 19),
  },
  defaultMonthlyRange = {
    from: new Date(2025, 6, 1),
  },
  defaultQuarterlyRange = {
    from: { quarter: 1, year: 2025 },
  },
  defaultYearlyRange = {
    from: 2020,
    to: 2022,
  },
  className = '',
}: DateRangeSectionProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex flex-col gap-2">
        <label htmlFor="periode" className="text-sm font-medium text-gray-700">
          Periode
        </label>
        <DateRangePicker
          onApply={onApply}
          defaultDailyRange={defaultDailyRange}
          defaultMonthlyRange={defaultMonthlyRange}
          defaultQuarterlyRange={defaultQuarterlyRange}
          defaultYearlyRange={defaultYearlyRange}
          className="max-w-md h-12 bg-white w-[278px]"
        />
      </div>
    </div>
  );
}

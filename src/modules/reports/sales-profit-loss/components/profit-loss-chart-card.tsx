import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { Period } from '@/modules/reports/sales-payment/types';
import DateRangeSection from './date-ranger-section';

interface ProfitLossChartCardProps {
  title: string;
  dateRange: string;
  hppValue: string;
  revenueValue: string;
  marginPercentage: string;
  dateRangePickerProps: {
    onApply: (period: Period) => void;
    defaultDailyRange: { from: Date; to: Date };
    defaultMonthlyRange: { from: Date };
    defaultQuarterlyRange: { from: { quarter: number; year: number } };
    defaultYearlyRange: { from: number; to?: number };
  };
}

// Helper function to extract numeric value from currency string
const extractNumericValue = (value: string): number => {
  return (
    parseFloat(
      value
        .replace(/[^\d.,]/g, '')
        .replace(/\./g, '')
        .replace(',', '.')
    ) || 0
  );
};

// Chart bar component
interface ChartBarProps {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

function ChartBar({ label, value, percentage, color }: ChartBarProps) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="w-48 flex-shrink-0">
        <span className="text-gray-700">{label}</span>
      </div>
      <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-in-out ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="w-32 flex-shrink-0 text-right">
        <span className="font-medium text-gray-900">{value}</span>
      </div>
    </div>
  );
}

export default function ProfitLossChartCard({
  title,
  dateRange,
  hppValue,
  revenueValue,
  marginPercentage,
  dateRangePickerProps,
}: ProfitLossChartCardProps) {
  // Calculate percentages for chart bars
  const hppNumeric = extractNumericValue(hppValue);
  const revenueNumeric = extractNumericValue(revenueValue);
  const maxValue = Math.max(hppNumeric, revenueNumeric);

  const hppPercentage = maxValue > 0 ? (hppNumeric / maxValue) * 100 : 0;
  const revenuePercentage = maxValue > 0 ? (revenueNumeric / maxValue) * 100 : 0;

  return (
    <Card className="w-full shadow-none border-none mb-3">
      <CardHeader className="px-4 py-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{dateRange}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-4 pb-4">
        <DateRangeSection {...dateRangePickerProps} />

        {/* Chart Bars */}
        <div className="flex flex-col gap-4">
          <ChartBar
            label="Total HPP"
            value={hppValue}
            percentage={hppPercentage}
            color="bg-cyan-500"
          />

          <ChartBar
            label="Total Pendapatan Penjualan"
            value={revenueValue}
            percentage={revenuePercentage}
            color="bg-cyan-300"
          />
        </div>

        {/* Margin Percentage */}
        <div className="flex items-center gap-4 text-sm pt-2">
          <div className="w-48 flex-shrink-0">
            <span className="text-gray-700">Persentase Margin</span>
          </div>
          <div className="w-32 flex-shrink-0 text-left">
            <span className="font-medium text-gray-900">{marginPercentage}</span>
          </div>
          <div className="flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}

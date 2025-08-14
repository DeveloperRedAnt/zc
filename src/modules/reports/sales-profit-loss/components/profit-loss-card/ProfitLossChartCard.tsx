import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import type { PeriodType } from '@/components/popup-datepicker/types-datepircker-popup';
import { SetStateAction } from 'react';
import ChartBar from '../../shared-components/ChartBar';

interface ProfitLossChartCardProps {
  title: string;
  labeldateRange?: string;
  hppValue: string | number;
  revenueValue: string | number;
  presentaseHpp: number;
  presentaseRevenue: number;
  startDate: string | null;
  endDate: string | null;
  setStartDate: (
    value: SetStateAction<string | null>,
    options?: { history?: 'push' | 'replace' }
  ) => Promise<URLSearchParams>;
  setEndDate: (
    value: SetStateAction<string | null>,
    options?: { history?: 'push' | 'replace' }
  ) => Promise<URLSearchParams>;
  setGrouping: (
    value: string,
    options?: { history?: 'push' | 'replace' }
  ) => Promise<URLSearchParams>;
}

function extractNumericValue(value: string | number): number {
  if (typeof value === 'number') return value;
  const cleaned = value.replace(/[^\d.,-]/g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getPercentages(hppValue: string | number, revenueValue: string | number) {
  const hppNumeric = extractNumericValue(hppValue);
  const revenueNumeric = extractNumericValue(revenueValue);
  const maxValue = Math.max(hppNumeric, revenueNumeric);

  const hppPercentage = maxValue > 0 ? (hppNumeric / maxValue) * 100 : 0;
  const revenuePercentage = maxValue > 0 ? (revenueNumeric / maxValue) * 100 : 0;

  return { hppPercentage, revenuePercentage };
}

export default function ProfitLossChartCard({
  title,
  labeldateRange,
  hppValue,
  revenueValue,
  presentaseHpp,
  presentaseRevenue,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setGrouping,
}: ProfitLossChartCardProps) {
  const { hppPercentage, revenuePercentage } = getPercentages(hppValue, revenueValue);

  const formatDateLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Card className="w-full shadow-none border-none mb-3">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <span className="text-xs text-gray-500">{labeldateRange}</span>
        </div>
      </CardHeader>
      {/* DatePicker di baris sendiri */}
      <div className="px-4 pt-4">
        <DateRangePicker
          allowedViews={['weekly', 'monthly', 'quarterly', 'daily'] as PeriodType[]}
          initialPeriod={{
            type: 'monthly',
            value: {
              from: startDate ? new Date(startDate) : new Date(),
              to: endDate ? new Date(endDate) : new Date(),
            },
          }}
          onApply={(period) => {
            if (period?.type) {
              setGrouping(period.type);
            }
            if (period?.value) {
              const { from, to } = period.value as { from: Date; to: Date };
              if (from) setStartDate(formatDateLocal(from));
              if (to) setEndDate(formatDateLocal(to));
            }
          }}
          className="max-w-md h-13 bg-white w-[278px]"
        />
      </div>
      <CardContent className="flex flex-row items-center gap-8 px-4 py-6">
        {/* Chart Bars */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="relative">
            <ChartBar
              label="Total HPP"
              value={hppValue.toString()}
              percentage={hppPercentage}
              color="bg-[#4BA1C8]"
            />
          </div>
          <div className="relative">
            <ChartBar
              label="Total Pendapatan Penjualan"
              value={revenueValue.toString()}
              percentage={revenuePercentage}
              color="bg-[#97D9F6]"
            />
          </div>
        </div>
        {/* Divider */}
        <div className="w-px h-20 bg-gray-200 mx-6" />
        {/* Margin Info */}
        <div className="flex flex-col gap-4 min-w-[180px]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Persentase Margin</span>
            <span className="font-semibold">{presentaseHpp} %</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Nominal Margin</span>
            <span className="font-semibold">
              {presentaseRevenue?.toLocaleString
                ? presentaseRevenue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : presentaseRevenue}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

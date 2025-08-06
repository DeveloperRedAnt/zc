import { PageLayout } from '@/components/page-layout/page-layout';
import { Period } from '@/modules/reports/sales-payment/types';
import ProfitLossChartCard from '@/modules/reports/sales-profit-loss/components/profit-loss-chart-card';
import { SalesProfitLossTable } from '@/modules/reports/sales-profit-loss/components/sales-profit-loss-table';

interface LaporanLabaRugiPageProps {
  chartTitle: string;
  chartDateRange: string;
  hppValue: string;
  revenueValue: string;
  marginPercentage: string;
  deviceId?: string;
  storeId?: string;
  dateRangePickerProps: {
    onApply: (period: Period) => void;
    defaultDailyRange: { from: Date; to: Date };
    defaultMonthlyRange: { from: Date };
    defaultQuarterlyRange: { from: { quarter: number; year: number } };
    defaultYearlyRange: { from: number; to?: number };
  };
}

export function LaporanLabaRugiPage({
  chartTitle = 'Bar Chart Laporan Laba Rugi',
  chartDateRange = '15 Januari 2025 - 21 Januari 2025',
  hppValue = 'Rp 13.842.095',
  revenueValue = 'Rp 15.123.668',
  marginPercentage = '5%',
  deviceId = '1',
  storeId = '1',
  dateRangePickerProps,
}: LaporanLabaRugiPageProps) {
  // const [selectedPeriod] = useState<Period>({
  //   type: 'daily',
  //   value: {
  //     from: new Date(2025, 0, 15), // January 15, 2025
  //     to: new Date(2025, 0, 21)    // January 21, 2025
  //   }
  // });

  return (
    <>
      <ProfitLossChartCard
        title={chartTitle}
        dateRange={chartDateRange}
        hppValue={hppValue}
        revenueValue={revenueValue}
        marginPercentage={marginPercentage}
        dateRangePickerProps={dateRangePickerProps}
      />
      <PageLayout title="Laporan Laba Rugi">
        <SalesProfitLossTable deviceId={deviceId} storeId={storeId} />
      </PageLayout>
    </>
  );
}

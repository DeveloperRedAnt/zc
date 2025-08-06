'use client';

import { Period } from '@/modules/reports/sales-payment/types';
import { LaporanLabaRugiPage } from '@/modules/reports/sales-profit-loss/components/laporan-laba-rugi';

export default function page() {
  const dateRangePickerProps = {
    onApply: (_period: Period) => {},
    defaultDailyRange: {
      from: new Date(2025, 6, 17),
      to: new Date(2025, 6, 19),
    },
    defaultMonthlyRange: {
      from: new Date(2025, 6, 1),
    },
    defaultQuarterlyRange: {
      from: { quarter: 1, year: 2025 },
    },
    defaultYearlyRange: {
      from: 2020,
      to: 2022,
    },
  };
  return (
    <>
      <LaporanLabaRugiPage
        chartTitle="Laporan Laba Rugi Bulan Januari"
        chartDateRange="1 Januari 2025 - 31 Januari 2025"
        hppValue="Rp 13.842.095"
        revenueValue="Rp 15.123.668"
        marginPercentage="5%"
        dateRangePickerProps={dateRangePickerProps}
      />
    </>
  );
}

'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { Period, PieChartDataEntry } from '@/modules/reports/sales-payment/types';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const TotalTransactionAmount = dynamic(
  () =>
    import(
      '@/modules/reports/sales-payment/components/card-transaction/total-transaction-amount'
    ).then((mod) => ({ default: mod.TotalTransactionAmount })),
  {
    loading: () => <div className="h-20 bg-gray-200 rounded animate-pulse" />,
  }
);

const TransactionStatCard = dynamic(
  () =>
    import(
      '@/modules/reports/sales-payment/components/card-transaction/tunai-debit-qris-voucher'
    ).then((mod) => ({ default: mod.TransactionStatCard })),
  {
    loading: () => <div className="h-16 bg-gray-200 rounded animate-pulse" />,
  }
);

import { transactionStats } from '@/modules/reports/sales-payment/constant';

const pieChartData: PieChartDataEntry[] = [
  { name: 'Tunai', value: 275, fill: '#4F46E5' },
  { name: 'Debit / Kredit', value: 200, fill: '#313e40' },
  { name: 'QRIS', value: 187, fill: '#F59E42' },
  { name: 'Voucher', value: 173, fill: '#F43F5E' },
];

const chartConfig = {
  Tunai: {
    label: 'Tunai',
    color: '##5252E0',
  },
  'Debit / Kredit': {
    label: 'Debit / Kredit',
    color: '#22D3EE',
  },
  QRIS: {
    label: 'QRIS',
    color: '#F59E42',
  },
  Voucher: {
    label: 'Voucher',
    color: '#EB6347',
  },
};

const ChartPie = dynamic(() => import('@/modules/reports/sales-payment/chart/chart-pie'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="h-48 w-48 bg-gray-200 rounded-full animate-pulse" />
    </div>
  ),
});

export default function Index() {
  const totalTransactions = pieChartData.reduce((sum, entry) => sum + entry.value, 0);
  const [_selectedPeriod, setSelectedPeriod] = React.useState<Period>({
    type: 'daily',
    value: {
      from: new Date(2025, 6, 17),
      to: new Date(2025, 6, 19),
    },
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Laporan Jenis Bayar</h1>
      <div className="flex flex-col md:flex-row justify-start gap-4 mb-6">
        <div className="flex flex-col max-w-xs w-full">
          <label htmlFor="period-select" className="block text-base font-medium text-gray-700">
            Periode
          </label>
          <DateRangePicker
            initialPeriod={{
              type: 'daily',
              value: {
                from: new Date(2025, 6, 17),
                to: new Date(2025, 6, 19),
              },
            }}
            onApply={(period) => {
              setSelectedPeriod(period);
            }}
            defaultDailyRange={{
              from: new Date(2025, 6, 17),
              to: new Date(2025, 6, 19),
            }}
            defaultMonthlyRange={{
              from: new Date(2025, 6, 1),
            }}
            defaultQuarterlyRange={{
              from: { quarter: 1, year: 2025 },
            }}
            defaultYearlyRange={{
              from: 2020,
              to: 2022,
            }}
            className="w-full max-w-md h-12 bg-white"
          />
        </div>
        <div className="flex-1 flex flex-col max-w-xs">
          <label htmlFor="method-select" className="block text-sm font-medium text-gray-700 mb-1">
            Metode Pembayaran
          </label>
          <Select defaultValue="all">
            <SelectTrigger
              id="method-select"
              icon={<ChevronDown className="h-4 w-4" />}
              className="w-full h-12 data-[state=open]:bg-blue-100 data-[state=closed]:bg-white bg-white"
            >
              <SelectValue placeholder="Pilih Metode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Metode</SelectItem>
              <SelectItem value="cash">Tunai</SelectItem>
              <SelectItem value="debit-credit">Debit / Kredit</SelectItem>
              <SelectItem value="qris">QRIS</SelectItem>
              <SelectItem value="voucher">Voucher</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="p-4 flex flex-col" style={{ height: '379px' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Pie Chart Laporan Jenis Bayar</CardTitle>
            <p className="text-sm text-gray-500">15 Januari 2025 - 21 Januari 2025</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <ChartPie
              chartConfig={chartConfig}
              pieChartData={pieChartData}
              totalTransactions={totalTransactions}
            />
            {/* <ChartPie/> */}
          </CardContent>
        </Card>
        {/* Kartu Ringkasan Transaksi */}
        <div className="p-4 flex flex-col">
          <Suspense fallback={<div className="h-20 bg-gray-200 rounded animate-pulse" />}>
            <TotalTransactionAmount value={totalTransactions} />
          </Suspense>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <Suspense
              fallback={Array.from({ length: 4 }).map((_, i) => (
                <div key={`item-${i}`} className="h-16 bg-gray-200 rounded animate-pulse" />
              ))}
            >
              {transactionStats.slice(1).map((stat) => (
                <TransactionStatCard
                  key={stat.id}
                  icon={stat.icon}
                  title={stat.title}
                  value={stat.value}
                  className="w-full"
                />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

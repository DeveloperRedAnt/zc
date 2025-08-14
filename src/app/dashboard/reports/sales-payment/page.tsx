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
import { ChevronDown, LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useMemo } from 'react';

import { DTO } from '@/__generated__/api/client/sales-payment-report.client';
import {
  usePaymentMethod,
  usePaymentReport,
} from '@/__generated__/api/hooks/sales-payment-report.hooks';
import { useSalesPaymentParams } from '@/modules/reports/sales-payment/hooks/use-search-params';
import { quarterToDateRange } from '@/utils/datepicker';

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
const ChartPie = dynamic(() => import('@/modules/reports/sales-payment/chart/chart-pie'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="h-48 w-48 bg-gray-200 rounded-full animate-pulse" />
    </div>
  ),
});

const chartConfig = {
  Tunai: { label: 'tunai', color: '##5252E0' },
  'debit / kredit': { label: 'debit / kredit', color: '#22D3EE' },
  qris: { label: 'qris', color: '#F59E42' },
  voucher: { label: 'voucher', color: '#EB6347' },
};

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'quarterly';

// Komponen filter periode
function PeriodFilter({
  startDate,
  endDate,
  setPeriodType,
  setPeriodValue,
  setStartDate,
  setEndDate,
  handleResetFilter,
}) {
  return (
    <div className="flex flex-col max-w-xs w-full">
      <label htmlFor="period-select" className="block text-base font-medium text-gray-700">
        Periode
      </label>
      <DateRangePicker
        allowedViews={['daily', 'weekly', 'monthly', 'quarterly']}
        initialPeriod={{
          type: 'daily',
          value: {
            from: new Date(startDate),
            to: new Date(endDate),
          },
        }}
        onReset={handleResetFilter}
        onApply={(period) => {
          setPeriodType(period.type);
          if (period.type === 'quarterly') {
            const fromQuarterObj = period.value.from as
              | { quarter: 1 | 2 | 3 | 4; year: number }
              | undefined;
            const toQuarterObj = period.value.to as
              | { quarter: 1 | 2 | 3 | 4; year: number }
              | undefined;

            let fromDate = '';
            let toDate = '';

            if (fromQuarterObj) {
              fromDate = quarterToDateRange(fromQuarterObj.quarter, fromQuarterObj.year).from;
            }
            if (toQuarterObj) {
              toDate = quarterToDateRange(toQuarterObj.quarter, toQuarterObj.year).to;
            }

            setPeriodValue({
              from: period.value.from,
              to: period.value.to,
            });

            if (fromDate && toDate) {
              setStartDate(fromDate);
              setEndDate(toDate);
            }
          } else {
            const from =
              period.value.from instanceof Date
                ? period.value.from.toISOString().slice(0, 10)
                : String(period.value.from).slice(0, 10);
            const to =
              period.value.to instanceof Date
                ? period.value.to.toISOString().slice(0, 10)
                : String(period.value.to).slice(0, 10);

            setPeriodValue({ from, to });
            setStartDate(from);
            setEndDate(to);
          }
        }}
        className="w-full max-w-md h-12 bg-white"
      />
    </div>
  );
}

function PaymentMethodFilter({ name, setName }) {
  const { data: Payment } = usePaymentMethod();
  return (
    <div className="flex-1 flex flex-col max-w-xs">
      <label htmlFor="method-select" className="block text-sm font-medium text-gray-700 mb-1">
        Metode Pembayaran
      </label>
      <Select value={name} onValueChange={setName} defaultValue="all">
        <SelectTrigger
          id="method-select"
          icon={<ChevronDown className="h-4 w-4" />}
          className="w-full h-12 data-[state=open]:bg-blue-100 data-[state=closed]:bg-white bg-white"
        >
          <SelectValue placeholder="Pilih Metode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Metode</SelectItem>
          {Array.isArray(Payment)
            ? Payment.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </SelectItem>
              ))
            : Payment?.data && (
                <SelectItem key={Payment.data.id} value={Payment.data.name}>
                  {Payment.data.name.charAt(0).toUpperCase() + Payment.data.name.slice(1)}
                </SelectItem>
              )}
        </SelectContent>
      </Select>
    </div>
  );
}

// Komponen kartu metode pembayaran
function PaymentMethodCards({ paymentMethods }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-5">
      <Suspense
        fallback={Array.from({ length: 4 }).map((_, i) => (
          <div key={`item-${i}`} className="h-16 bg-gray-200 rounded animate-pulse" />
        ))}
      >
        {paymentMethods.map((stat) => {
          let icon: LucideIcon;
          switch (stat.method) {
            case 'tunai':
              icon = require('lucide-react').Wallet;
              break;
            case 'debit / kredit':
              icon = require('lucide-react').CreditCard;
              break;
            case 'qris':
              icon = require('lucide-react').QrCode;
              break;
            case 'voucher':
              icon = require('lucide-react').Ticket;
              break;
            default:
              icon = require('lucide-react').Circle;
          }
          return (
            <TransactionStatCard
              key={stat.method}
              icon={icon}
              title={stat.method}
              value={stat.total_transaction}
              className="w-full"
            />
          );
        })}
      </Suspense>
    </div>
  );
}

export default function Index() {
  const [periodeType, setPeriodType] = React.useState<PeriodType>('daily');
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    name,
    setName,
    isActive,
    ids,
    isGrouping,
    setIsGrouping,
  } = useSalesPaymentParams();
  const [labelText, setLabelText] = React.useState('-');

  const [periodValue, setPeriodValue] = React.useState<{
    from: string | { quarter: number; year: number };
    to: string | { quarter: number; year: number };
  }>({
    from: startDate,
    to: endDate,
  });

  const salesPayment: DTO.SalesDailyDaysRequest = useMemo(
    () => ({
      start_date: startDate,
      end_date: endDate,
      is_active: isActive,
      ids,
      name,
      grouping: isGrouping,
    }),
    [startDate, endDate, isActive, ids, name, isGrouping]
  );

  const { data } = usePaymentReport(salesPayment);

  const paymentMethods = useMemo(() => data?.recap?.payment_methods ?? [], [data]);
  const totalTransactions = useMemo(() => data?.recap?.total_transaction ?? 0, [data]);

  const pieChartData = useMemo(() => {
    const labels = data?.graph?.labels ?? [];
    const values = data?.graph?.data ?? [];
    return labels.map((label, idx) => ({
      name: label.charAt(0).toUpperCase() + label.slice(1),
      value: values[idx] ?? 0,
      fill: chartConfig[label.charAt(0).toUpperCase() + label.slice(1)]?.color || '#64748b',
    }));
  }, [data]);

  useEffect(() => {
    setIsGrouping(periodeType);
    if (periodeType === 'quarterly') {
      const isQuarterObj = (val: unknown): val is { quarter: number; year: number } =>
        typeof val === 'object' && val !== null && 'quarter' in val && 'year' in val;
      if (isQuarterObj(periodValue.from) && isQuarterObj(periodValue.to)) {
        setLabelText(
          `Q${periodValue.from.quarter} ${periodValue.from.year} - Q${periodValue.to.quarter} ${periodValue.to.year}`
        );
      } else {
        setLabelText('-');
      }
    } else {
      const fromValid = typeof periodValue.from === 'string' && periodValue.from;
      const toValid = typeof periodValue.to === 'string' && periodValue.to;
      if (fromValid && toValid) {
        setLabelText(`${periodValue.from} - ${periodValue.to}`);
      } else if (fromValid) {
        setLabelText(`${periodValue.from}`);
      } else {
        setLabelText('-');
      }
    }
  }, [periodValue, periodeType, setIsGrouping]);

  function handleResetFilter() {
    setStartDate('');
    setEndDate('');
    setIsGrouping('');
    setName('');
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Laporan Jenis Bayar</h1>
      <div className="flex flex-col md:flex-row justify-start gap-4 mb-6">
        <PeriodFilter
          startDate={startDate}
          endDate={endDate}
          setPeriodType={setPeriodType}
          setPeriodValue={setPeriodValue}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleResetFilter={handleResetFilter}
        />
        <PaymentMethodFilter name={name} setName={setName} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 flex flex-col" style={{ height: '379px' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Pie Chart Laporan Jenis Bayar</CardTitle>
            <p className="text-sm text-gray-500">{labelText}</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <ChartPie
              chartConfig={chartConfig}
              pieChartData={pieChartData}
              totalTransactions={totalTransactions}
            />
          </CardContent>
        </Card>
        <div className="p-4 flex flex-col">
          <Suspense fallback={<div className="h-20 bg-gray-200 rounded animate-pulse" />}>
            <TotalTransactionAmount value={totalTransactions} />
          </Suspense>
          <PaymentMethodCards paymentMethods={paymentMethods} />
        </div>
      </div>
    </div>
  );
}

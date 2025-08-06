'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/chart/chart';

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: {
    value: number;
    dataKey: string;
  }[];
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length < 2) {
    return null;
  }

  const date = new Date(label);
  const formattedDate = date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const transactionValue = payload[0]?.value ?? 0;
  const revenueValue = payload[1]?.value ?? 0;
  const growthPercentage = ((revenueValue / 3600000 - 1) * 100).toFixed(3);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border">
      <p className="text-sm font-semibold mb-2">{formattedDate}</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0EA5E9' }} />
          <span className="text-sm">Pertumbuhan Transaksi: {transactionValue} Transaksi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#38BDF8' }} />
          <span className="text-sm">
            Pertumbuhan Pendapatan: Rp {revenueValue.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="text-sm text-green-500">↑ {growthPercentage}%</div>
      </div>
    </div>
  );
};

export const description = 'An interactive area chart';

const chartData = [
  { date: '2025-01-01', pertumbuhanTransaksi: 95, pertumbuhanPendapatan: 3600000 },
  { date: '2025-01-02', pertumbuhanTransaksi: 105, pertumbuhanPendapatan: 3850000 },
  { date: '2025-01-03', pertumbuhanTransaksi: 110, pertumbuhanPendapatan: 4000000 },
  { date: '2025-01-04', pertumbuhanTransaksi: 115, pertumbuhanPendapatan: 4200000 },
  { date: '2025-01-05', pertumbuhanTransaksi: 130, pertumbuhanPendapatan: 4500000 },
  { date: '2025-01-06', pertumbuhanTransaksi: 125, pertumbuhanPendapatan: 4375000 },
  { date: '2025-01-07', pertumbuhanTransaksi: 140, pertumbuhanPendapatan: 4600000 },
  { date: '2025-01-08', pertumbuhanTransaksi: 150, pertumbuhanPendapatan: 4850000 },
  { date: '2025-01-09', pertumbuhanTransaksi: 160, pertumbuhanPendapatan: 5050000 },
  { date: '2025-01-10', pertumbuhanTransaksi: 155, pertumbuhanPendapatan: 4950000 },
  { date: '2025-01-11', pertumbuhanTransaksi: 170, pertumbuhanPendapatan: 5200000 },
  { date: '2025-01-12', pertumbuhanTransaksi: 180, pertumbuhanPendapatan: 5400000 },
  { date: '2025-01-13', pertumbuhanTransaksi: 175, pertumbuhanPendapatan: 5300000 },
  { date: '2025-01-14', pertumbuhanTransaksi: 185, pertumbuhanPendapatan: 5580000 },
  { date: '2025-01-15', pertumbuhanTransaksi: 8800000, pertumbuhanPendapatan: 5689677 },
  { date: '2025-01-16', pertumbuhanTransaksi: 188, pertumbuhanPendapatan: 5620000 },
  { date: '2025-01-17', pertumbuhanTransaksi: 195, pertumbuhanPendapatan: 5800000 },
  { date: '2025-01-18', pertumbuhanTransaksi: 200, pertumbuhanPendapatan: 6000000 },
  { date: '2025-01-19', pertumbuhanTransaksi: 205, pertumbuhanPendapatan: 6150000 },
  { date: '2025-01-20', pertumbuhanTransaksi: 210, pertumbuhanPendapatan: 6300000 },
  { date: '2025-01-21', pertumbuhanTransaksi: 220, pertumbuhanPendapatan: 6500000 },
  { date: '2025-01-22', pertumbuhanTransaksi: 230, pertumbuhanPendapatan: 6800000 },
  { date: '2025-01-23', pertumbuhanTransaksi: 240, pertumbuhanPendapatan: 7100000 },
  { date: '2025-01-24', pertumbuhanTransaksi: 260, pertumbuhanPendapatan: 7450000 },
  { date: '2025-01-25', pertumbuhanTransaksi: 250, pertumbuhanPendapatan: 7300000 },
  { date: '2025-01-26', pertumbuhanTransaksi: 270, pertumbuhanPendapatan: 7700000 },
  { date: '2025-01-27', pertumbuhanTransaksi: 290, pertumbuhanPendapatan: 8000000 },
  { date: '2025-01-28', pertumbuhanTransaksi: 280, pertumbuhanPendapatan: 7800000 },
  { date: '2025-01-29', pertumbuhanTransaksi: 300, pertumbuhanPendapatan: 8200000 },
  { date: '2025-01-30', pertumbuhanTransaksi: 320, pertumbuhanPendapatan: 8550000 },
  { date: '2025-01-31', pertumbuhanTransaksi: 330, pertumbuhanPendapatan: 8800000 },
];

const chartConfig = {
  pertumbuhanTransaksi: {
    label: 'Pertumbuhan Transaksi',
    color: 'var(--chart-1)',
  },
  pertumbuhanPendapatan: {
    label: 'Pertumbuhan Pendapatan',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function SalesDailyChart() {
  const [timeRange, _setTimeRange] = React.useState('90d');

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={filteredData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString('id-ID', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
          }}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Line
          dataKey="pertumbuhanTransaksi"
          type="natural"
          stroke="#0EA5E9"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="pertumbuhanPendapatan"
          type="natural"
          stroke="#38BDF8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

'use client';

import { ChartConfig, ChartContainer } from '@/components/chart/chart';
import * as React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';

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

export interface SalesDailyChartData {
  date: string;
  pertumbuhanTransaksi: number;
  pertumbuhanPendapatan: number;
}

interface SalesDailyChartProps {
  data: SalesDailyChartData[];
  height?: number;
  width?: number;
}

export function SalesDailyChart({ data, height, width }: SalesDailyChartProps) {
  const [timeRange, _setTimeRange] = React.useState('90d');

  const filteredData = (data ?? []).filter((item) => {
    if (typeof item.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) return false;
    const date = new Date(item.date);
    if (Number.isNaN(date.getTime())) return false;
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

  const minTransaksi = Math.min(...filteredData.map((d) => d.pertumbuhanTransaksi ?? 0));
  const maxTransaksi = Math.max(...filteredData.map((d) => d.pertumbuhanTransaksi ?? 0));
  const minPendapatan = Math.min(...filteredData.map((d) => d.pertumbuhanPendapatan ?? 0));
  const maxPendapatan = Math.max(...filteredData.map((d) => d.pertumbuhanPendapatan ?? 0));

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={filteredData}
        height={height ?? 300}
        width={width ?? 1200}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          angle={-45}
          tickLine={false}
          axisLine={false}
          tickMargin={-0}
          minTickGap={32}
          dy={10}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString('id-ID', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
          }}
        />
        <YAxis
          yAxisId="left"
          domain={[minTransaksi, maxTransaksi]}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[minPendapatan, maxPendapatan]}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Line
          dataKey="pertumbuhanTransaksi"
          type="natural"
          stroke="#0EA5E9"
          strokeWidth={2}
          dot={false}
          yAxisId="left"
        />
        <Line
          dataKey="pertumbuhanPendapatan"
          type="natural"
          stroke="#38BDF8"
          strokeWidth={2}
          dot={false}
          yAxisId="right"
        />
      </LineChart>
    </ChartContainer>
  );
}

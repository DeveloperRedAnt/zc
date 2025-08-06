'use client';

import { Pie, PieChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip } from '../../../../components/chart/chart';

export const description = 'A simple pie chart';

const chartData: ChartData[] = [
  {
    name: 'Mini Ceramic Diffuser 1 pcs',
    sold: 10,
    revenue: 535012,
    hpp: 480268,
    profit: 54744,
    percentage: 19.201,
    fill: '#4C6FFF', // blue
  },
  {
    name: 'Parfume Refill 100ml',
    sold: 8,
    revenue: 425000,
    hpp: 380000,
    profit: 45000,
    percentage: 15.5,
    fill: '#31D0AA', // green
  },
  {
    name: 'Reed Diffuser Premium',
    sold: 12,
    revenue: 650000,
    hpp: 550000,
    profit: 100000,
    percentage: 22.3,
    fill: '#FF7A00', // orange
  },
  {
    name: 'Car Diffuser Set',
    sold: 6,
    revenue: 298000,
    hpp: 250000,
    profit: 48000,
    percentage: 12.8,
    fill: '#6E62E5', // purple
  },
  {
    name: 'Essential Oil Pack',
    sold: 15,
    revenue: 750000,
    hpp: 600000,
    profit: 150000,
    percentage: 30.2,
    fill: '#FFB800', // yellow
  },
];

import type { TooltipProps } from 'recharts';

type ChartData = {
  name: string;
  sold: number;
  revenue: number;
  hpp: number;
  profit: number;
  percentage: number;
  fill: string;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0]?.payload as ChartData;
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <div className="font-medium">{data.name}</div>
        <div className="mt-2 space-y-1 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Jumlah Terjual</span>
            <span className="text-right font-medium">{data.sold} Box</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Nominal Penjualan</span>
            <span className="text-right font-medium">{formatCurrency(data.revenue)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">HPP</span>
            <span className="text-right font-medium">{formatCurrency(data.hpp)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Laba</span>
            <span className="text-right font-medium">{formatCurrency(data.profit)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Persentase Penjualan</span>
            <span className="text-right font-medium">{data.percentage.toFixed(3)}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const chartConfig = {
  sales: {
    label: 'Penjualan',
    color: '#8fc6ff',
  },
} satisfies ChartConfig;

export function SalesProductChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[315px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<CustomTooltip />} />
        <Pie
          data={chartData}
          dataKey="revenue"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          innerRadius={0}
          paddingAngle={0}
          stroke="none"
        />
      </PieChart>
    </ChartContainer>
  );
}

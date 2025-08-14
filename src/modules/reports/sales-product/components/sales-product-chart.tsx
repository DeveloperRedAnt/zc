'use client';

import * as DTO from '@/__generated__/api/dto/reports/sales-product.dto';
import { Pie, PieChart } from 'recharts';
import type { TooltipProps } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip } from '../../../../components/chart/chart';

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
    const data = payload[0]?.payload as DTO.GraphDataProduct;
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <div className="font-medium">{data.name}</div>
        <div className="mt-2 space-y-1 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Jumlah Terjual</span>
            <span className="text-right font-medium">{data.sold} Pcs</span>
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

interface SalesProductChartProps {
  data: DTO.GraphDataProduct[];
  isLoading?: boolean;
}

export function SalesProductChart({ data, isLoading }: SalesProductChartProps) {
  if (isLoading) {
    return (
      <div className="mx-auto aspect-square max-h-[315px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mx-auto aspect-square max-h-[315px] flex items-center justify-center text-muted-foreground">
        Tidak ada data untuk ditampilkan
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[315px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<CustomTooltip />} />
        <Pie
          data={data}
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

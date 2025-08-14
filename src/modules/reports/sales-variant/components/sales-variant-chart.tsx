'use client';

import * as DTO from '@/__generated__/api/dto/reports/sales-variant.dto';
import { Pie, PieChart } from 'recharts';
import type { TooltipProps } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip } from '../../../../components/chart/chart';

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0]?.payload as DTO.GraphData;
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <div className="font-medium">{data.variant_name}</div>
        <div className="mt-2 space-y-1 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Nama Produk Utama</span>
            <span className="text-right font-medium">{data.product_name}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Jumlah Terjual</span>
            <span className="text-right font-medium">{data.sold}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Persentase Penjualan</span>
            <span className="text-right font-medium">{data.percentage}</span>
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

interface SalesVariantChartProps {
  data: DTO.GraphData[];
  isLoading?: boolean;
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function SalesVariantChart({ data, isLoading }: SalesVariantChartProps) {
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

  const processedData = data.map((item) => ({
    ...item,
    percentageNumber: parseFloat(item.percentage),
    fill: getRandomColor(),
  }));

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[315px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<CustomTooltip />} />
        <Pie
          data={processedData}
          dataKey="percentageNumber"
          nameKey="product_name"
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

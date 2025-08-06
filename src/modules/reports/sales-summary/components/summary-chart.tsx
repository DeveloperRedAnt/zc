'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip } from '../../../../components/chart/chart';

const chartData = [
  {
    date: '17/07/2025',
    store1: 1285000,
    store2: 1000097,
    total: 2285097,
  },
  {
    date: '18/07/2025',
    store1: 2285000,
    store2: 1800097,
    total: 4085097,
  },
  {
    date: '19/07/2025',
    store1: 1785000,
    store2: 1400097,
    total: 3185097,
  },
];

const chartConfig = {
  store1: {
    label: 'Toko Cahaya Sejati',
    color: 'rgb(0, 182, 204)',
  },
  store2: {
    label: 'Prima Jaya',
    color: 'rgb(147, 229, 241)',
  },
} satisfies ChartConfig;

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function SummaryChart() {
  return (
    <div className="w-full overflow-hidden bg-white rounded-lg p-6">
      <ChartContainer config={chartConfig}>
        <BarChart
          width={800}
          height={260}
          data={chartData}
          barGap={16}
          barSize={80}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          style={{ marginBottom: '1rem' }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="date" tickLine={false} tickMargin={12} axisLine={false} fontSize={12} />
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;

              return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                  <div className="text-sm text-gray-600 mb-2">{payload[0]?.payload?.date}</div>
                  {(
                    payload as Array<{
                      dataKey: 'store1' | 'store2';
                      value: number;
                      payload: { total: number; date: string };
                    }>
                  ).map((entry, index) => (
                    <div
                      key={`${entry.dataKey}-${index}`}
                      className="flex justify-between gap-8 mb-1"
                    >
                      <span className="text-sm">{chartConfig[entry.dataKey].label}</span>
                      <span className="text-sm font-medium">{formatCurrency(entry.value)}</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t">
                    <div className="flex justify-between gap-8">
                      <span className="text-sm font-medium">Total Netto</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(payload[0]?.payload?.total ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Bar dataKey="store1" fill={chartConfig.store1.color} radius={[8, 8, 0, 0]} />
          <Bar dataKey="store2" fill={chartConfig.store2.color} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

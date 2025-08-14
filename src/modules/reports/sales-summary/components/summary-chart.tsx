// summary-chart.tsx
'use client';

import { ApiSalesSummaryChartData } from '@/__generated__/api/dto/reports/sales-summary.dto';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip } from '../../../../components/chart/chart';

type SummaryChartProps = {
  data?: ApiSalesSummaryChartData[];
  isLoading?: boolean;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Function to parse currency string to number
const parseCurrency = (currencyString: string): number => {
  return parseInt(currencyString.replace(/[Rp\s.]/g, '')) || 0;
};

// Transform API data to chart format
// const transformChartData = (apiData: ApiSalesSummaryChartData[]) => {
//   return apiData.map((yearData) => {
//     // Get top 2 stores by netto value for display
//     const sortedStores = yearData.stores
//       .map(store => ({
//         ...store,
//         nettoValue: parseCurrency(store.netto)
//       }))
//       .sort((a, b) => b.nettoValue - a.nettoValue)
//       .slice(0, 2);

//     const chartItem: any = {
//       date: yearData.group_key.toString(),
//       total: parseCurrency(yearData.netto),
//     };

//     // Add top stores as separate data keys
//     sortedStores.forEach((store, index) => {
//       chartItem[`store${index + 1}`] = store.nettoValue;
//       chartItem[`store${index + 1}_name`] = store.name;
//     });

//     return chartItem;
//   });
// };

const transformChartData = (apiData: ApiSalesSummaryChartData[]) => {
  return apiData.map((yearData) => {
    const sortedStores = yearData.stores
      .map((store) => ({
        ...store,
        nettoValue: parseCurrency(store.netto),
      }))
      .sort((a, b) => b.nettoValue - a.nettoValue);

    const topStores = sortedStores.slice(0, 2);

    const chartItem: {
      date: string;
      total: number;
      store1?: number;
      store1_name?: string;
      store2?: number;
      store2_name?: string;
    } = {
      date: yearData.group_key.toString(),
      total: parseCurrency(yearData.netto),
    };

    topStores.forEach((store, index) => {
      chartItem[`store${index + 1}`] = store.nettoValue;
      chartItem[`store${index + 1}_name`] = store.name;
    });

    // Pastikan kalau cuma ada 1 store, store2 tetap ada tapi bernilai 0
    if (topStores.length < 2) {
      chartItem.store2 = 0;
      chartItem.store2_name = '';
    }

    return chartItem;
  });
};

export function SummaryChart({ data = [], isLoading = false }: SummaryChartProps) {
  const chartData = transformChartData(data);

  // Dynamic chart config based on available stores
  const chartConfig: ChartConfig = {
    store1: {
      label: chartData.length > 0 ? chartData[0]?.store1_name || 'Store 1' : 'Store 1',
      color: 'rgb(0, 182, 204)',
    },
    store2: {
      label: chartData.length > 0 ? chartData[0]?.store2_name || 'Store 2' : 'Store 2',
      color: 'rgb(147, 229, 241)',
    },
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden bg-white rounded-lg p-6">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <div className="text-gray-500">Loading chart...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="w-full overflow-hidden bg-white rounded-lg p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">No data available</div>
        </div>
      </div>
    );
  }

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
                      payload: {
                        date: string;
                        total: number;
                        store1: number;
                        store1_name: string;
                        store2: number;
                        store2_name: string;
                      };
                    }>
                  ).map((entry, index) => {
                    if (entry.dataKey.startsWith('store') && entry.value > 0) {
                      const storeNameKey = `${entry.dataKey}_name`;
                      const storeConfig = chartConfig[entry.dataKey as keyof typeof chartConfig];
                      const storeName =
                        entry.payload[storeNameKey] || storeConfig?.label || 'Unknown Store';

                      return (
                        <div
                          key={`${entry.dataKey}-${index}`}
                          className="flex justify-between gap-8 mb-1"
                        >
                          <span className="text-sm">{storeName}</span>
                          <span className="text-sm font-medium">{formatCurrency(entry.value)}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
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
          <Bar dataKey="store1" fill={chartConfig.store1?.color} radius={[8, 8, 0, 0]} />
          <Bar dataKey="store2" fill={chartConfig.store2?.color} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

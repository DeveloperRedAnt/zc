import { ChartContainer, ChartTooltip } from '@/components/chart/chart';
import { PieChartDataEntry } from '@/modules/reports/sales-payment/types';
import { Cell, Pie, PieChart } from 'recharts';

interface ChartPieProps {
  pieChartData: PieChartDataEntry[];
  chartConfig: Record<string, { label: string; color: string }>;
  totalTransactions: number;
}

export default function ChartPie({ pieChartData, chartConfig, totalTransactions }: ChartPieProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full max-w-[300px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={({ payload }) => {
            if (!payload || payload.length === 0 || !payload[0]) return null;
            const data = payload[0].payload;
            const percentage = ((data.value / totalTransactions) * 100).toFixed(2);
            return (
              <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200 flex flex-col items-start text-sm min-w-[120px]">
                <div className="flex items-center gap-2 w-full">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: data.fill }} />
                  <span className="font-medium">{data.name}</span>
                  <span className="ml-auto text-gray-600 font-bold">{percentage}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-1">
                  <span className="text-gray-500 text-xs">Jumlah Transaksi</span>
                  <span className="font-normal text-gray-800 text-right">
                    {data.value} Transaksi
                  </span>
                </div>
              </div>
            );
          }}
        />
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          innerRadius={0}
          outerRadius={100}
          strokeWidth={2}
          paddingAngle={0}
          stroke="0"
        >
          {pieChartData.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

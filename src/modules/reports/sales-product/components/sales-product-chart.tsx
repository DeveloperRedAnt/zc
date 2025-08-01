'use client';

import { Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../../components/chart/chart';

export const description = 'A simple pie chart';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: '#8fc6ff' },
  { browser: 'safari', visitors: 200, fill: '#5ec7a0' },
  { browser: 'firefox', visitors: 187, fill: '#eb5bca' },
  { browser: 'edge', visitors: 173, fill: '#e57e13' },
  { browser: 'other', visitors: 90, fill: '#13e5c4' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: '#8fc6ff',
  },
  safari: {
    label: 'Safari',
    color: '#5ec7a0',
  },
  firefox: {
    label: 'Firefox',
    color: '#eb5bca',
  },
  edge: {
    label: 'Edge',
    color: '#e57e13',
  },
  other: {
    label: 'Other',
    color: '#13e5c4',
  },
} satisfies ChartConfig;

export function SalesProductChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[315px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="visitors" nameKey="browser" />
      </PieChart>
    </ChartContainer>
  );
}

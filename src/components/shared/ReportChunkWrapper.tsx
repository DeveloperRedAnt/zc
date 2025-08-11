'use client';

import { Card, CardContent } from '@/components/card/card';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

interface ReportChunkWrapperProps {
  reportType:
    | 'sales-daily'
    | 'sales-details'
    | 'sales-product'
    | 'sales-variant'
    | 'sales-summary'
    | 'sales-void'
    | 'sales-profit-loss'
    | 'sales-cashier';
  children?: React.ReactNode;
}

const ChartSkeleton = () => (
  <div className="flex items-center justify-center h-64">
    <div className="h-48 w-48 bg-gray-200 rounded animate-pulse" />
  </div>
);

const TableSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={`header-${i}`} className="h-4 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={`row-${i}`} className="grid grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, j) => (
          <div key={`cell-${j}`} className="h-4 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    ))}
  </div>
);

const getReportComponent = (reportType: string) => {
  return dynamic(() => import(`@/app/dashboard/reports/${reportType}/page`), {
    loading: () => (
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`filter-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            {reportType.includes('chart') ? <ChartSkeleton /> : <TableSkeleton />}
          </CardContent>
        </Card>
      </div>
    ),
    ssr: false,
  });
};

export default function ReportChunkWrapper({ reportType, children }: ReportChunkWrapperProps) {
  const ReportComponent = getReportComponent(reportType);

  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Card className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="h-96 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        </div>
      }
    >
      {children || <ReportComponent />}
    </Suspense>
  );
}

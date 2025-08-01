import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

export const SetFirstStockSkeleton = () => {
  return (
    <Card className="my-[1rem] px-2">
      <CardHeader className="border-b">
        <CardTitle className="text-[1rem]"> Atur Stok Awal </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <div className="space-y-6">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <GridSkeleton cols={4} count={4} />
          <GridSkeleton cols={2} count={2} />
          <GridSkeleton cols={3} count={3} />
          <FlexEndSkeleton count={2} />
        </div>
      </CardContent>
    </Card>
  );
};

const GridSkeleton: React.FC<{ cols: number; count: number }> = ({ cols, count }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6 py-6`}>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton
        key={`grid-skeleton-${cols}-${count}-${i}-${Math.random()}`}
        className="h-10 w-full"
      />
    ))}
  </div>
);

const FlexEndSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex justify-end gap-2 mt-6">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={`flex-end-skeleton-${count}-${i}-${Math.random()}`} className="h-10 w-32" />
    ))}
  </div>
);

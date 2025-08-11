import { Card, CardContent } from '@/components/card/card';

export default function ReportsLoading() {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Filters Skeleton */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`filter-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart/Table Skeleton */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-6">
          <div className="h-96 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    </div>
  );
}

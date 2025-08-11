import { Card, CardContent } from '@/components/card/card';

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Package Selection Skeleton */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-6">
          <div className="h-20 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>

      {/* Dashboard Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={`dashboard-card-${i}`} className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col space-y-3">
                <div className="h-12 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="text-left">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-24" />
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-16" />
                </div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-32 ml-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

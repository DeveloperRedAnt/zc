import { Card, CardContent } from '@/components/card/card';

export default function ProductsLoading() {
  return (
    <div className="space-y-6">
      {/* Page Header with Actions */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-3">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse col-span-2" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Product Table */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <th key={`header-${i}`} className="px-6 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={`row-${i}`} className="border-b">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={`cell-${j}`} className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from '@/components/card/card';

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      {/* Page Header with Actions */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-28 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Filters */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse col-span-2" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Avatar', 'Name', 'Email', 'Role', 'Status', 'Actions'].map((_, i) => (
                    <th key={`header-${i}`} className="px-6 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`row-${i}`} className="border-b">
                    <td className="px-6 py-4">
                      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                    </td>
                    {Array.from({ length: 5 }).map((_, j) => (
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

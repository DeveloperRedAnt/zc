import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';

export default function StoreLoading() {
  return (
    <Card className="my-2">
      <CardHeader className="p-6 border-b-gray-200">
        <div className="flex justify-between items-center">
          <CardTitle className="size-[16px] leading-[24px] text-nowrap text-foreground">
            List Toko
          </CardTitle>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Filter Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-end">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
            </div>
          </div>
        </div>

        {/* Store Table Skeleton */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Nama Toko', 'Alamat', 'Telepon', 'Status', 'Tanggal Dibuat', 'Aksi'].map(
                    (_, i) => (
                      <th key={`header-${i}`} className="px-6 py-3 text-left">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={`row-${i}`} className="border-b">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                        <div className="space-y-1">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`pagination-${i}`}
                    className="h-8 w-8 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

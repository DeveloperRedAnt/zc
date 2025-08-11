import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader } from '@/components/card/card';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';

export default function ProductLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <SkeletonPreset />
        <div className="flex items-center gap-3">
          <SkeletonButton className="w-[110px]" />
          <SkeletonButton className="w-[140px] mr-3.5" />
        </div>
      </CardHeader>

      <CardContent>
        {/* Filter Section Skeleton */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`filter-${i}`} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Image', 'Nama', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((_, i) => (
                  <th key={`header-${i}`} className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={`row-${i}`} className="border-b">
                  <td className="px-6 py-4">
                    <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Skeleton */}
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
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

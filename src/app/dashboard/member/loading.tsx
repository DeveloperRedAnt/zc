import { Button } from '@/components/button/button';
import { Plus } from '@/components/icons/icon-wrapper';
import { PageLayout } from '@/components/page-layout/page-layout';

export default function MemberLoading() {
  return (
    <PageLayout
      title="List Member"
      button={
        <Button variant="info" disabled>
          <Plus />
          Tambah Member
        </Button>
      }
    >
      {/* Filter Section Skeleton */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`filter-${i}`} className="h-10 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Nama', 'Email', 'Telepon', 'Status', 'Aksi'].map((_, i) => (
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
                      {j === 0 ? (
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                      ) : j === 1 ? (
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                        </div>
                      ) : j === 4 ? (
                        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                      ) : j === 5 ? (
                        <div className="flex gap-2">
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                        </div>
                      ) : (
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="p-4 border-t">
          <div className="flex justify-between items-center">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`pagination-${i}`}
                  className="h-8 w-8 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import { Plus } from 'lucide-react';

export default function StockOpnameLoading() {
  return (
    <PageLayout
      title="Stock Opname"
      button={
        <Button variant="primary" disabled>
          <Plus />
          Tambah Penyesuaian Stock Opname
        </Button>
      }
    >
      {/* Filter Section Skeleton */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Dari Tanggal', 'Sampai Tanggal', 'Status', 'Toko'].map((_, i) => (
            <div key={`filter-${i}`} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Stock Opname Table Skeleton */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'Tanggal Opname',
                  'Tujuan Opname',
                  'Nama Toko',
                  'Jumlah Produk',
                  'Penanggung Jawab',
                  'Aksi',
                ].map((_, i) => (
                  <th key={`header-${i}`} className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={`row-${i}`} className="border-b">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16 text-center" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
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
    </PageLayout>
  );
}

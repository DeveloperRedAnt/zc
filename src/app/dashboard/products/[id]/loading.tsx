import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';

export default function ProductDetailLoading() {
  return (
    <Card className="my-[1rem] text-[#555555] px-2 font-normal">
      <CardHeader className="border-b-gray-200">
        <CardTitle className="text-[1rem]">Detail Produk</CardTitle>
      </CardHeader>

      <CardContent className="p-4 text-sm">
        {/* Product Header Section */}
        <div className="relative flex items-center justify-center border-b-gray-200 py-4">
          <div className="absolute top-2 right-4">
            <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="text-center">
            {/* Product Image Skeleton */}
            <div className="mx-auto rounded-md w-[11.6rem] h-[11.6rem] bg-gray-200 animate-pulse" />

            <div className="text-center pb-2">
              {/* Brand Name Skeleton */}
              <div className="mt-4 flex items-center justify-center gap-1">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-24" />
                <div className="h-5 w-5 bg-yellow-200 rounded animate-pulse" />
              </div>

              {/* Status Badge Skeleton */}
              <div className="mt-4 mx-auto h-6 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="border-b-gray-200 py-6">
          <div className="mb-4">
            <p>Tags</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`tag-${i}`} className="h-[1.5rem] w-20 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Product Type Sections Skeleton */}
        <div className="border-b-gray-200 py-6">
          <div className="mb-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-32" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`type-${i}`}
                className="flex justify-between items-center p-4 border rounded"
              >
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                </div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="border-b-gray-200 py-6">
          <div className="mb-2">
            <p>Detail Produk</p>
          </div>
          <div className="flex-1 space-y-10">
            <div className="flex flex-wrap w-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`detail-${i}`} className="text-[14px] w-1/2 mt-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-1" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multi Unit Price Section */}
        <div className="border-b-gray-200 py-6">
          <div className="mb-2">
            <p>Harga Multi Satuan</p>
          </div>
          <div className="flex-1 space-y-10">
            <div className="flex flex-wrap w-full">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={`price-${i}`} className="text-[14px] w-1/2 mt-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-1" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stock Section */}
        <div className="border-b-gray-200 py-6">
          <div className="mb-2">
            <p>Stok Produk</p>
          </div>
          <div className="flex-1 space-y-10">
            <div className="flex flex-wrap w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`stock-${i}`} className="text-[14px] w-1/2 mt-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28 mb-1" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stock History Table */}
        <Card className="text-[#555555] px-2 my-[1rem]">
          <CardHeader>
            <CardTitle className="text-[1rem]">Riwayat 5 Perubahan Stok Produk Terakhir</CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      'Tanggal',
                      'Produk',
                      'Perubahan Stok',
                      'Stok Setelah Perubahan',
                      'Keterangan',
                    ].map((_, i) => (
                      <th key={`history-header-${i}`} className="px-6 py-3 text-left">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`history-row-${i}`} className="border-b">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <td key={`history-cell-${j}`} className="px-6 py-4">
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

        {/* Back Button */}
        <div className="mt-10 border-t-gray-200 pt-4">
          <div className="flex justify-end gap-2">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

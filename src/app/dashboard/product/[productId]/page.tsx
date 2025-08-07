'use client';

import { useGetProductDetail, useGetProductStockHistories } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import { DataTable } from '@/components/table/data-table';
import DetailProductPaduan from '@/modules/product/components/detail-product-paduan';
import DetailProductVariant from '@/modules/product/components/detail-product-variant';
import { ArrowLeft, Edit, Star } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

interface ChangeStockHistory {
  date: string;
  variant: string;
  stock_change: string;
  stock_after: string;
  reason: string;
}

const columnHelperChangeStockHistory = createColumnHelper<ChangeStockHistory>();
const headerChangeStockHistory = [
  columnHelperChangeStockHistory.accessor('date', {
    header: 'Tanggal',
    cell: (info) => info.getValue(),
  }),
  columnHelperChangeStockHistory.accessor('variant', {
    header: 'Produk',
    cell: (info) => info.getValue(),
  }),
  columnHelperChangeStockHistory.accessor('stock_change', {
    header: 'Perubahan Stok',
    cell: (info) => {
      const value = info.getValue() as string;
      let color = '#555555';
      if (value.startsWith('+')) color = '#75BF85';
      else if (value.startsWith('-')) color = '#F08181';

      return <span style={{ color }}>{value}</span>;
    },
  }),
  columnHelperChangeStockHistory.accessor('stock_after', {
    header: 'Stok Setelah Perubahan',
    cell: (info) => info.getValue(),
  }),
  columnHelperChangeStockHistory.accessor('reason', {
    header: 'Keterangan',
    cell: (info) => info.getValue(),
  }),
];

export default function Index() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params?.productId);

  const { data, isLoading } = useGetProductDetail({
    id: productId,
  });

  const { data: changeStockHistoryData = [], isLoading: isLoadingStockHistoryData } =
    useGetProductStockHistories({
      id: productId,
    });

  const tableChangeStockHistory = useReactTable({
    data: changeStockHistoryData,
    columns: headerChangeStockHistory,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  });

  return (
    <Card className="my-[1rem] text-[#555555] px-2 text-[#555555] font-normal">
      <CardHeader className="border-b-gray-200">
        <CardTitle className="text-[1rem]"> Detail Produk </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        {isLoading && isLoadingStockHistoryData ? (
          <SkeletonCardContent className="w-full" />
        ) : (
          <>
            <div className="relative flex items-center justify-center border-b-gray-200 py-4">
              <div className="absolute top-2 right-4">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="w-4 h-4" />
                  Edit Produk
                </Button>
              </div>
              <div className="text-center">
                <img
                  src={data?.thumbnail || '/assets/zycas/example-product.png'}
                  alt="Product"
                  className="mx-auto rounded-md object-cover w-[11.6rem] h-[11.6rem]"
                />
                <div className="text-center pb-2">
                  <div className="mt-4 font-semibold text-[1rem] inline-flex items-center gap-1">
                    {data?.brand}
                    <Star theme="filled" size="18" fill="#FCBA33" />
                  </div>
                  <div
                    className={`mt-4 px-3 py-1 text-[0.75rem] rounded w-[5rem] mx-auto
                      ${
                        data?.is_active
                          ? 'bg-[#ECFDF5] text-[#75BF85]'
                          : 'bg-[#FAFAFA] text-[#C2C7D0]'
                      }`}
                  >
                    {data?.is_active ? 'Aktif' : 'Non-Aktif'}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b-gray-200 py-6">
              <div className="mb-4">
                <p> Tags </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data?.tags && data.tags.length > 0 ? (
                  data.tags.map((tag) => (
                    <div
                      key={tag}
                      className="h-[1.5rem] w-auto px-3 text-[0.75rem] border border-[#C2C7D0] rounded-[0.25rem] flex items-center justify-center"
                    >
                      {tag}
                    </div>
                  ))
                ) : (
                  <div className="text-grey italic text-[0.75rem]">Tidak ada tags</div>
                )}
              </div>
            </div>

            {data?.type?.toLowerCase() === 'composite' && data?.composite && (
              <DetailProductPaduan data={data?.composite} />
            )}
            {data?.type?.toLowerCase() === 'variant' && (
              <DetailProductVariant data={data?.variants || []} />
            )}

            <div className="border-b-gray-200 py-6">
              <div className="mb-2">
                <p> Detail Produk </p>
              </div>
              <div className="flex-1 space-y-10">
                <div className="flex flex-wrap w-full">
                  <div className="text-[14px] w-1/2 mt-6">
                    <p className="font-semibold"> Isi / Content: </p>
                    <p className="font-[400] mt-1">{data?.content || '-'}</p>
                  </div>
                  <div className="text-[14px] w-1/2 mt-6">
                    <p className="font-semibold"> Kemasan: </p>
                    <p className="font-[400] mt-1">{data?.package || '-'}</p>
                  </div>
                  {data?.type?.toLowerCase() !== 'variant' && (
                    <>
                      <div className="text-[14px] w-1/2 mt-6">
                        <p className="font-semibold"> Barcode: </p>
                        <p className="font-[400] mt-1">{data?.barcode || '-'}</p>
                      </div>
                      <div className="text-[14px] w-1/2 mt-6">
                        <p className="font-semibold"> Kode SKU: </p>
                        <p className="font-[400] mt-1">{data?.sku_code || '-'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {data?.type?.toLowerCase() !== 'variant' && (
              <div className="border-b-gray-200 py-6">
                <div className="mb-2">
                  <p> Harga Multi Satuan </p>
                </div>
                <div className="flex-1 space-y-10">
                  <div className="flex flex-wrap w-full">
                    {(() => {
                      const variantUnits = data?.variants?.[0]?.variant_units;
                      return variantUnits && variantUnits.length > 0 ? (
                        variantUnits.map((unit) => (
                          <div
                            key={`${unit.unit_name}-${unit.conversion_value}`}
                            className="text-[14px] w-1/2 mt-6"
                          >
                            <p className="font-semibold">
                              {unit.unit_name} - {unit.conversion_value} {data?.package}:
                            </p>
                            <p className="font-[400] mt-1">{unit.price || '-'}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-[#C2C7D0] italic text-[14px]">
                          Tidak ada data harga multi satuan
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            <div className="border-b-gray-200 py-6">
              <div className="mb-2">
                <p> Stok Produk </p>
              </div>
              <div className="flex-1 space-y-10">
                <div className="flex flex-wrap w-full">
                  <div className="text-[14px] w-1/2 mt-6">
                    <p className="font-semibold"> Lacak Stok Produk: </p>
                    <p className="font-[400] mt-1">
                      {data?.stock_taking?.is_enabled ? 'Aktif' : 'Tidak Aktif'}
                    </p>
                  </div>
                  {data?.type?.toLowerCase() !== 'variant' && (
                    <div className="text-[14px] w-1/2 mt-6">
                      <p className="font-semibold"> Peringatan Stok Minimum: </p>
                      <p className="font-[400] mt-1">{data?.stock_taking?.minimum_stock} Produk</p>
                    </div>
                  )}
                  <div className="text-[14px] w-1/2 mt-6">
                    <p className="font-semibold"> Peringatan Produk Kedaluwarsa: </p>
                    <p className="font-[400] mt-1">
                      {data?.expired_reminder?.is_enabled
                        ? `Aktif - ${data?.expired_reminder?.reminder_in_days} Hari`
                        : 'Tidak Aktif'}
                    </p>
                  </div>
                  {data?.type?.toLowerCase() !== 'variant' && (
                    <>
                      <div className="text-[14px] w-1/2 mt-6">
                        <p className="font-semibold"> Stok produk saat ini: </p>
                        <p className="font-[400] mt-1">
                          {data?.current_stock || '0'} {data?.package}
                        </p>
                      </div>
                      <div className="text-[14px] w-1/2 mt-6">
                        <p className="font-semibold"> Tanggal Kedaluwarsa: </p>
                        <p className="font-[400] mt-1">
                          {data?.expired_reminder?.reminder_in_date || '-'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Card className="text-[#555555] px-2 my-[1rem]">
              <CardHeader>
                <CardTitle className="text-[1rem]">
                  {' '}
                  Riwayat 5 Perubahan Stok Produk Terakhir{' '}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-sm">
                <DataTable
                  width="100%"
                  table={tableChangeStockHistory}
                  isLoading={isLoadingStockHistoryData}
                />
              </CardContent>
            </Card>

            <div className="mt-10 border-t-gray-200 pt-4">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 ml-[1px] flex items-center"
                  onClick={() => router.push('/dashboard/product')}
                >
                  <ArrowLeft />
                  Kembali ke List Produk
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

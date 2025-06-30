'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { DataTable } from '@/components/table/data-table';
import { ArrowLeft, Edit, Star } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React from 'react';
// import DetailProductPaduan from '@/modules/product/components/detail-product-paduan';
// import DetailProductVariant from '@/modules/product/components/detail-product-variant';

const tags = ['Makanan', 'Besar', 'Bubuk', 'Paket Besar', 'Beli Banyak', 'Bungkus'];

interface ChangeStockHistory {
  date: string;
  name: string;
  stockChange: React.ReactNode;
  stockAfterChange: string;
  description: string;
}
// RIWAYAT PERUBAHAN STOK
const columnHelperChangeStockHistory = createColumnHelper<ChangeStockHistory>();
const headerChangeStockHistory = [
  columnHelperChangeStockHistory.accessor('date', {
    header: 'Tanggal',
    cell: (info) => info.getValue(),
  }),
  columnHelperChangeStockHistory.accessor('name', {
    header: 'Produk',
    cell: (info) => info.getValue(),
  }),
  columnHelperChangeStockHistory.accessor('stockChange', {
    header: 'Perubahan Stok',
    cell: (info) => info.getValue(),
  }),
  columnHelperChangeStockHistory.accessor('stockAfterChange', {
    header: 'Stok Setelah Perubahan',
    cell: (info) => info.getValue(),
  }),
  columnHelperChangeStockHistory.accessor('description', {
    header: 'Keterangan',
    cell: (info) => info.getValue(),
  }),
];
const changeStockHistoryData = [
  {
    date: '01/12/2024',
    name: 'Kopi Arabica',
    stockChange: <div className="text-[#75BF85]"> + 10 plastik </div>,
    stockAfterChange: '800 plastik',
    description: 'Tambah Stok',
  },
  {
    date: '01/12/2024',
    name: 'Kopi Arabica',
    stockChange: <div className="text-[#F08181]"> - 50 plastik </div>,
    stockAfterChange: '850 plastik',
    description: 'Terjual',
  },
];
// END RIWAYAT PERUBAHAN STOK

export default function Index() {
  const router = useRouter();

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
    <>
      <Card className="my-[1rem] text-[#555555] px-2 text-[#555555] font-normal">
        <CardHeader className="border-b border-[#C2C7D0]">
          <CardTitle className="text-[1rem]"> Detail Produk </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <div className="relative flex items-center justify-center border-b border-[#C2C7D0] py-4">
            <div className="absolute top-2 right-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Edit className="w-4 h-4" />
                Edit Produk
              </Button>
            </div>
            <div className="text-center">
              <img
                src={'/assets/zycas/example-product.png'}
                alt="Product"
                className="mx-auto rounded-md object-cover w-[11.6rem] h-[11.6rem]"
              />
              <div className="text-center pb-2">
                <div className="mt-4 font-semibold text-[1rem] inline-flex items-center gap-1">
                  Kopi Arabica <Star theme="filled" size="18" fill="#FCBA33" />
                </div>

                <div className="mt-4 px-3 py-1 text-[0.75rem] bg-[#ECFDF5] text-[#75BF85] rounded w-[4.4rem] mx-auto">
                  Aktif
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-[#C2C7D0] py-6">
            <div className="mb-4">
              <p> Tags </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="h-[1.5rem] w-auto px-3 text-[0.75rem] border border-[#C2C7D0] rounded-[0.25rem] flex items-center justify-center"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* DETAIL PRODUK PADUAN */}
          {/* <DetailProductPaduan /> */}

          {/* DETAIL PRODUK VARIAN */}
          {/* <DetailProductVariant /> */}

          <div className="border-b border-[#C2C7D0] py-6">
            <div className="mb-2">
              <p> Detail Produk </p>
            </div>
            <div className="flex-1 space-y-10">
              <div className="flex flex-wrap w-full">
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Isi / Content: </p>
                  <p className="font-[400] mt-1"> 34 cm </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Kemasan: </p>
                  <p className="font-[400] mt-1"> Plastik </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Barcode: </p>
                  <p className="font-[400] mt-1"> 78882271827781 </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Kode SKU: </p>
                  <p className="font-[400] mt-1"> 557781235 </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-[#C2C7D0] py-6">
            <div className="mb-2">
              <p> Harga Multi Satuan </p>
            </div>
            <div className="flex-1 space-y-10">
              <div className="flex flex-wrap w-full">
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Eceran - 1 plastik: </p>
                  <p className="font-[400] mt-1"> Rp 35.000 </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Dus - 24 plastik: </p>
                  <p className="font-[400] mt-1"> Rp 840.000 </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Dozen - 288 plastik: </p>
                  <p className="font-[400] mt-1"> Rp 10.200.000 </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-[#C2C7D0] py-6">
            <div className="mb-2">
              <p> Stok Produk </p>
            </div>
            <div className="flex-1 space-y-10">
              <div className="flex flex-wrap w-full">
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Lacak Stok Produk: </p>
                  <p className="font-[400] mt-1"> Aktif </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Peringatan Stok Minimum: </p>
                  <p className="font-[400] mt-1"> 0 Produk </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Peringatan Produk Kedaluwarsa: </p>
                  <p className="font-[400] mt-1"> Aktif - 1 Hari </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Stok produk saat ini: </p>
                  <p className="font-[400] mt-1"> 100 plastik </p>
                </div>
                <div className="text-[14px] w-1/2 mt-6">
                  <p className="font-semibold"> Tanggal Kedaluwarsa: </p>
                  <p className="font-[400] mt-1"> 12/12/2024 </p>
                </div>
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
              <DataTable width="100%" table={tableChangeStockHistory} isLoading={false} />
            </CardContent>
          </Card>

          <div className="mt-10 border-t pt-4">
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
        </CardContent>
      </Card>
    </>
  );
}

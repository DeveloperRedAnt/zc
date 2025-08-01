'use client';

import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

type SalesVariant = {
  nama_produk_utama: string;
  nama_varian: string;
  jumlah_terjual: string;
  persentase_penjualan: string;
};
const columnHelper = createColumnHelper<SalesVariant>();

const mockData: SalesVariant[] = [
  {
    nama_produk_utama: 'Mini Ceramic Diffuser 1 pcs',
    nama_varian: 'Paket - A',
    jumlah_terjual: '10 Box',
    persentase_penjualan: '19,201%',
  },
  {
    nama_produk_utama: 'Organic Oat Cookies 180 gr',
    nama_varian: 'Raisin & Chia - Big',
    jumlah_terjual: '112 Plastik',
    persentase_penjualan: '10,553%',
  },
  {
    nama_produk_utama: 'Organic Oat Cookies 180 gr',
    nama_varian: 'Raisin & Chia - Medium',
    jumlah_terjual: '20 Plastik',
    persentase_penjualan: '8,411%',
  },
  {
    nama_produk_utama: 'Organic Oat Cookies 180 gr',
    nama_varian: 'Chocochip - Small',
    jumlah_terjual: '156 Plastik',
    persentase_penjualan: '12,134%',
  },
  {
    nama_produk_utama: 'Wedang Rempah Tradisional 1 gr',
    nama_varian: 'Coklat - Small',
    jumlah_terjual: '255 Pack',
    persentase_penjualan: '19,2%',
  },
  {
    nama_produk_utama: 'Wedang Rempah Tradisional 1 gr',
    nama_varian: 'Coklat - Big',
    jumlah_terjual: '50 Pack',
    persentase_penjualan: '13%',
  },
  {
    nama_produk_utama: 'Wedang Rempah Tradisional 1 gr',
    nama_varian: 'Original - Small',
    jumlah_terjual: '22 Pack',
    persentase_penjualan: '13,912%',
  },
];

export function SalesVariantTable() {
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('nama_produk_utama', {
        header: () => <div className="font-bold text-black">Nama Produk Utama</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('nama_varian', {
        header: () => <div className="font-bold text-black">Nama Varian</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('jumlah_terjual', {
        header: () => <div className="font-bold text-black">Jumlah Terjual</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('persentase_penjualan', {
        header: () => <div className="font-bold text-black">Persentase Penjualan</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto py-2">
      {/* Replace with your DataTable component */}
      {/* <DataTable table={table} /> */}
      {/* <DataTablePagination table={table} isLoading={false} /> */}
      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : typeof header.column.columnDef.header === 'function'
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {typeof cell.column.columnDef.cell === 'function'
                    ? cell.column.columnDef.cell(cell.getContext())
                    : cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

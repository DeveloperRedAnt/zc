'use client';

import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

type SalesDetailTable = {
  periode: string;
  nama_produk: string;
  jumlah_produk: string;
  nominal_penjualan: string;
  potongan: string;
  tambahan_biaya: string;
  pajak: string;
};
const columnHelper = createColumnHelper<SalesDetailTable>();

const mockData: SalesDetailTable[] = [
  {
    periode: '19/07/2025',
    nama_produk: 'Papua New Guinea Organic Robusta 250 gr',
    jumlah_produk: 'Rp 4.373.475',
    nominal_penjualan: 'Rp 143.758',
    potongan: 'Rp 172.772',
    tambahan_biaya: '16 Transaksi',
    pajak: 'Rp 84.000',
  },
  {
    periode: '18/07/2025',
    nama_produk: 'Kopi Gato 500 gr',
    jumlah_produk: 'Rp 1.069.382',
    nominal_penjualan: 'Rp 42.221',
    potongan: 'Rp 164.781',
    tambahan_biaya: '2 Transaksi',
    pajak: 'Rp 56.000',
  },
  {
    periode: '17/07/2025',
    nama_produk: 'Kaos Combed 34 cm (Merah - Small)',
    jumlah_produk: 'Rp 4.917.177',
    nominal_penjualan: 'Rp 74.707',
    potongan: 'Rp 95.488',
    tambahan_biaya: '35 Transaksi',
    pajak: 'Rp 32.000',
  },
];

export function SalesDetailTable() {
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('periode', {
        header: () => <div className="font-bold text-black">Periode</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('nama_produk', {
        header: () => <div className="font-bold text-black">Nama Produk</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('jumlah_produk', {
        header: () => <div className="font-bold text-black">Jumlah Produk</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('nominal_penjualan', {
        header: () => <div className="font-bold text-black">Nominal Penjualan</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('potongan', {
        header: () => <div className="font-bold text-black">Potongan</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('tambahan_biaya', {
        header: () => <div className="font-bold text-black">Tambahan Biaya</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('pajak', {
        header: () => <div className="font-bold text-black">Pajak</div>,
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

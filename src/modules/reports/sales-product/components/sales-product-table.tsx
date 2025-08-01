'use client';

import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

type SalesProduct = {
  nama_produk: string;
  jumlah_terjual: string;
  nominal_penjualan: string;
  hpp: string;
  laba: string;
  persentase_penjualan: string;
};
const columnHelper = createColumnHelper<SalesProduct>();

const mockData: SalesProduct[] = [
  {
    nama_produk: 'Papua New Guinea Organic Robusta 250 gr',
    jumlah_terjual: '112 Zak',
    nominal_penjualan: 'Rp 1.109.561',
    hpp: 'Rp 752.102',
    laba: 'Rp 357.459',
    persentase_penjualan: '10,553%',
  },
  {
    nama_produk: 'Aloe Vera Hydrating Gel 100 ml',
    jumlah_terjual: '20 Jar',
    nominal_penjualan: 'Rp 510.824',
    hpp: 'Rp 337.920',
    laba: 'Rp 172.904',
    persentase_penjualan: '8,411%',
  },
  {
    nama_produk: 'Rose Bloom Face Mist 60 ml',
    jumlah_terjual: '156 Botol',
    nominal_penjualan: 'Rp 1.144.466',
    hpp: 'Rp 1.012.774',
    laba: 'Rp 131.692',
    persentase_penjualan: '12,134%',
  },
  {
    nama_produk: 'Organic Oat Cookies 180 gr (Raisin & Chia - Big)',
    jumlah_terjual: '255 Plastik',
    nominal_penjualan: 'Rp 1.241.380',
    hpp: 'Rp 1.077.740',
    laba: 'Rp 163.640',
    persentase_penjualan: '19,2%',
  },
  {
    nama_produk: 'Raw Honey Sumbawa 500 ml',
    jumlah_terjual: '50 Botol',
    nominal_penjualan: 'Rp 1.618.929',
    hpp: 'Rp 718.975',
    laba: 'Rp 899.954',
    persentase_penjualan: '13%',
  },
  {
    nama_produk: 'Wedang Rempah Tradisional 1 gr (Coklat - Small)',
    jumlah_terjual: '22 Sachet',
    nominal_penjualan: 'Rp 609.479',
    hpp: 'Rp 561.108',
    laba: 'Rp 48.371',
    persentase_penjualan: '13,912%',
  },
  {
    nama_produk: 'Mini Ceramic Diffuser 1 pcs',
    jumlah_terjual: '10 Box',
    nominal_penjualan: 'Rp 535.012',
    hpp: 'Rp 480.268',
    laba: 'Rp 54.744',
    persentase_penjualan: '19,201%',
  },
];

export function SalesProductTable() {
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('nama_produk', {
        header: () => <div className="font-bold text-black">Nama Produk</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('jumlah_terjual', {
        header: () => <div className="font-bold text-black">Jumlah Terjual</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('nominal_penjualan', {
        header: () => <div className="font-bold text-black">Nominal Penjualan</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('hpp', {
        header: () => <div className="font-bold text-black">HPP</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('laba', {
        header: () => <div className="font-bold text-black">Laba</div>,
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

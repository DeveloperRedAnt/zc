'use client';

import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

type SalesVoidTable = {
  tgl_transaksi: string;
  no_nota: string;
  kasir: string;
  nominal_penjualan: string;
  tgl_void: string;
  penanggungjawab_void: string;
};
const columnHelper = createColumnHelper<SalesVoidTable>();

const mockData: SalesVoidTable[] = [
  {
    tgl_transaksi: '21/01/2025',
    no_nota: 'AA1992280',
    kasir: 'Judith Ruth Rodriguez',
    nominal_penjualan: 'Rp 2.968.829',
    tgl_void: '22/01/2025',
    penanggungjawab_void: 'Katie Keva Sims',
  },
  {
    tgl_transaksi: '20/01/2025',
    no_nota: 'AA1992280',
    kasir: 'Stephanie Rain Nicol',
    nominal_penjualan: 'Rp 2.861.970',
    tgl_void: '21/01/2025',
    penanggungjawab_void: 'John Ethan Dukes',
  },
  {
    tgl_transaksi: '19/01/2025',
    no_nota: 'AA1992280',
    kasir: 'Corina Juliet McCoy',
    nominal_penjualan: 'Rp 1.620.436',
    tgl_void: '20/01/2025',
    penanggungjawab_void: 'Paula Eve Mora',
  },
  {
    tgl_transaksi: '18/01/2025',
    no_nota: 'AA1992280',
    kasir: 'Iva Tenley Ryan',
    nominal_penjualan: 'Rp 1.978.956',
    tgl_void: '19/01/2025',
    penanggungjawab_void: 'Autumn Pearl Phillips',
  },
  {
    tgl_transaksi: '17/01/2025',
    no_nota: 'AA1992280',
    kasir: 'Kimberly Raven Mastrangelo',
    nominal_penjualan: 'Rp 1.951.687',
    tgl_void: '18/01/2025',
    penanggungjawab_void: 'Kathy Jane Pacheco',
  },
  {
    tgl_transaksi: '16/01/2025',
    no_nota: 'AA1992280',
    kasir: 'Paula Eve Mora',
    nominal_penjualan: 'Rp 1.726.313',
    tgl_void: '17/01/2025',
    penanggungjawab_void: 'Judith Ruth Rodriguez',
  },
  {
    tgl_transaksi: '15/01/2025',
    no_nota: 'AA1992280',
    kasir: 'Eddie Liam Lake',
    nominal_penjualan: 'Rp 2.449.505',
    tgl_void: '16/01/2025',
    penanggungjawab_void: 'Corina Juliet McCoy',
  },
];

export function SalesVoidTable() {
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('tgl_transaksi', {
        header: () => <div className="font-bold text-black">Tgl Transaksi</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('no_nota', {
        header: () => <div className="font-bold text-black">No. Nota</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('kasir', {
        header: () => <div className="font-bold text-black">Kasir</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('nominal_penjualan', {
        header: () => <div className="font-bold text-black">Nominal Penjualan</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('tgl_void', {
        header: () => <div className="font-bold text-black">Tgl Void</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('penanggungjawab_void', {
        header: () => <div className="font-bold text-black">Penanggungjawab Void</div>,
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

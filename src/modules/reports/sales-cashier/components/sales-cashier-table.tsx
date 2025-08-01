'use client';

import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

type SalesCashierTable = {
  periode: string;
  nama_kasir: string;
  transaksi: string;
  omzet: string;
  shift: string;
  rata_rata_transaksi_per_shift: string;
  transaksi_dibatalkan: string;
  transaksi_retur: string;
};
const columnHelper = createColumnHelper<SalesCashierTable>();

const mockData: SalesCashierTable[] = [
  {
    periode: '21/01/2025',
    nama_kasir: 'Kenneth Percy Allen',
    transaksi: '255 Transaksi',
    omzet: 'Rp 3.680.952',
    shift: '2 Shift',
    rata_rata_transaksi_per_shift: '127,5 Transaksi',
    transaksi_dibatalkan: '15 Transaksi',
    transaksi_retur: '6 Transaksi',
  },
  {
    periode: '20/01/2025',
    nama_kasir: 'Judith Ruth Rodriguez',
    transaksi: '252 Transaksi',
    omzet: 'Rp 3.680.952',
    shift: '2 Shift',
    rata_rata_transaksi_per_shift: '126 Transaksi',
    transaksi_dibatalkan: '2 Transaksi',
    transaksi_retur: '16 Transaksi',
  },
  {
    periode: '19/01/2025',
    nama_kasir: 'Paula Eve Mora',
    transaksi: '250 Transaksi',
    omzet: 'Rp 3.680.952',
    shift: '2 Shift',
    rata_rata_transaksi_per_shift: '125 Transaksi',
    transaksi_dibatalkan: '0 Transaksi',
    transaksi_retur: '17 Transaksi',
  },
  {
    periode: '18/01/2025',
    nama_kasir: 'Dennis Sebastian Callis',
    transaksi: '252 Transaksi',
    omzet: 'Rp 3.680.952',
    shift: '2 Shift',
    rata_rata_transaksi_per_shift: '126 Transaksi',
    transaksi_dibatalkan: '1 Transaksi',
    transaksi_retur: '11 Transaksi',
  },
  {
    periode: '17/01/2025',
    nama_kasir: 'Joshua Levi Jones',
    transaksi: '123 Transaksi',
    omzet: 'Rp 3.680.952',
    shift: '2 Shift',
    rata_rata_transaksi_per_shift: '61,5 Transaksi',
    transaksi_dibatalkan: '6 Transaksi',
    transaksi_retur: '3 Transaksi',
  },
  {
    periode: '16/01/2025',
    nama_kasir: 'John Ethan Dukes',
    transaksi: '116 Transaksi',
    omzet: 'Rp 3.680.952',
    shift: '2 Shift',
    rata_rata_transaksi_per_shift: '58 Transaksi',
    transaksi_dibatalkan: '2 Transaksi',
    transaksi_retur: '0 Transaksi',
  },
  {
    periode: '15/01/2025',
    nama_kasir: 'Stephanie Taya Sharkey',
    transaksi: '65 Transaksi',
    omzet: 'Rp 3.680.952',
    shift: '2 Shift',
    rata_rata_transaksi_per_shift: '32,5 Transaksi',
    transaksi_dibatalkan: '1 Transaksi',
    transaksi_retur: '1 Transaksi',
  },
];

export function SalesCashierTable() {
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('periode', {
        header: () => <div className="font-bold text-black">Periode</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('nama_kasir', {
        header: () => <div className="font-bold text-black">Nama Kasir</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('transaksi', {
        header: () => <div className="font-bold text-black">Transaksi</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('omzet', {
        header: () => <div className="font-bold text-black">Omzet</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('shift', {
        header: () => <div className="font-bold text-black">Shift</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('rata_rata_transaksi_per_shift', {
        header: () => <div className="font-bold text-black">Rata-rata Transaksi per Shift</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('transaksi_dibatalkan', {
        header: () => <div className="font-bold text-black">Transaksi Dibatalkan</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('transaksi_retur', {
        header: () => <div className="font-bold text-black">Transaksi Retur</div>,
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

'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React from 'react';

type SalesSummary = {
  periode: string;
  netto: string;
  bruto: string;
  diskon: string;
  pajak: string;
  transaksi_jumlah: string;
  transaksi_nominal: string;
  hpp: string;
};
const columnHelper = createColumnHelper<SalesSummary>();

const mockData: SalesSummary[] = [
  {
    periode: '2022',
    netto: 'Rp 8.262.195',
    bruto: 'Rp 4.373.475',
    diskon: 'Rp 143.758',
    pajak: 'Rp 172.772',
    transaksi_jumlah: '16 Transaksi',
    transaksi_nominal: 'Rp 86.914',
    hpp: 'Rp 3.246.808',
  },
  {
    periode: '2021',
    netto: 'Rp 2.285.097',
    bruto: 'Rp 1.069.382',
    diskon: 'Rp 42.221',
    pajak: 'Rp 164.781',
    transaksi_jumlah: '2 Transaksi',
    transaksi_nominal: 'Rp 599.537',
    hpp: 'Rp 3.246.808',
  },
  {
    periode: '2020',
    netto: 'Rp 7.267.960',
    bruto: 'Rp 4.917.177',
    diskon: 'Rp 74.707',
    pajak: 'Rp 95.488',
    transaksi_jumlah: '35 Transaksi',
    transaksi_nominal: 'Rp 380.764',
    hpp: 'Rp 3.246.808',
  },
];

export function SummaryTable() {
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('periode', {
        header: () => <div className="font-bold text-black">Periode</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('netto', {
        header: () => <div className="font-bold text-black">Netto</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('bruto', {
        header: () => <div className="font-bold text-black">Bruto</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('diskon', {
        header: () => <div className="font-bold text-black">Diskon</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('pajak', {
        header: () => <div className="font-bold text-black">Pajak</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: 'transaksi',
        header: () => (
          <div className="font-bold text-black text-center">
            Transaksi
            <div className="flex justify-center gap-2 text-xs mt-1">
              <span>Jumlah</span>
              <span>Nominal</span>
            </div>
          </div>
        ),
        cell: (info) => (
          <div className="flex flex-col items-center">
            <div>{info.row.original.transaksi_jumlah}</div>
            <div>{info.row.original.transaksi_nominal}</div>
          </div>
        ),
      }),
      columnHelper.accessor('hpp', {
        header: () => <div className="font-bold text-black">HPP</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    ],
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                  {header.isPlaceholder ? null : (
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {typeof header.column.columnDef.header === 'function'
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}

                      {header.column.getCanSort() && (
                        <span className="inline-block w-4">
                          {header.column.getIsSorted() === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : (
                            <ArrowUpDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  )}
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

      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page</span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[70px] h-8 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="min-w-[2rem] text-center">
            <span className="text-sm">{table.getState().pagination.pageIndex + 1}</span>
          </div>

          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

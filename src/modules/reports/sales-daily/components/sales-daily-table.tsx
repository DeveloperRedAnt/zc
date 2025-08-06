'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/core/table';
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from 'lucide-react';
import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';

type SalesDaily = {
  tgl_transaksi: string;
  jumlah_transaksi: string;
  pertumbuhan_transaksi: {
    value: string;
    isUp: boolean | null; // null for 0%
    percent: string;
  };
  jumlah_pendapatan: string;
  pertumbuhan_pendapatan: {
    value: string;
    isUp: boolean | null;
    percent: string;
  };
};
const columnHelper = createColumnHelper<SalesDaily>();

const mockData: SalesDaily[] = [
  {
    tgl_transaksi: '21/01/2025',
    jumlah_transaksi: '255 Transaksi',
    pertumbuhan_transaksi: { value: '3 Transaksi', isUp: true, percent: '1,190%' },
    jumlah_pendapatan: 'Rp 3.680.952',
    pertumbuhan_pendapatan: { value: 'Rp 0', isUp: null, percent: '0%' },
  },
  {
    tgl_transaksi: '20/01/2025',
    jumlah_transaksi: '252 Transaksi',
    pertumbuhan_transaksi: { value: '2 Transaksi', isUp: true, percent: '0,8%' },
    jumlah_pendapatan: 'Rp 3.680.952',
    pertumbuhan_pendapatan: { value: '- Rp 4.140.045', isUp: false, percent: '52,935%' },
  },
  {
    tgl_transaksi: '19/01/2025',
    jumlah_transaksi: '250 Transaksi',
    pertumbuhan_transaksi: { value: '- 2 Transaksi', isUp: false, percent: '0,793%' },
    jumlah_pendapatan: 'Rp 7.820.997',
    pertumbuhan_pendapatan: { value: '- Rp 1.746.409', isUp: false, percent: '18,253%' },
  },
  {
    tgl_transaksi: '18/01/2025',
    jumlah_transaksi: '252 Transaksi',
    pertumbuhan_transaksi: { value: '252 Transaksi', isUp: true, percent: '100%' },
    jumlah_pendapatan: 'Rp 9.567.406',
    pertumbuhan_pendapatan: { value: 'Rp 4.946.946', isUp: true, percent: '107,066%' },
  },
  {
    tgl_transaksi: '17/01/2025',
    jumlah_transaksi: '0 Transaksi',
    pertumbuhan_transaksi: { value: '- 255 Transaksi', isUp: false, percent: '100%' },
    jumlah_pendapatan: 'Rp 4.620.460',
    pertumbuhan_pendapatan: { value: '- Rp 2.311.473', isUp: false, percent: '33,345%' },
  },
  {
    tgl_transaksi: '16/01/2025',
    jumlah_transaksi: '255 Transaksi',
    pertumbuhan_transaksi: { value: '5 Transaksi', isUp: true, percent: '2%' },
    jumlah_pendapatan: 'Rp 6.931.933',
    pertumbuhan_pendapatan: { value: '- Rp 2.257.744', isUp: false, percent: '24,568%' },
  },
  {
    tgl_transaksi: '15/01/2025',
    jumlah_transaksi: '250 Transaksi',
    pertumbuhan_transaksi: { value: '0 Transaksi', isUp: null, percent: '0%' },
    jumlah_pendapatan: 'Rp 9.189.677',
    pertumbuhan_pendapatan: { value: 'Rp 5.689.677', isUp: true, percent: '162,562%' },
  },
];

export default function SalesDailyTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('tgl_transaksi', {
        header: ({ column }) => (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => column.toggleSorting()}
          >
            Tgl Transaksi
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('jumlah_transaksi', {
        header: ({ column }) => (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => column.toggleSorting()}
          >
            Jumlah Transaksi
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('pertumbuhan_transaksi', {
        header: () => <div className="font-bold text-black">Pertumbuhan Transaksi</div>,
        cell: (info) => {
          const { value, isUp, percent } = info.getValue();
          return (
            <span
              className={
                isUp === true
                  ? 'text-green-500'
                  : isUp === false
                    ? 'text-red-400'
                    : 'text-[#C2C7D0]'
              }
            >
              {value}{' '}
              {isUp === true ? (
                <span className="ml-1">↑</span>
              ) : isUp === false ? (
                <span className="ml-1">↓</span>
              ) : null}{' '}
              <span className="text-xs">{percent}</span>
            </span>
          );
        },
      }),
      columnHelper.accessor('jumlah_pendapatan', {
        header: ({ column }) => (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => column.toggleSorting()}
          >
            Jumlah Pendapatan
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('pertumbuhan_pendapatan', {
        header: () => <div className="font-bold text-black">Pertumbuhan Pendapatan</div>,
        cell: (info) => {
          const { value, isUp, percent } = info.getValue();
          return (
            <span
              className={
                isUp === true
                  ? 'text-green-500'
                  : isUp === false
                    ? 'text-red-400'
                    : 'text-[#C2C7D0]'
              }
            >
              {value}{' '}
              {isUp === true ? (
                <span className="ml-1">↑</span>
              ) : isUp === false ? (
                <span className="ml-1">↓</span>
              ) : null}{' '}
              <span className="text-xs">{percent}</span>
            </span>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : typeof header.column.columnDef.header === 'function'
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {typeof cell.column.columnDef.cell === 'function'
                      ? cell.column.columnDef.cell(cell.getContext())
                      : cell.getValue()}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="px-6 py-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px]" icon={<ChevronDown className="h-4 w-4" />}>
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="px-2 py-1 text-sm text-gray-600 disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-600">1</span>
            <button type="button" className="px-2 py-1 text-sm text-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

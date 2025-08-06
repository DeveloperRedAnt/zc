'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from 'lucide-react';
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
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageSize, setPageSize] = React.useState(5);
  const [pageIndex, setPageIndex] = React.useState(0);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('nama_produk_utama', {
        header: ({ column }) => (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => column.toggleSorting()}
          >
            Nama Produk Utama
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
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex,
          pageSize,
        });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

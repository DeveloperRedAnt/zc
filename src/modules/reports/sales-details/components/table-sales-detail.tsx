'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React from 'react';

type ProductDetail = {
  nama_produk: string;
  jumlah_penjualan: string;
  nominal_penjualan: string;
  image_url: string;
};

type TransactionDetail = {
  tanggal: string;
  no_transaksi: string;
  kasir: string;
  total_transaksi: number;
  tambahan_biaya: number;
  potongan: number;
  service_charge: number;
  pajak: number;
  products: ProductDetail[];
};
const columnHelper = createColumnHelper<TransactionDetail>();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const mockData: TransactionDetail[] = [
  {
    tanggal: '21/01/2025',
    no_transaksi: 'AA1992280',
    kasir: 'Judith Ruth Rodriguez',
    total_transaksi: 2968829,
    tambahan_biaya: 59097,
    potongan: 18602,
    service_charge: 4000,
    pajak: 296882,
    products: [
      {
        nama_produk: 'Papua New Guinea Organic Robusta 250 gr',
        jumlah_penjualan: '2 Botol',
        nominal_penjualan: 'Rp 35,068',
        image_url: '/path/to/coffee-image-1.jpg',
      },
      {
        nama_produk: 'Kopi Gato 500 gr',
        jumlah_penjualan: '3 Zak',
        nominal_penjualan: 'Rp 42,243',
        image_url: '/path/to/coffee-image-2.jpg',
      },
      {
        nama_produk: 'Kaos Combed 34 cm (Merah - Small)',
        jumlah_penjualan: '1 Plastik',
        nominal_penjualan: 'Rp 31,954',
        image_url: '/path/to/coffee-image-3.jpg',
      },
    ],
  },
  {
    tanggal: '20/01/2025',
    no_transaksi: 'AA1992280',
    kasir: 'Stephanie Rain Nicol',
    total_transaksi: 2861970,
    tambahan_biaya: 39126,
    potongan: 11965,
    service_charge: 4000,
    pajak: 286197,
    products: [
      {
        nama_produk: 'Papua New Guinea Organic Robusta 250 gr',
        jumlah_penjualan: '2 Botol',
        nominal_penjualan: 'Rp 35,068',
        image_url: '/path/to/coffee-image-1.jpg',
      },
    ],
  },
];

export default function SalesDetailsTable() {
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});
  const [pageSize, setPageSize] = React.useState(10);

  const pageSizeOptions = [10, 20, 30, 40, 50];

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('tanggal', {
        header: () => <div className="font-bold text-black">Tanggal</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('no_transaksi', {
        header: () => <div className="font-bold text-black">No. Transaksi</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('kasir', {
        header: () => <div className="font-bold text-black">Kasir</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('total_transaksi', {
        header: () => <div className="font-bold text-black">Total Transaksi</div>,
        cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
      }),
      columnHelper.accessor('tambahan_biaya', {
        header: () => <div className="font-bold text-black">Tambahan Biaya</div>,
        cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
      }),
      columnHelper.accessor('potongan', {
        header: () => <div className="font-bold text-black">Potongan</div>,
        cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
      }),
      columnHelper.accessor('service_charge', {
        header: () => <div className="font-bold text-black">Service Charge</div>,
        cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
      }),
      columnHelper.accessor('pajak', {
        header: () => <div className="font-bold text-black">Pajak</div>,
        cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
    onPaginationChange: () => {}, // This is just to satisfy the type checking
  });

  return (
    <div className="container mx-auto py-2">
      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="w-10 px-6 py-3" />
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
            <React.Fragment key={row.id}>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => toggleRow(row.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {expandedRows[row.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {typeof cell.column.columnDef.cell === 'function'
                      ? cell.column.columnDef.cell(cell.getContext())
                      : cell.getValue()}
                  </td>
                ))}
              </tr>
              {expandedRows[row.id] && row.original.products && (
                <tr>
                  <td colSpan={row.getVisibleCells().length + 1} className="bg-gray-50">
                    <div className="px-8 py-4">
                      <div className="text-sm mb-3 font-medium">Daftar Produk</div>
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="w-12" />
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                              Nama Produk
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                              Jumlah Penjualan
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                              Nominal Penjualan
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.original.products.map((product) => (
                            <tr
                              key={`${row.original.no_transaksi}-${product.nama_produk}`}
                              className="border-b border-gray-100"
                            >
                              <td className="py-2 pl-4">
                                <div className="w-8 h-8 relative">
                                  <img
                                    src={product.image_url}
                                    alt={product.nama_produk}
                                    className="object-cover rounded-md w-full h-full"
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-2 text-sm">{product.nama_produk}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">
                                {product.jumlah_penjualan}
                              </td>
                              <td className="px-4 py-2 text-sm font-medium">
                                {product.nominal_penjualan}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination and Rows Per Page Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page</span>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger
              className="w-[70px] border-none"
              icon={<ChevronDown className="h-4 w-4" />}
            >
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
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

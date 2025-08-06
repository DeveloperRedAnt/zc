import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';
import { mockData } from '../constants/mock-data';
import type { SalesCashierTableRow } from '../types/sales-cashier-table.types';
import { FilterCashierTable } from './filter-cashier-table';
import { SalesTable } from './sales-table';

const columnHelper = createColumnHelper<SalesCashierTableRow>();

export function SalesCashierTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const pageSize = 10;

  const columns = React.useMemo(() => {
    return [
      columnHelper.accessor('periode', {
        header: ({ column }) => (
          <div
            className="font-bold text-black flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Periode
            <ArrowUpDown
              className={`ml-1 h-3 w-3 ${column.getIsSorted() ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor('nama_kasir', {
        header: ({ column }) => (
          <div
            className="font-bold text-black flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Nama Kasir
            <ArrowUpDown
              className={`ml-1 h-3 w-3 ${column.getIsSorted() ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor('transaksi', {
        header: ({ column }) => (
          <div
            className="font-bold text-black flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Transaksi
            <ArrowUpDown
              className={`ml-1 h-3 w-3 ${column.getIsSorted() ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        ),
        cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor('omzet', {
        header: ({ column }) => (
          <div
            className="font-bold text-black flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Omzet
            <ArrowUpDown
              className={`ml-1 h-3 w-3 ${column.getIsSorted() ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor('shift', {
        header: ({ column }) => (
          <div
            className="font-bold text-black flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Shift
            <ArrowUpDown
              className={`ml-1 h-3 w-3 ${column.getIsSorted() ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor('rata_rata_transaksi_per_shift', {
        header: ({ column }) => (
          <div
            className="font-bold text-black flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Rata-rata Transaksi per Shift
            <ArrowUpDown
              className={`ml-1 h-3 w-3 ${column.getIsSorted() ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        ),
        cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor('transaksi_dibatalkan', {
        header: ({ column }) => (
          <div
            className="font-bold text-black flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Transaksi Dibatalkan
            <ArrowUpDown
              className={`ml-1 h-3 w-3 ${column.getIsSorted() ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        ),
        cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
        enableSorting: true,
      }),
      columnHelper.accessor('transaksi_retur', {
        header: ({ column }) => (
          <div
            className="font-bold text-black flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Transaksi Retur
            <ArrowUpDown
              className={`ml-1 h-3 w-3 ${column.getIsSorted() ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        ),
        cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
        enableSorting: true,
      }),
    ];
  }, []);
  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(mockData.length / pageSize),
  });

  // Simulate loading state
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto py-2 space-y-4">
      <FilterCashierTable
        responsiblePersonOptions={[
          { value: 'all-responsible', label: 'Semua Penanggungjawab' },
          { value: 'responsible-1', label: 'Penanggungjawab 1' },
          { value: 'responsible-2', label: 'Penanggungjawab 2' },
        ]}
        cashierOptions={[
          { value: 'all-cashier', label: 'Semua Kasir' },
          { value: 'cashier-1', label: 'Kasir 1' },
          { value: 'cashier-2', label: 'Kasir 2' },
        ]}
      />
      <SalesTable table={table} columns={columns} pageSize={pageSize} isLoading={isLoading} />
    </div>
  );
}

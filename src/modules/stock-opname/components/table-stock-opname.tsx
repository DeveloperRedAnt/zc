'use client';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { FileDisplayOne, SortAmountDown, SortAmountUp, SortThree } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React from 'react';

type StockOpname = {
  id: string;
  opname_date: string;
  opname_purpose: string;
  store_name: string;
  product_count: string;
  responsible_person: string;
};

const columnHelper = createColumnHelper<StockOpname>();

function getSortableHeader(
  label: string,
  field: keyof StockOpname,
  currentSortBy: string,
  currentDirection: 'asc' | 'desc',
  onSortChange: (field: string, direction: 'asc' | 'desc') => void
) {
  const isSorted = currentSortBy === field;
  const handleClick = () => {
    if (!isSorted) return onSortChange(field, 'asc');
    if (currentDirection === 'asc') return onSortChange(field, 'desc');
    return onSortChange(field, 'asc');
  };
  return (
    <div
      onClick={handleClick}
      className="font-bold text-black cursor-pointer select-none flex items-center gap-1 justify-between"
    >
      {label}
      {isSorted ? (
        currentDirection === 'asc' ? (
          <SortAmountUp size={16} />
        ) : (
          <SortAmountDown size={16} />
        )
      ) : (
        <SortThree size={16} />
      )}
    </div>
  );
}

export type TableStockOpnameProps = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  setPage: (page: number) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setLimit: (limit: number) => void;
  stockOpnames: StockOpname[];
  isLoading: boolean;
  totalPages: number;
};

export default function TableStockOpname({
  page,
  limit,
  setLimit,
  sortBy,
  sortOrder,
  setPage,
  setSortBy,
  setSortOrder,
  stockOpnames = [],
  isLoading = false,
  totalPages = 1,
}: TableStockOpnameProps) {
  const router = useRouter();

  const setSort = (field: string, direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(direction);
    if (page > 1) {
      setPage(1);
    }
  };

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('opname_date', {
        header: () =>
          getSortableHeader('Tanggal Opname', 'opname_date', sortBy, sortOrder, setSort),
        cell: (info) => <div className="whitespace-normal break-words">{info.getValue()}</div>,
      }),
      columnHelper.accessor('opname_purpose', {
        header: () =>
          getSortableHeader('Keperluan Opname', 'opname_purpose', sortBy, sortOrder, setSort),
        cell: (info) => <div className="whitespace-normal break-words">{info.getValue()}</div>,
      }),
      columnHelper.accessor('store_name', {
        header: () => getSortableHeader('Untuk Toko', 'store_name', sortBy, sortOrder, setSort),
        cell: (info) => <div className="whitespace-normal break-words">{info.getValue()}</div>,
      }),
      columnHelper.accessor('product_count', {
        header: () =>
          getSortableHeader('Jumlah Produk', 'product_count', sortBy, sortOrder, setSort),
        cell: (info) => <div className="whitespace-normal break-words">{info.getValue()}</div>,
      }),
      columnHelper.accessor('responsible_person', {
        header: () =>
          getSortableHeader('Penanggungjawab', 'responsible_person', sortBy, sortOrder, setSort),
        cell: (info) => <div className="whitespace-normal break-words">{info.getValue()}</div>,
      }),
      columnHelper.display({
        id: 'aksi',
        header: () => <div className="font-bold text-black text-center">Aksi</div>,
        cell: (info) => (
          <div className="flex gap-2 justify-center items-center">
            <FileDisplayOne
              className="cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => router.push(`/dashboard/stock-opname/${info.row.original.id}/view`)}
            />
          </div>
        ),
      }),
    ],
    [sortBy, sortOrder, setSort, router]
  );

  const table = useReactTable({
    data: stockOpnames,
    columns,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
      sorting: sortBy && sortOrder ? [{ id: sortBy, desc: sortOrder === 'desc' }] : [],
    },
  });

  return (
    <div className="container mx-auto py-2">
      <DataTable table={table} isLoading={isLoading} />
      <DataTablePagination
        table={table}
        isLoading={isLoading}
        onPage={setPage}
        onPageSize={setLimit}
        page={page}
        pageSize={limit}
        totalPages={totalPages}
      />
    </div>
  );
}

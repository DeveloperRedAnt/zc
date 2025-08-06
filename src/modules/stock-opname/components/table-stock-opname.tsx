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
}: TableStockOpnameProps) {
  const router = useRouter();

  const setSort = (field: string, direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(direction);
    if (page > 1) {
      setPage(1);
    }
  };

  // Mock data for Stock Opname - replace with actual API call later
  const stockOpnameData: StockOpname[] = [
    {
      id: '1',
      opname_date: '07/06/25',
      opname_purpose: 'Opname November',
      store_name: 'PT Ezhe Source',
      product_count: '45 Produk',
      responsible_person: 'Lorri Taya Warf',
    },
    {
      id: '2',
      opname_date: '12/04/25',
      opname_purpose: 'Opname Oktober',
      store_name: 'CV Electronic Geek',
      product_count: '39 Produk',
      responsible_person: 'Kathy Jane Pacheco',
    },
    {
      id: '3',
      opname_date: '28/05/25',
      opname_purpose: 'Opname September',
      store_name: 'PT Super Duper',
      product_count: '40 Produk',
      responsible_person: 'Lorri Taya Warf',
    },
    {
      id: '4',
      opname_date: '29/03/25',
      opname_purpose: 'Opname Agustus',
      store_name: 'CV Cut Rite Lawn Care',
      product_count: '46 Produk',
      responsible_person: 'Lorri Taya Warf',
    },
    {
      id: '5',
      opname_date: '29/10/25',
      opname_purpose: 'Opname Juli',
      store_name: "PT Johnson's General Stores",
      product_count: '11 Produk',
      responsible_person: 'Lorri Taya Warf',
    },
    {
      id: '6',
      opname_date: '01/08/24',
      opname_purpose: 'Checking urgent',
      store_name: 'PT Ezhe Source',
      product_count: '37 Produk',
      responsible_person: 'Kathy Jane Pacheco',
    },
    {
      id: '7',
      opname_date: '03/08/24',
      opname_purpose: 'Opname Juni',
      store_name: 'PT Ezhe Source',
      product_count: '3 Produk',
      responsible_person: 'Kathy Jane Pacheco',
    },
  ];

  const isLoading = false;
  const meta = {
    last_page: 1,
    total: stockOpnameData.length,
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
    data: stockOpnameData,
    columns,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: meta?.last_page ?? -1,
    state: {
      pagination: {
        pageIndex: (page ?? 1) - 1,
        pageSize: limit ?? 10,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newPagination = updater({
          pageIndex: (page ?? 1) - 1,
          pageSize: limit ?? 10,
        });
        setPage(newPagination.pageIndex + 1);
      }
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
      />
    </div>
  );
}

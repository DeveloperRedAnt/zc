'use client';
import { useGetStore } from '@/__generated__/api/hooks';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Edit, FileDisplayOne, SortAmountDown, SortAmountUp, SortThree } from '@icon-park/react';
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

type Store = {
  id: string;
  store_name: string;
  store_type: string;
  store_category: string;
  address: string;
  whatsapp: string;
};

const columnHelper = createColumnHelper<Store>();

function getSortableHeader(
  label: string,
  field: keyof Store,
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

export type TableStoreListProps = {
  search: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  setPage: (page: number) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setLimit: (limit: number) => void;
};

export default function TableStoreList({
  search,
  page,
  limit,
  setLimit,
  sortBy,
  sortOrder,
  setPage,
  setSortBy,
  setSortOrder,
}: TableStoreListProps) {
  const router = useRouter();

  const setSort = (field: string, direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(direction);
    if (page > 1) {
      setPage(1);
    }
  };

  const params = React.useMemo(
    () => ({
      'x-device-id': '1',
      'x-store-id': '1', // Added required x-store-id parameter
      'x-organization-id': '1',
      body: {
        search,
        per_page: limit,
        page: page,
        sort_by: sortBy,
        sort_direction: sortOrder,
      },
    }),
    [search, sortBy, sortOrder, limit, page]
  );

  const { data, isLoading } = useGetStore(params);

  const stores: Store[] = Array.isArray(data?.data)
    ? data.data.map((item) => ({
        id: String(item.id),
        store_name: item.name,
        store_type: '', // StoreItem doesn't have a type property
        store_category: '', // StoreItem doesn't have a category property
        address: item.address,
        whatsapp: item.phone,
      }))
    : [];

  const meta = data?.meta;

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => getSortableHeader('ID', 'id', sortBy, sortOrder, setSort),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('store_name', {
        header: () => getSortableHeader('Nama Toko', 'store_name', sortBy, sortOrder, setSort),
        cell: (info) => <div className="whitespace-normal break-words">{info.getValue()}</div>,
      }),
      columnHelper.accessor('store_type', {
        header: () => getSortableHeader('Tipe Toko', 'store_type', sortBy, sortOrder, setSort),
        cell: (info) => {
          const value = info.getValue();
          const isRetailer = value === 'retail' || value === 'retailer';
          return (
            <div
              className={`h-[1.5rem] px-3 py-1 text-[0.75rem] rounded w-[8.5rem] text-center ${
                isRetailer ? 'bg-[#ECFDF5] text-[#75BF85]' : 'bg-[#D8F9FF] text-[#0FA6C1]'
              }`}
            >
              {value}
            </div>
          );
        },
      }),
      columnHelper.accessor('store_category', {
        header: () => getSortableHeader('Jenis Toko', 'store_category', sortBy, sortOrder, setSort),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('address', {
        header: () => <div className="font-bold text-black">Alamat</div>,
        cell: (info) => <div className="whitespace-normal break-words">{info.getValue()}</div>,
      }),
      columnHelper.accessor('whatsapp', {
        header: () => <div className="font-bold text-black">No. Whatsapp</div>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'aksi',
        header: () => <div className="font-bold text-black text-center">Aksi</div>,
        cell: (info) => (
          <div className="flex gap-2 justify-center items-center">
            <FileDisplayOne className="cursor-pointer" />
            <Edit
              className="cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => router.push(`/dashboard/store/${info.row.original.id}/edit`)}
            />
          </div>
        ),
      }),
    ],
    [sortBy, sortOrder, setSort, router]
  );

  const table = useReactTable({
    data: stores,
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

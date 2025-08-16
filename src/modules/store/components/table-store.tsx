'use client';
import { useGetStore } from '@/__generated__/api/hooks';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Edit, SortAmountDown, SortAmountUp, SortThree } from '@icon-park/react';
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
  type: string;
  category: string;
  address: string;
  whatsapp: string;
  lat?: number | null;
  long?: number | null;
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
        type: item.type,
        category: item.category,
        address: item.address,
        whatsapp: item.phone,
        lat: item.lat,
        long: item.long,
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
      columnHelper.accessor('type', {
        header: () => getSortableHeader('Tipe Toko', 'type', sortBy, sortOrder, setSort),
        cell: (info) => {
          const value = info.getValue();
          const isRetailer = value === 'retail' || value === 'retailer';
          return (
            <div
              className={`h-[1.5rem] px-3 py-1 text-[0.75rem] rounded text-center inline-block ${
                isRetailer ? 'bg-[#ECFDF5] text-[#75BF85]' : 'bg-[#D8F9FF] text-[#0FA6C1]'
              }`}
            >
              {value}
            </div>
          );
        },
      }),
      columnHelper.accessor('category', {
        header: () => getSortableHeader('Jenis Toko', 'category', sortBy, sortOrder, setSort),
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
        cell: (info) => {
          const store = info.row.original;
          const isLocationAvailable = store.lat != null && store.long != null;
          return (
            <div className="flex gap-2 justify-center items-center">
              {isLocationAvailable && (
                <button
                  type="button"
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps?q=${store.lat},${store.long}`;
                    window.open(mapsUrl, '_blank');
                  }}
                  className="transition-colors p-0 bg-transparent border-0 cursor-pointer"
                  title="Lihat di Google Maps"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.28616 10.918C2.0795 11.28 1.3335 11.78 1.3335 12.3323C1.3335 13.437 4.31816 14.3323 8.00016 14.3323C11.6822 14.3323 14.6668 13.437 14.6668 12.3323C14.6668 11.78 13.9205 11.28 12.7142 10.918"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.00033 11.6654C8.00033 11.6654 12.3337 8.83336 12.3337 5.55936C12.3337 3.2247 10.3937 1.33203 8.00033 1.33203C5.60699 1.33203 3.66699 3.2247 3.66699 5.55936C3.66699 8.83336 8.00033 11.6654 8.00033 11.6654Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.00016 7.33333C8.44219 7.33333 8.86611 7.15774 9.17867 6.84518C9.49123 6.53262 9.66683 6.10869 9.66683 5.66667C9.66683 5.22464 9.49123 4.80072 9.17867 4.48816C8.86611 4.17559 8.44219 4 8.00016 4C7.55814 4 7.13421 4.17559 6.82165 4.48816C6.50909 4.80072 6.3335 5.22464 6.3335 5.66667C6.3335 6.10869 6.50909 6.53262 6.82165 6.84518C7.13421 7.15774 7.55814 7.33333 8.00016 7.33333Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <Edit
                className="cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => router.push(`/dashboard/store/${store.id}/edit`)}
              />
            </div>
          );
        },
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

'use client';

import { useGetEmployee } from '@/__generated__/api/hooks/user.hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/dropdown-menu';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { useStoreId } from '@/hooks/use-store-aware-queries';
import { useUserEditStore } from '@/modules/user/user-edit-store';
import {
  Edit,
  FileDisplayOne,
  ImageFiles,
  MoreOne,
  OpenOne,
  Refresh,
  SortAmountDown,
  SortAmountUp,
  SortThree,
  SwitchButton,
} from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useMemo, useCallback, useState } from 'react';
import DialogFormResetPass from './dialog-form-reset-pass';
import DialogFormResetPin from './dialog-form-reset-pin';

type User = {
  id: number;
  image: string;
  name: string;
  email: string;
  phone: string;
  store_count: string;
  is_active: boolean;
};

const getTextClass = (active: boolean) => (!active ? 'text-[#C2C7D0]' : 'text-black');

const columnHelper = createColumnHelper<User>();

function getSortableHeader(
  label: string,
  field: keyof User,
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

export type TableUserProps = {
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
  search: string;
  setSearch: (search: string) => void;
  status: string;
  setStatus: (status: string) => void;
};

export default function TableUser({
  page,
  setPage,
  perPage,
  setPerPage,
  search,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  status,
}: TableUserProps) {
  // Use the store-aware hook
  const currentStoreId = useStoreId();

  // Memoize callback functions to prevent unnecessary rerenders
  const setSort = useCallback(
    (field: string, direction: string) => {
      switch (field) {
        case 'name':
          setSortBy('name');
          setSortOrder(direction);
          break;
        case 'phone':
          setSortBy('phone');
          setSortOrder(direction);
          break;
        case 'status':
          setSortBy('is_active');
          setSortOrder(direction);
          break;
      }
    },
    [setSortBy, setSortOrder]
  );

  const sortDirection = useMemo(() => (sortOrder === 'asc' ? 'asc' : 'desc'), [sortOrder]);

  const router = useRouter();
  const params = useMemo(
    () => ({
      'x-device-id': '1',
      'x-organization-id': '1',
      body: {
        search,
        page: page,
        per_page: perPage,
        search_by_status: status,
        sort_by: sortBy,
        sort_direction: sortDirection,
      },
    }),
    [search, status, page, sortBy, sortDirection, perPage]
  );

  // Memoize the query parameters to prevent unnecessary rerenders
  const queryParams = useMemo(
    () => ({
      'x-device-id': '1',
      'x-store-id': currentStoreId,
      'x-organization-id': '1',
      body: {
        search,
        page: params.body.page,
        per_page: params.body.per_page,
        search_by_status: params.body.search_by_status || 'all',
        sort_by: params.body.sort_by || 'name',
        sort_direction: params.body.sort_direction || 'asc',
      },
    }),
    [
      currentStoreId,
      search,
      params.body.page,
      params.body.per_page,
      params.body.search_by_status,
      params.body.sort_by,
      params.body.sort_direction,
    ]
  );

  const { data = [], isLoading, isRefetching } = useGetEmployee(queryParams);

  const [toggleResetPassModal, setToggleResetPassModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [toggleResetPinModal, setToggleResetPinModal] = useState(false);

  // Memoizing columns with proper dependencies
  const baseColumns = useMemo(
    () => [
      columnHelper.accessor('image', {
        header: () => (
          <div className="flex justify-center">
            <ImageFiles fill="#555555" />
          </div>
        ),
        cell: (info) => (
          <div className="flex justify-center">
            <img
              src={info.getValue()}
              alt={`${info.row.original.name} profile`}
              className="w-8 h-8 object-cover rounded-md"
            />
          </div>
        ),
      }),
      columnHelper.accessor('name', {
        header: () => getSortableHeader('Nama User', 'name', sortBy, sortDirection, setSort),
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('email', {
        header: () => <div className="font-bold text-black">Email</div>,
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('phone', {
        header: () => getSortableHeader('No. Whatsapp', 'phone', sortBy, sortDirection, setSort),
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('store_count', {
        header: () =>
          getSortableHeader('Jumlah Toko', 'store_count', sortBy, sortDirection, setSort),
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('is_active', {
        header: () => getSortableHeader('Status', 'is_active', sortBy, sortDirection, setSort),
        cell: (info) => {
          const value = info.getValue();
          return (
            <div
              className={`h-[1.5rem] px-3 py-1 text-[0.75rem] rounded w-[4.4rem] mx-auto text-center ${
                value ? 'bg-[#ECFDF5] text-[#75BF85]' : 'bg-[#FAFAFA] text-[#C2C7D0]'
              }`}
            >
              {value ? 'Aktif' : 'Dicabut'}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'aksi',
        header: () => <div className="font-bold text-black text-center">Aksi</div>,
        cell: (info) => (
          <div className="flex gap-2 justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MoreOne className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/users/${info.row.original.id}`)}
                  >
                    <FileDisplayOne size="16" className="mr-2" /> Detail User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const userData = {
                        id: info.row.original.id,
                        name: info.row.original.name,
                        whatsapp: info.row.original.phone,
                        ktp: '',
                        email: info.row.original.email,
                        image: info.row.original.image,
                        isActive: info.row.original.is_active,
                      };

                      const store = useUserEditStore.getState();
                      store.setUserData(userData);
                      store.setOriginalData(userData); // simpan original
                      router.push(`/dashboard/users/${info.row.original.id}/edit`);
                    }}
                  >
                    <Edit size="16" className="mr-2" /> Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/dashboard/users/${info.row.original.id}/edit-permission`);
                    }}
                  >
                    <SwitchButton size="16" className="mr-2" /> Edit Permission
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedUserId(info.row.original.id);
                      setToggleResetPassModal(true);
                    }}
                  >
                    <OpenOne size="16" className="mr-2" /> Reset Password
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedUserId(info.row.original.id);
                      setToggleResetPinModal(true);
                    }}
                  >
                    <Refresh size="16" className="mr-2" /> Reset PIN
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      }),
    ],
    [sortBy, sortDirection, setSort, router]
  );

  // Memoize data to prevent unnecessary rerenders
  const tableData = useMemo(() => data, [data]);

  // Memoize the table options object
  const tableOptions = useMemo(
    () => ({
      data: tableData,
      columns: baseColumns,
      manualSorting: true,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        pagination: {
          pageIndex: (page || 1) - 1,
          pageSize: perPage || 10,
        },
        sorting: sortBy
          ? [
              {
                id: sortBy,
                desc: sortOrder === 'desc',
              },
            ]
          : [],
      },
    }),
    [tableData, baseColumns, page, perPage, sortBy, sortOrder]
  );

  // Call useReactTable at the top level with memoized options
  const table = useReactTable(tableOptions);

  return (
    <div className="container mx-auto py-2">
      <DataTable table={table} />
      <DataTablePagination
        onPage={setPage}
        onPageSize={setPerPage}
        table={table}
        isLoading={isLoading || isRefetching}
        page={page}
        pageSize={perPage}
      />

      {/* MODAL FORM RESET PASSWORD */}
      <DialogFormResetPass
        open={toggleResetPassModal}
        onOpenChange={setToggleResetPassModal}
        selectedUserId={selectedUserId}
        onResetSuccess={() => {
          setToggleResetPassModal(false);
          setSelectedUserId(null);
        }}
      />

      {/* MODAL FORM RESET PIN */}
      <DialogFormResetPin
        open={toggleResetPinModal}
        onOpenChange={setToggleResetPinModal}
        selectedUserId={selectedUserId}
        onResetSuccess={() => {
          setToggleResetPinModal(false);
          setSelectedUserId(null);
        }}
      />
    </div>
  );
}

'use client';

import { useGetMember } from '@/__generated__/api/hooks/member.hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/dropdown-menu';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import {
  Edit,
  FileDisplayOne,
  MoreOne,
  SortAmountDown,
  SortAmountUp,
  SortThree,
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
import React from 'react';

type Member = {
  id: number;
  name: string;
  created_at: string;
  phone: string;
  is_active: boolean;
  purchases_summary: {
    montly: number;
    yearly: number;
    all_time: number;
  };
  monthly_formatted: string;
  yearly_formatted: string;
  all_time_formatted: string;
  registered_formatted: string;
};

const getTextClass = (active: boolean) => (!active ? 'text-[#C2C7D0]' : 'text-black');

const columnHelper = createColumnHelper<Member>();

function getSortableHeader(
  label: string,
  field: keyof Member,
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
      className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
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

export type TableMemberProps = {
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
  onEditMember?: (member: Member) => void;
};

export default function TableMember({
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
  onEditMember,
}: TableMemberProps) {
  const setSort = (field: string, direction: string) => {
    switch (field) {
      case 'name':
        setSortBy('name');
        setSortOrder(direction);
        break;
      case 'phone':
        setSortBy('phone');
        setSortOrder(direction);
        break;
      case 'created_at':
        setSortBy('created_at');
        setSortOrder(direction);
        break;
      case 'is_active':
        setSortBy('is_active');
        setSortOrder(direction);
        break;
    }
  };

  const sortDirection = React.useMemo(() => (sortOrder === 'asc' ? 'asc' : 'desc'), [sortOrder]);

  const router = useRouter();
  const params = React.useMemo(
    () => ({
      'x-device-id': '1',
      'x-organization-id': '1',
      'x-store-id': '1',
      body: {
        search: search || '',
        page: page || 1,
        per_page: perPage || 10,
        search_by_status: status === 'all' ? 'active' : status || 'active',
        sort_by: sortBy || 'name',
        sort_direction: sortDirection || 'asc',
      },
    }),
    [search, status, page, sortBy, sortDirection, perPage]
  );

  const { data, isLoading } = useGetMember(params);
  const dataMembers = data?.data || [];
  const pagination = data?.pagination || { last_page: 0, total: 0 };

  // Memoizing columns with proper dependencies
  const baseColumns = React.useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => getSortableHeader('Nama', 'name', sortBy, sortDirection, setSort),
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('registered_formatted', {
        header: () => getSortableHeader('Terdaftar', 'created_at', sortBy, sortDirection, setSort),
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('phone', {
        header: () => <div className="font-semibold text-[#555555]">No. Telp</div>,
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('monthly_formatted', {
        header: () => <div className="font-semibold text-[#555555]">Bulanan</div>,
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('yearly_formatted', {
        header: () => <div className="font-semibold text-[#555555]">Pembelian Tahunan</div>,
        cell: (info) => (
          <span className={getTextClass(info.row.original.is_active)}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('all_time_formatted', {
        header: () => <div className="font-semibold text-[#555555]">Total Pembelian</div>,
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
              {value ? 'Aktif' : 'Non-Aktif'}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'aksi',
        header: () => <div className="font-semibold text-[#555555] text-center">Aksi</div>,
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
                    onClick={() => router.push(`/dashboard/members/${info.row.original.id}`)}
                  >
                    <FileDisplayOne size="16" className="mr-2" /> Detail Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (onEditMember) {
                        onEditMember(info.row.original);
                      }
                      router.push(`/dashboard/members/${info.row.original.id}/edit`);
                    }}
                  >
                    <Edit size="16" className="mr-2" /> Edit Member
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      }),
    ],
    [sortBy, sortDirection, setSort, router, onEditMember]
  );

  const table = useReactTable({
    data: dataMembers,
    columns: baseColumns,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: pagination?.last_page || 0,
  });

  return (
    <div className="container mx-auto py-2">
      <DataTable table={table} isLoading={isLoading} />
      <DataTablePagination
        onPage={setPage}
        onPageSize={setPerPage}
        table={table}
        isLoading={isLoading}
        page={page}
        pageSize={perPage}
        totalPages={pagination?.last_page || 0}
      />
    </div>
  );
}

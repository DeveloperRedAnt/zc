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
import React from 'react';

type User = {
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  countStore: string;
  status: 'Aktif' | 'Dicabut';
};

const getTextClass = (status: string) =>
  status === 'Dicabut' ? 'text-[#C2C7D0]' : 'text-[#555555]';

const columnHelper = createColumnHelper<User>();
const baseColumns = [
  columnHelper.accessor('image', {
    header: () => (
      <div className="flex justify-center">
        <ImageFiles theme="filled" className="text-[1rem]" fill="#555555" />
      </div>
    ),
    cell: (info) => (
      <div className="flex justify-center">
        <img
          src={info.getValue()}
          alt={`${info.row.original.name} product`}
          className="w-8 h-8 object-cover rounded-md"
        />
      </div>
    ),
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div
          onClick={column.getToggleSortingHandler()}
          className="font-bold text-[#555555] cursor-pointer select-none flex items-center gap-1 justify-between"
        >
          Nama Produk
          {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
          {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
          {!isSorted && <SortThree theme="outline" size="16" />}
        </div>
      );
    },
    cell: (info) => (
      <span className={getTextClass(info.row.original.status)}>{info.getValue()}</span>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('email', {
    header: () => <div className="font-bold text-[#555555]">Email</div>,
    cell: (info) => (
      <span className={getTextClass(info.row.original.status)}>{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('whatsapp', {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div
          onClick={column.getToggleSortingHandler()}
          className="font-bold text-[#555555] cursor-pointer select-none flex items-center gap-1 justify-between"
        >
          Whatsapp
          {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
          {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
          {!isSorted && <SortThree theme="outline" size="16" />}
        </div>
      );
    },
    cell: (info) => (
      <span className={getTextClass(info.row.original.status)}>{info.getValue()}</span>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('countStore', {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div
          onClick={column.getToggleSortingHandler()}
          className="font-bold text-[#555555] cursor-pointer select-none flex items-center gap-1 justify-between"
        >
          Jumlah Toko
          {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
          {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
          {!isSorted && <SortThree theme="outline" size="16" />}
        </div>
      );
    },
    cell: (info) => (
      <span className={getTextClass(info.row.original.status)}>{info.getValue()}</span>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('status', {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div
          onClick={column.getToggleSortingHandler()}
          className="font-bold text-[#555555] cursor-pointer select-none flex items-center justify-between gap-1"
        >
          Status
          {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
          {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
          {!isSorted && <SortThree theme="outline" size="16" />}
        </div>
      );
    },
    cell: (info) => {
      const value = info.getValue();
      const isAktif = value === 'Aktif';
      return (
        <div
          className={`h-[1.5rem] px-3 py-1 text-[0.75rem] rounded w-[4.4rem] mx-auto text-center ${
            isAktif ? 'bg-[#ECFDF5] text-[#75BF85]' : 'bg-[#FAFAFA] text-[#C2C7D0]'
          }`}
        >
          {value}
        </div>
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.display({
    id: 'aksi',
    header: () => <div className="font-bold text-[#555555] text-center">Aksi</div>,
    cell: () => (
      <div className="flex gap-2 justify-center items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreOne className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <FileDisplayOne
                  size="16"
                  style={{ width: '16.34px', height: '16px' }}
                  className="mr-2"
                />
                Detail User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit size="16" style={{ width: '16.34px', height: '16px' }} className="mr-2" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SwitchButton
                  theme="outline"
                  size="16"
                  style={{ width: '16.34px', height: '16px' }}
                  className="mr-2"
                />
                Edit Permission
              </DropdownMenuItem>
              <DropdownMenuItem>
                <OpenOne
                  theme="outline"
                  size="16"
                  style={{ width: '16.34px', height: '16px' }}
                  className="mr-2"
                />
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Refresh size="16" style={{ width: '16.34px', height: '16px' }} className="mr-2" />
                Reset PIN
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  }),
];

const userData: User[] = [
  {
    image: '/assets/zycas/default-image-user.png',
    name: 'Kurt Bates',
    email: 'iva838@outlook.com',
    whatsapp: '+6289209481722',
    countStore: '3 Toko',
    status: 'Aktif',
  },
  {
    image: '/assets/zycas/default-image-user.png',
    name: 'Corina McCoy',
    email: 's.t.sharkey@outlook.com',
    whatsapp: '+6288144139191',
    countStore: '1 Toko',
    status: 'Aktif',
  },
  {
    image: '/assets/zycas/default-image-user.png',
    name: 'Stephanie Sharkey',
    email: 'f.j.swann@aol.com',
    whatsapp: '+6282677396240',
    countStore: '1 Toko',
    status: 'Dicabut',
  },
];

export default function Index() {
  const table = useReactTable({
    data: userData,
    columns: baseColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  });

  return (
    <>
      <div className="container mx-auto py-2">
        <DataTable table={table} />
        <DataTablePagination table={table} isLoading={false} />
      </div>
    </>
  );
}

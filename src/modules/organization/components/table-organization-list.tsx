import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Edit, FileDisplayOne, Right, SortAmountDown, SortAmountUp } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type Organization = {
  id: string;
  name: string;
  phone: string;
  email: string;
  nib: string;
  npwp: string;
};

type Organizations = Array<Organization>;

type TableProductListProps = {
  isLoading?: boolean;
  onEditOrganization?: (organization: Organization) => void;
  organizations: Organizations;
  setPage?: (pageIndex: number) => void;
  setLimit?: (pageSize: number) => void;
  defaultPage?: number;
  defaultPageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  totalPages?: number;
};

export default function Index({
  isLoading = false,
  onEditOrganization,
  organizations,
  setPage,
  setLimit,
  defaultPage = 0,
  defaultPageSize = 10,
  sortBy = 'name',
  sortOrder = 'desc',
  onSortChange,
  totalPages,
}: TableProductListProps) {
  const columnHelper = createColumnHelper<Organization>();
  const baseColumns = [
    columnHelper.accessor('name', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Nama Organisasi
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortAmountUp theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('phone', {
      header: () => <div className="font-semibold text-[#555555]">No. Whatsapp</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: () => <div className="font-semibold text-[#555555]">Email</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('nib', {
      header: () => <div className="font-semibold text-[#555555]">SIUP / NIB</div>,
      cell: ({ row }) => <span>{row.original.nib ? `${row.original.nib}` : ''}</span>,
    }),
    columnHelper.accessor('npwp', {
      header: () => <div className="font-semibold text-[#555555]">NPWP</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'aksi',
      header: () => <div className="font-semibold text-[#555555] text-center">Aksi</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center items-center">
          <FileDisplayOne className="cursor-pointer" />
          <Edit
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => onEditOrganization?.(row.original)}
          />
        </div>
      ),
    }),
  ];

  const accordionColumns = [
    {
      id: 'expander',
      header: () => null,
      cell: ({ row }) => {
        const hasDetails = row.original.details?.length > 0;
        if (!hasDetails) return null;

        return (
          <button
            onClick={() => row.toggleExpanded()}
            className="flex items-center justify-center w-8 h-8 cursor-pointer"
            aria-label={row.getIsExpanded() ? 'Collapse' : 'Expand'}
            type="button"
          >
            <div
              className={`transform transition-transform duration-500 ${
                row.getIsExpanded() ? 'rotate-90' : ''
              }`}
            >
              <Right />
            </div>
          </button>
        );
      },
      size: 32,
    },
    ...baseColumns,
  ];

  const table = useReactTable({
    data: organizations,
    columns: accordionColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: defaultPage,
        pageSize: defaultPageSize,
      },
      sorting: sortBy && sortOrder ? [{ id: sortBy, desc: sortOrder === 'desc' }] : [],
    },
    pageCount: totalPages,
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === 'function' ? updater(table.getState().sorting) : updater;
      if (nextSorting && nextSorting.length > 0 && nextSorting[0] && onSortChange) {
        const sortItem = nextSorting[0];
        if (sortItem && typeof sortItem.id === 'string' && typeof sortItem.desc === 'boolean') {
          onSortChange(sortItem.id, sortItem.desc ? 'desc' : 'asc');
        }
      } else if (onSortChange) {
        onSortChange('name', 'asc');
      }
    },
    manualSorting: true,
  });
  return (
    <>
      <div className="container mx-auto py-2">
        <DataTable table={table} isLoading={false} />
        <DataTablePagination
          table={table}
          isLoading={isLoading}
          onPage={(pageIndex) => setPage?.(pageIndex)}
          onPageSize={(pageSize) => setLimit?.(pageSize)}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

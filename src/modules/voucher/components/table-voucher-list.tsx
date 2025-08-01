import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import {
  Edit,
  FileDisplayOne,
  Right,
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
import React, { useMemo } from 'react';

type Voucher = {
  id: string;
  name: string;
  type: string;
  quantity: string;
  period: string;
  voucher_code: string;
  status: string;
};

type TableProductListProps = {
  isLoading?: boolean;
  onEditVoucher?: (organization: Voucher) => void;
  page?: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
  vouchers: Voucher[];
};

function TableVoucherList({
  isLoading = false,
  onEditVoucher,
  page,
  setPage,
  perPage,
  setPerPage,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  vouchers,
}: TableProductListProps) {
  const columnHelper = createColumnHelper<Voucher>();

  // Memoize the mapped data to prevent unnecessary calculations
  const dataTable = useMemo(
    () =>
      vouchers.map((voucher) => ({
        id: voucher.id,
        name: voucher.name,
        type: voucher.type,
        quantity: voucher.quantity,
        period: voucher.period,
        voucher_code: voucher.voucher_code,
        status: voucher.status,
      })),
    [vouchers]
  );

  const baseColumns = [
    columnHelper.accessor('name', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Nama Voucher
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('type', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Tipe
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => {
        const value = info.getValue();
        const isPersent = value === 'Persen';
        return (
          <div
            className={`h-[1.5rem] px-3 py-1 text-[0.75rem] rounded w-[90px] text-center ${
              isPersent ? 'bg-[#E3FBFF] text-[#0FA6C1]' : 'bg-[#FFF5DF] text-[#FCBA33]'
            }`}
          >
            {value}
          </div>
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor('quantity', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Jumlah
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('period', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Jangka Waktu
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('voucher_code', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Kode Voucher
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('status', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Status
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.display({
      id: 'aksi',
      header: () => <div className="font-semibold text-[#555555] text-center">Aksi</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center items-center">
          <FileDisplayOne className="cursor-pointer" />
          <Edit
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => onEditVoucher?.(row.original)}
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

  // Memoize the columns to prevent recreating them on every render
  const columns = useMemo(() => accordionColumns, [accordionColumns]);

  // Memoize the table options object
  const tableOptions = useMemo(
    () => ({
      data: dataTable,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: (updaterOrValue) => {
        const newSorting =
          typeof updaterOrValue === 'function' ? updaterOrValue([]) : updaterOrValue;
        if (newSorting && newSorting.length > 0 && newSorting[0]) {
          setSortBy(newSorting[0].id);
          setSortOrder(newSorting[0].desc ? 'desc' : 'asc');
        } else {
          setSortBy(''); // Using empty string instead of undefined
          setSortOrder('asc'); // Default to 'asc' instead of undefined
        }
      },
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
    [dataTable, columns, page, perPage, sortBy, sortOrder, setSortBy, setSortOrder]
  );

  // Call useReactTable at the top level, not inside another hook
  const table = useReactTable(tableOptions);

  return (
    <>
      <div className="container mx-auto py-2">
        <DataTable table={table} isLoading={isLoading} />
        <DataTablePagination
          table={table}
          isLoading={isLoading}
          page={page}
          onPage={setPage}
          pageSize={perPage}
          onPageSize={setPerPage}
        />
      </div>
    </>
  );
}

// Use React.memo to prevent unnecessary rerenders when parent components rerender
export default React.memo(TableVoucherList);

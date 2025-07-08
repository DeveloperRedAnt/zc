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
import React from 'react';

type Member = {
  id: string;
  memberName: string;
  registered: string;
  telpNumber: string;
  monthly: string;
  yearly: string;
  overall: string;
  status: string;
};

const memberData: Member[] = [
  {
    id: '0001234',
    memberName: 'Lorri Taya Warf',
    registered: '02/07/25',
    telpNumber: '089072488330',
    monthly: 'Rp 145.714',
    yearly: 'Rp 3.246.808',
    overall: 'Rp 119.397.575',
    status: 'Aktif',
  },
  {
    id: '0001233',
    memberName: 'Kathy Jane Pacheco',
    registered: '27/06/25',
    telpNumber: '087653221399',
    monthly: 'Rp 65.259',
    yearly: 'Rp 783.167',
    overall: 'Rp 58.188.853',
    status: 'Non-Aktif',
  },
  {
    id: '0001232',
    memberName: 'Corina Juliet McCoy',
    registered: '27/06/25',
    telpNumber: '089784444055',
    monthly: 'Rp 128.632',
    yearly: 'Rp 6.112.419',
    overall: 'Rp 107.726.040',
    status: 'Aktif',
  },
  {
    id: '0001231',
    memberName: 'Judith Ruth Rodriguez',
    registered: '21/06/25',
    telpNumber: '082562899707',
    monthly: 'Rp 192.620',
    yearly: 'Rp 8.380.435',
    overall: 'Rp 192.568.544',
    status: 'Non-Aktif',
  },
  {
    id: '0001230',
    memberName: 'Paula Eve Mora',
    registered: '18/06/25',
    telpNumber: '085048966913',
    monthly: 'Rp 235.903',
    yearly: 'Rp 21.580.203',
    overall: 'Rp 170.768.667',
    status: 'Aktif',
  },
  {
    id: '0001229',
    memberName: 'Stephanie Taya Sharkey',
    registered: '12/06/25',
    telpNumber: '088137525611',
    monthly: 'Rp 131.866',
    yearly: 'Rp 28.279.278',
    overall: 'Rp 184.678.584',
    status: 'Aktif',
  },
];

type TableMemberListProps = {
  isLoading?: boolean;
  onEditMember?: (member: Member) => void;
};

export default function Index({ isLoading = false, onEditMember }: TableMemberListProps) {
  const columnHelper = createColumnHelper<Member>();

  const baseColumns = [
    columnHelper.accessor('memberName', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Nama
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('registered', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Terdaftar
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('telpNumber', {
      header: () => <div className="font-semibold text-[#555555]">No. Telp</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('monthly', {
      header: () => <div className="font-semibold text-[#555555]">Bulanan</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('yearly', {
      header: () => <div className="font-semibold text-[#555555]">Pembelian Tahunan</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('overall', {
      header: () => <div className="font-semibold text-[#555555]">Pembelian Tahunan</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: () => <div className="font-semibold text-[#555555]">Pembelian Tahunan</div>,
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
            onClick={() => onEditMember?.(row.original)}
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
    data: memberData,
    columns: accordionColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  });

  return (
    <>
      <div className="container mx-auto py-2">
        <DataTable table={table} isLoading={isLoading} />
        <DataTablePagination table={table} isLoading={isLoading} />
      </div>
    </>
  );
}

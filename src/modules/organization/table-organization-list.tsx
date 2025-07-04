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

type Organization = {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  siup: string;
  npwp: string;
};

const organizationData: Organization[] = [
  {
    id: '0001234',
    name: 'PT Ezhe Source',
    whatsapp: '089072488330',
    email: 'david291@gmail.com',
    siup: '-',
    npwp: '-',
  },
  {
    id: '0001233',
    name: 'PT Specialty Restaurant Group TBK',
    whatsapp: '087653221399',
    email: 'Daniel_hamilton@aol.com',
    siup: '142/1828 A/380.7.81/2021',
    npwp: '-',
  },
  {
    id: '0001232',
    name: 'CV Electronic Geek',
    whatsapp: '089784444055',
    email: 'katie63@aol.com',
    siup: '-',
    npwp: '-',
  },
  {
    id: '0001231',
    name: 'PT Super Duper',
    whatsapp: '082562899707',
    email: 'r.m.smith@gmail.com',
    siup: '142/1828 A/380.7.81/2021',
    npwp: '11.222.333.4-555.666',
  },
  {
    id: '0001230',
    name: 'CV Cut Rite Lawn Care',
    whatsapp: '085049966913',
    email: 'b.b.lawlor@outlook.com',
    siup: '142/1828 A/380.7.81/2021',
    npwp: '11.222.333.4-555.666',
  },
  {
    id: '0001229',
    name: "PT Johnson's General Stores",
    whatsapp: '088137525611',
    email: 'eddie_lake@gmail.com',
    siup: '142/1828 A/380.7.81/2021',
    npwp: '11.222.333.4-555.666',
  },
];

type TableProductListProps = {
  isLoading?: boolean;
  onEditOrganization?: (organization: Organization) => void;
};

export default function Index({ isLoading = false, onEditOrganization }: TableProductListProps) {
  const columnHelper = createColumnHelper<Organization>();

  const baseColumns = [
    columnHelper.accessor('id', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            ID
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
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
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('whatsapp', {
      header: () => <div className="font-semibold text-[#555555]">No. Whatsapp</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: () => <div className="font-semibold text-[#555555]">Email</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('siup', {
      header: () => <div className="font-semibold text-[#555555]">SIUP / NIB</div>,
      cell: (info) => info.getValue(),
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
    data: organizationData,
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

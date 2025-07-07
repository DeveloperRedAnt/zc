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

type Store = {
  id: string;
  storeName: string;
  storeType: string;
  storeCat: string;
  address: string;
  whatsapp: string;
};

const storeData: Store[] = [
  {
    id: '0001234',
    storeName: 'PT Ezhe Source',
    storeType: 'Retail',
    storeCat: 'Makanan',
    address: '2614 Sweetwood Drive, Arvada, CO 80002',
    whatsapp: '089072488330',
  },
  {
    id: '0001233',
    storeName: 'PT Specialty Restaurant Group TBK',
    storeType: 'Food & Beverages',
    storeCat: 'Cafe',
    address: '-',
    whatsapp: '087653221399',
  },
  {
    id: '0001232',
    storeName: 'CV Electronic Geek',
    storeType: 'Retail',
    storeCat: 'Frozen Food',
    address: '-',
    whatsapp: '089784444055',
  },
  {
    id: '0001231',
    storeName: 'PT Super Duper',
    storeType: 'Retail',
    storeCat: 'Kesehatan',
    address: '4130 Butternut Lane, Alton, IL 62002',
    whatsapp: '082562899707',
  },
  {
    id: '0001230',
    storeName: 'CV Cut Rite Lawn Care',
    storeType: 'Retail',
    storeCat: 'Listrik dan Elektronik',
    address: '-',
    whatsapp: '085049966913',
  },
  {
    id: '0001229',
    storeName: "PT Johnson's General Stores",
    storeType: 'Retail',
    storeCat: 'Oleh-oleh',
    address: '3024 Joes Road, Albany, NY 12207',
    whatsapp: '088137525611',
  },
];

type TableProductListProps = {
  isLoading?: boolean;
  onEditOrganization?: (organization: Store) => void;
};

export default function Index({ isLoading = false, onEditOrganization }: TableProductListProps) {
  const columnHelper = createColumnHelper<Store>();

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
    columnHelper.accessor('storeName', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Nama Toko
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('storeType', {
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
    columnHelper.accessor('storeCat', {
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
    columnHelper.accessor('address', {
      header: () => <div className="font-semibold text-[#555555]">Alamat</div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('whatsapp', {
      header: () => <div className="font-semibold text-[#555555]">No. Whatsapp</div>,
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
    data: storeData,
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

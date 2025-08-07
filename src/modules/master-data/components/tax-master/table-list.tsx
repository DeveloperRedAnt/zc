import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { TaxMaster } from '@/modules/master-data/types/tax-master';
import { Edit } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type TableTaxMasterListProps = {
  handleEditButton?: (taxMaster: TaxMaster) => void;
};

const data: TaxMaster[] = [
  {
    store_id: 1,
    store: 'PT Ezhe Source',
    tax: '12.0',
  },
  {
    store_id: 2,
    store: 'PT Specialty Restaurant Group TBK',
    tax: '12.0',
  },
  {
    store_id: 1,
    store: 'CV Electronic Geek',
    tax: '0.0',
  },
];

export default function Index({ handleEditButton }: TableTaxMasterListProps) {
  const columnHelper = createColumnHelper<TaxMaster>();
  const baseColumns = [
    columnHelper.accessor('store', {
      header: () => <div className="font-semibold text-black"> Toko </div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('tax', {
      header: () => <div className="font-semibold text-black"> Persen Pajak </div>,
      cell: (info) => `${info.getValue()}%`,
    }),
    columnHelper.display({
      id: 'aksi',
      header: () => <div className="font-semibold text-black text-center"> Aksi </div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center items-center">
          <Edit
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => handleEditButton?.(row.original)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: data,
    columns: baseColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: false,
  });
  return (
    <>
      <div className="container py-2 w-full">
        <DataTable table={table} isLoading={false} />
        <DataTablePagination table={table} isLoading={false} />
      </div>
    </>
  );
}

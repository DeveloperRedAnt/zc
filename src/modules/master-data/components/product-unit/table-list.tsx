import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Unit } from '@/modules/master-data/types/unit';
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

type TableUnitListProps = {
  handleEditButton?: (unit: Unit) => void;
};

const data: Unit[] = [
  {
    id: '1',
    name: 'ml',
  },
  {
    id: '2',
    name: 'pcs',
  },
  {
    id: '3',
    name: 'box',
  },
];

export default function Index({ handleEditButton }: TableUnitListProps) {
  const columnHelper = createColumnHelper<Unit>();
  const baseColumns = [
    columnHelper.accessor('name', {
      header: () => <div className="font-semibold text-black text-center"> Nama </div>,
      cell: (info) => info.getValue(),
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
      <div className="container mx-auto py-2">
        <DataTable table={table} isLoading={false} width={'50%'} />
        <DataTablePagination table={table} isLoading={false} />
      </div>
    </>
  );
}

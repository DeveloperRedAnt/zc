import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Position } from '@/modules/master-data/types/position';
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

type TablePositionListProps = {
  handleEditButton?: (position: Position) => void;
};

const data: Position[] = [
  {
    id: '1',
    name: 'Owner',
  },
  {
    id: '2',
    name: 'Co-owner',
  },
  {
    id: '3',
    name: 'Kasir',
  },
];

export default function Index({ handleEditButton }: TablePositionListProps) {
  const columnHelper = createColumnHelper<Position>();
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
      <div className="container py-2 w-[50%]">
        <DataTable table={table} isLoading={false} />
        <DataTablePagination table={table} isLoading={false} />
      </div>
    </>
  );
}

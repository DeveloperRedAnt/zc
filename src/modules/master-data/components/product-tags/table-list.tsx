import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Tag } from '@/modules/master-data/types/tag';
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

type TableTagListProps = {
  handleEditButton?: (tag: Tag) => void;
};

const data: Tag[] = [
  {
    id: '1',
    name: 'promo',
  },
  {
    id: '2',
    name: 'flash sale',
  },
  {
    id: '3',
    name: 'panas',
  },
  {
    id: '4',
    name: 'minuman',
  },
  {
    id: 5,
    name: 'makanan',
  },
];

export default function Index({ handleEditButton }: TableTagListProps) {
  const columnHelper = createColumnHelper<Tag>();
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

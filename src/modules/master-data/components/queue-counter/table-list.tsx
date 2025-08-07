import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { QueueCounter } from '@/modules/master-data/types/queue-counter';
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

type TableQueueCounterListProps = {
  handleEditButton?: (queueCounter: QueueCounter) => void;
};

const data: QueueCounter[] = [
  {
    store_id: 1,
    store: 'PT Ezhe Source',
    prefix: 'EZH',
    counter_start: 1,
    rotation: 30,
  },
  {
    store_id: 2,
    store: 'PT Specialty Restaurant Group TBK',
    prefix: 'SRG',
    counter_start: 1,
    rotation: 7,
  },
  {
    store_id: 3,
    store: 'CV Electronic Geek',
    prefix: 'ZYC',
    counter_start: 1,
    rotation: 1,
  },
];

export default function Index({ handleEditButton }: TableQueueCounterListProps) {
  const columnHelper = createColumnHelper<QueueCounter>();
  const baseColumns = [
    columnHelper.accessor('store', {
      header: () => <div className="font-semibold text-black"> Toko </div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('prefix', {
      header: () => <div className="font-semibold text-black"> Prefix </div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('counter_start', {
      header: () => <div className="font-semibold text-black"> No. Urut Awal </div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('rotation', {
      header: () => <div className="font-semibold text-black"> Reset Rotasi </div>,
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
      <div className="container py-2 w-full">
        <DataTable table={table} isLoading={false} />
        <DataTablePagination table={table} isLoading={false} />
      </div>
    </>
  );
}

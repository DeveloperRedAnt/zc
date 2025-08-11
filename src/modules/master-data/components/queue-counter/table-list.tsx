import { useGetQueueCounterList } from '@/__generated__/api/hooks/master-data/queue-counter.hooks';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { QueueCounter } from '@/modules/master-data/types/queue-counter';
import { Edit } from '@icon-park/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState, useMemo } from 'react';

type QueueCounterApiItem = QueueCounter & {
  queue_counter?: {
    prefix: string;
    counter_start: number;
    rotation: number;
  };
};

type TableQueueCounterListProps = {
  handleEditButton?: (queueCounter: QueueCounter) => void;
};

export default function Index({ handleEditButton }: TableQueueCounterListProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const page = pagination.pageIndex + 1;
  const perPage = pagination.pageSize;

  const { data, isLoading } = useGetQueueCounterList({
    page,
    per_page: perPage,
  });

  const rotationMap: Record<number, string> = {
    1: '1 Hari',
    2: '7 Hari',
    3: '1 Bulan',
    4: '1 Tahun',
  };

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
      cell: (info) => rotationMap[info.getValue()],
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

  const queueCounters: QueueCounter[] = useMemo(() => {
    return (
      data?.data.map((item: QueueCounterApiItem) => ({
        store_id: item.store_id,
        store: item.store,
        prefix: item.queue_counter?.prefix || item.prefix,
        counter_start: item.queue_counter?.counter_start || item.counter_start,
        rotation: item.queue_counter?.rotation || item.rotation,
      })) ?? []
    );
  }, [data]);

  const table = useReactTable({
    data: queueCounters,
    columns: baseColumns,
    pageCount: Math.ceil((data?.pagination?.total ?? 0) / pagination.pageSize),
    state: {
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="container py-2 w-full">
        <DataTable table={table} isLoading={isLoading} />
        <DataTablePagination table={table} isLoading={isLoading} />
      </div>
    </>
  );
}

import { useSubscriptionsHistories } from '@/__generated__/api/hooks/management-subscription/management-subscription.hooks';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { SubscriptionData } from '@/modules/management-subscription/types/histories';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';

export default function () {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const page = pagination.pageIndex + 1;
  const perPage = pagination.pageSize;

  const { data, isLoading } = useSubscriptionsHistories({
    page,
    per_page: perPage,
  });

  const columnHelper = createColumnHelper<SubscriptionData>();
  const baseColumns = [
    columnHelper.accessor('start_date', {
      header: () => <div className="font-semibold text-black text-left"> Tanggal Langganan </div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('end_date', {
      header: () => <div className="font-semibold text-black text-left"> Deskripsi </div>,
      cell: (info) => {
        const row = info.row.original;

        if (row.type === 'add_on') {
          return (
            <>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">•</span>
                <span>
                  {row.add_on?.quantity} {row.add_on?.name}
                </span>
              </div>
              <div> Berakhir pada {row.end_date} </div>
            </>
          );
        }
        return <div> Berakhir pada {row.end_date} </div>;
      },
    }),
    columnHelper.accessor('type', {
      header: () => <div className="font-semibold text-black text-left"> Paket </div>,
      cell: (info) => {
        const row = info.row.original;
        const type = info.getValue();

        if (type === 'add_on') {
          return <span className="text-sm font-medium text-gray-700"> Add On </span>;
        }
        if (row.badge_link) {
          return (
            <div className="w-auto h-[2rem] flex items-start justify-start">
              <img
                src={row.badge_link}
                alt="Package Badge"
                width={110}
                height={32}
                className="object-contain"
              />
            </div>
          );
        }
        return <span>-</span>;
      },
    }),
    columnHelper.accessor('amount', {
      header: () => <div className="font-semibold text-black text-left"> Nominal </div>,
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: data?.data ?? [],
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
    <div className="w-full px-4 md:px-6">
      <h1 className="text-base font-semibold text-gray-800 mb-6  ml-[23px]">
        Riwayat Langganan Anda
      </h1>

      <div className="p-6 bg-white rounded-lg overflow-hidden">
        <DataTable table={table} isLoading={isLoading} />
        <DataTablePagination table={table} isLoading={isLoading} />

        <div className="py-6 bg-white text-right">
          <p className="text-sm text-gray-600">
            Kami hanya menampilkan riwayat langganan Anda selama 1 tahun kebelakang
          </p>
        </div>
      </div>
    </div>
  );
}

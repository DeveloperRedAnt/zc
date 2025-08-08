import { useGetTagsProductList } from '@/__generated__/api/hooks/master-data/tags-product.hooks';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Tag } from '@/modules/master-data/types/tag';
import { Edit } from '@icon-park/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';

type TableTagListProps = {
  handleEditButton?: (tag: Tag) => void;
};

export default function Index({ handleEditButton }: TableTagListProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const page = pagination.pageIndex + 1;
  const perPage = pagination.pageSize;

  const { data, isLoading } = useGetTagsProductList({
    page,
    per_page: perPage,
  });

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
    <>
      <div className="container py-2 w-[60%]">
        <DataTable table={table} isLoading={isLoading} />
        <DataTablePagination table={table} isLoading={isLoading} />
      </div>
    </>
  );
}

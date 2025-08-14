'use client';

import * as DTO from '@/__generated__/api/dto/reports/sales-variant.dto';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { SortableHeader } from '@/modules/reports/sales-product/components/sortable-header';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { useSalesVariantFilters } from '../hooks/use-sales-variant-filter';

const columnHelper = createColumnHelper<DTO.TableData>();

interface SalesVariantTableProps {
  tableData: DTO.VariantTableResponse | null;
  isLoading?: boolean;
}

export function SalesVariantTable({ tableData, isLoading }: SalesVariantTableProps) {
  const { filters, updatePagination, updateSorting } = useSalesVariantFilters();

  const handleSort = React.useCallback(
    (column: string, direction: 'asc' | 'desc') => {
      updateSorting(column, direction);
    },
    [updateSorting] // kalau updateSorting stabil (misalnya dari hook yang pakai useCallback juga)
  );

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('product_name', {
        header: () => (
          <SortableHeader
            label="Nama Produk Utama"
            sortKey="product_name"
            currentSortColumn={filters.sort_by}
            currentSortDirection={filters.sort_dir as 'asc' | 'desc'}
            onSort={handleSort}
            align="left"
          />
        ),
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
        enableSorting: false,
      }),
      columnHelper.accessor('variant_name', {
        header: () => (
          <SortableHeader
            label="Nama Varian"
            sortKey="variant_name"
            currentSortColumn={filters.sort_by}
            currentSortDirection={filters.sort_dir as 'asc' | 'desc'}
            onSort={handleSort}
            align="left"
          />
        ),
        cell: (info) => <div className="text-left text-sm">{info.getValue()}</div>,
        enableSorting: false,
      }),
      columnHelper.accessor('total_sold', {
        header: () => (
          <SortableHeader
            label="Jumlah Terjual"
            sortKey="total_sold"
            currentSortColumn={filters.sort_by}
            currentSortDirection={filters.sort_dir as 'asc' | 'desc'}
            onSort={handleSort}
            align="center"
          />
        ),
        cell: (info) => <div className="text-center text-sm">{info.getValue()}</div>,
        enableSorting: false,
      }),
      columnHelper.accessor('percentage', {
        header: () => (
          <SortableHeader
            label="Persentase Penjualan"
            sortKey="percentage"
            currentSortColumn={filters.sort_by}
            currentSortDirection={filters.sort_dir as 'asc' | 'desc'}
            onSort={handleSort}
            align="center"
          />
        ),
        cell: (info) => <div className="text-center text-sm">{info.getValue()}</div>,
        enableSorting: false,
      }),
    ],
    [filters.sort_by, filters.sort_dir, handleSort]
  );

  const data = tableData?.data || [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: tableData?.last_page || 0,
    state: {
      pagination: {
        pageIndex: filters.page,
        pageSize: filters.per_page,
      },
      sorting: [],
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: filters.page,
          pageSize: filters.per_page,
        });
        updatePagination(newState.pageIndex, newState.pageSize);
      }
    },
    enableSorting: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
        Tidak ada data untuk ditampilkan
      </div>
    );
  }

  return (
    <div className="py-2">
      <div>
        <DataTable table={table} />
      </div>
      <div className="mt-4">
        <DataTablePagination table={table} isLoading={isLoading || false} />
      </div>
    </div>
  );
}

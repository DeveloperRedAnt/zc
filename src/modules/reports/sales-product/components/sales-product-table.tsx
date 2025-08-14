'use client';

import * as DTO from '@/__generated__/api/dto/reports/sales-product.dto';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { useSalesProductFilters } from '../hooks/use-sales-product-filter';
import { SortableHeader } from './sortable-header';

const columnHelper = createColumnHelper<DTO.TableDataProduct>();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface SalesProductTableProps {
  tableData: DTO.TableResponse | null;
  isLoading?: boolean;
}

export function SalesProductTable({ tableData, isLoading }: SalesProductTableProps) {
  const { filters, updatePagination, updateSorting } = useSalesProductFilters();

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
            label="Nama Produk"
            sortKey="product_name"
            currentSortColumn={filters.sort_column}
            currentSortDirection={filters.sort_direction as 'asc' | 'desc'}
            onSort={handleSort}
            align="left"
          />
        ),
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
        enableSorting: false,
      }),
      columnHelper.accessor('total_sales', {
        header: () => (
          <SortableHeader
            label="Jumlah Terjual"
            sortKey="total_sales"
            currentSortColumn={filters.sort_column}
            currentSortDirection={filters.sort_direction as 'asc' | 'desc'}
            onSort={handleSort}
            align="center"
          />
        ),
        cell: (info) => <div className="text-center text-sm">{info.getValue()}</div>,
        enableSorting: false,
      }),
      columnHelper.accessor('total_transaction', {
        header: () => (
          <SortableHeader
            label="Nominal Penjualan"
            sortKey="total_transaction"
            currentSortColumn={filters.sort_column}
            currentSortDirection={filters.sort_direction as 'asc' | 'desc'}
            onSort={handleSort}
            align="center"
          />
        ),
        cell: (info) => (
          <div className="text-right text-sm font-medium">{formatCurrency(info.getValue())}</div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('hpp', {
        header: () => (
          <SortableHeader
            label="HPP"
            sortKey="hpp"
            currentSortColumn={filters.sort_column}
            currentSortDirection={filters.sort_direction as 'asc' | 'desc'}
            onSort={handleSort}
            align="center"
          />
        ),
        cell: (info) => (
          <div className="text-right text-sm font-medium">{formatCurrency(info.getValue())}</div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('profit', {
        header: () => (
          <SortableHeader
            label="Laba"
            sortKey="profit"
            currentSortColumn={filters.sort_column}
            currentSortDirection={filters.sort_direction as 'asc' | 'desc'}
            onSort={handleSort}
            align="center"
          />
        ),
        cell: (info) => {
          const profit = info.getValue();
          return <div className={'text-right text-sm font-medium'}>{formatCurrency(profit)}</div>;
        },
        enableSorting: false,
      }),
      columnHelper.accessor('sales_transaction', {
        header: () => (
          <SortableHeader
            label="Persentase Penjualan"
            sortKey="sales_transaction"
            currentSortColumn={filters.sort_column}
            currentSortDirection={filters.sort_direction as 'asc' | 'desc'}
            onSort={handleSort}
            align="center"
          />
        ),
        cell: (info) => <div className="text-center text-sm">{info.getValue()}</div>,
        enableSorting: false,
      }),
    ],
    [filters.sort_column, filters.sort_direction, handleSort]
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

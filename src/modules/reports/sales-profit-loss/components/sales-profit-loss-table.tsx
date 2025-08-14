'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/core/table';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { TablePagination } from '../../sales-cashier/components/sales-cashier-table-pagination';
import { ProfitLossTableCell } from './profit-loss-table-cell';
import { ProfitLossTableEmptyRow } from './profit-loss-table-empty-row';
import { ProfitLossTableHeader } from './profit-loss-table-header';

type ProfitLossRow = {
  period: string;
  period_start: string;
  period_end: string;
  hpp: number;
  total_revenue: number;
  gross_profit: number;
  gross_margin_percent: number;
};

const columnHelper = createColumnHelper<ProfitLossRow>();

interface SalesProfitLossTableProps {
  data: ProfitLossRow[];
  isLoading: boolean;
  error: Error | null;
  last_page: number;
  sortBy: keyof ProfitLossRow;
  sortDirection: 'asc' | 'desc';
  onSortChange: (by: keyof ProfitLossRow, dir: 'asc' | 'desc') => void;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: (idx: number, size: number) => void;
}

export function SalesProfitLossTable({
  data,
  isLoading,
  error,
  last_page,
  sortBy,
  sortDirection,
  onSortChange,
  pageIndex,
  pageSize,
  onPaginationChange,
}: SalesProfitLossTableProps) {
  const sortedData = useMemo(() => {
    const key = sortBy;
    const direction = sortDirection;

    return [...data].sort((a, b) => {
      let valueA = a[key] as string | number | Date;
      let valueB = b[key] as string | number | Date;

      if (key === 'period_start' || key === 'period_end') {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      }

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortBy, sortDirection]);

  const columns = [
    columnHelper.accessor('period', {
      header: () => (
        <ProfitLossTableHeader
          columnId="period"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={(col) => onSortChange(col as keyof ProfitLossRow, sortDirection)}
        >
          Periode
        </ProfitLossTableHeader>
      ),
      cell: (info) => <ProfitLossTableCell value={info.getValue()} />,
    }),
    columnHelper.accessor('period_start', {
      header: () => (
        <ProfitLossTableHeader
          columnId="period_start"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={(col) => onSortChange(col as keyof ProfitLossRow, sortDirection)}
        >
          Mulai
        </ProfitLossTableHeader>
      ),
      cell: (info) => <ProfitLossTableCell value={info.getValue()} />,
    }),
    columnHelper.accessor('period_end', {
      header: () => (
        <ProfitLossTableHeader
          columnId="period_end"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={(col) => onSortChange(col as keyof ProfitLossRow, sortDirection)}
        >
          Selesai
        </ProfitLossTableHeader>
      ),
      cell: (info) => <ProfitLossTableCell value={info.getValue()} />,
    }),
    columnHelper.accessor('hpp', {
      header: () => (
        <ProfitLossTableHeader
          columnId="hpp"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={(col) => onSortChange(col as keyof ProfitLossRow, sortDirection)}
        >
          HPP
        </ProfitLossTableHeader>
      ),
      cell: (info) => <ProfitLossTableCell value={info.getValue().toLocaleString()} />,
    }),
    columnHelper.accessor('total_revenue', {
      header: () => (
        <ProfitLossTableHeader
          columnId="total_revenue"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={(col) => onSortChange(col as keyof ProfitLossRow, sortDirection)}
        >
          Total Revenue
        </ProfitLossTableHeader>
      ),
      cell: (info) => <ProfitLossTableCell value={info.getValue().toLocaleString()} />,
    }),
    columnHelper.accessor('gross_profit', {
      header: () => (
        <ProfitLossTableHeader
          columnId="gross_profit"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={(col) => onSortChange(col as keyof ProfitLossRow, sortDirection)}
        >
          Gross Profit
        </ProfitLossTableHeader>
      ),
      cell: (info) => {
        const value = info.getValue();
        const isNegative = value < 0;
        return <ProfitLossTableCell value={value.toLocaleString()} isNegative={isNegative} />;
      },
    }),
    columnHelper.accessor('gross_margin_percent', {
      header: () => (
        <ProfitLossTableHeader
          columnId="gross_margin_percent"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={(col) => onSortChange(col as keyof ProfitLossRow, sortDirection)}
        >
          Gross Margin (%)
        </ProfitLossTableHeader>
      ),
      cell: (info) => {
        const value = info.getValue();
        const isNegative = value < 0;
        return <ProfitLossTableCell value={`${value}%`} isNegative={isNegative} />;
      },
    }),
  ];

  const table = useReactTable({
    data: sortedData,
    columns,
    pageCount: last_page ?? 1,
    state: {
      sorting: [{ id: sortBy, desc: sortDirection === 'desc' }],
      pagination: { pageIndex, pageSize },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: true,
    manualPagination: true,
    onSortingChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater([{ id: sortBy, desc: sortDirection === 'desc' }])
          : updater;
      if (next[0]) {
        onSortChange(next[0].id as keyof ProfitLossRow, next[0].desc ? 'desc' : 'asc');
      }
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
      onPaginationChange(next.pageIndex, next.pageSize);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="min-w-[120px]">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <ProfitLossTableEmptyRow colSpan={columns.length} />
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} totalPages={last_page ?? 1} />
    </div>
  );
}

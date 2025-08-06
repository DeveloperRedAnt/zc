'use client';

import { ProfitLossReportItem } from '@/__generated__/api/dto/reports.dto';
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
import React, { useState, useMemo } from 'react';
import { profitLossMockData } from '../contants/profit-loss-mock-data';
import { SortableHeader } from './sortable-header';
import { TablePagination } from './table-pagination';

const columnHelper = createColumnHelper<ProfitLossReportItem>();

interface SalesProfitLossTableProps {
  deviceId?: string;
  storeId?: string;
}

// Helper functions outside component
const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
};

const parsePercentage = (value: string): number => {
  return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
};

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/');
  return new Date(parseInt(year || '2025'), parseInt(month || '1') - 1, parseInt(day || '1'));
};

export function SalesProfitLossTable(_props: SalesProfitLossTableProps) {
  const [sortBy, setSortBy] = useState('tanggal');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Simple sorting logic
  const sortedData = useMemo(() => {
    const data = [...profitLossMockData];

    return data.sort((a, b) => {
      let valueA: number | Date;
      let valueB: number | Date;

      switch (sortBy) {
        case 'tanggal':
          valueA = parseDate(a.tanggal);
          valueB = parseDate(b.tanggal);
          break;
        case 'hpp':
          valueA = parseCurrency(a.hpp);
          valueB = parseCurrency(b.hpp);
          break;
        case 'pendapatanPenjualan':
          valueA = parseCurrency(a.pendapatanPenjualan);
          valueB = parseCurrency(b.pendapatanPenjualan);
          break;
        case 'labaRugiKotor':
          valueA = parseCurrency(a.labaRugiKotor);
          valueB = parseCurrency(b.labaRugiKotor);
          break;
        case 'persentaseMarginLabaKotor':
          valueA = parsePercentage(a.persentaseMarginLabaKotor);
          valueB = parsePercentage(b.persentaseMarginLabaKotor);
          break;
        default:
          return 0;
      }

      // Handle Date comparison
      if (valueA instanceof Date && valueB instanceof Date) {
        return sortDirection === 'asc'
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }

      // Handle number comparison
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });
  }, [sortBy, sortDirection]);

  const handleSort = (columnId: string) => {
    if (sortBy === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnId);
      setSortDirection('asc');
    }
  };

  const columns = [
    columnHelper.accessor('tanggal', {
      header: () => (
        <SortableHeader
          columnId="tanggal"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Tanggal
        </SortableHeader>
      ),
      cell: (info) => <span className="text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor('hpp', {
      header: () => (
        <SortableHeader
          columnId="hpp"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          HPP
        </SortableHeader>
      ),
      cell: (info) => <span className="text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor('pendapatanPenjualan', {
      header: () => (
        <SortableHeader
          columnId="pendapatanPenjualan"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Pendapatan Penjualan
        </SortableHeader>
      ),
      cell: (info) => <span className="text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor('labaRugiKotor', {
      header: () => (
        <SortableHeader
          columnId="labaRugiKotor"
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        >
          Laba/Rugi Kotor
        </SortableHeader>
      ),
      cell: (info) => {
        const value = info.getValue();
        const isNegative = value.includes('-') || value.includes('Rp -');
        return (
          <span className={`text-sm ${isNegative ? 'text-red-500' : 'text-gray-900'}`}>
            {value}
          </span>
        );
      },
    }),
    columnHelper.accessor('persentaseMarginLabaKotor', {
      header: () => (
        <div className="flex items-center gap-2">
          <SortableHeader
            columnId="persentaseMarginLabaKotor"
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          >
            Persentase Margin Laba Kotor
          </SortableHeader>
        </div>
      ),
      cell: (info) => {
        const value = info.getValue();
        const isNegative = value.includes('-');
        return (
          <span className={`text-sm ${isNegative ? 'text-red-500' : 'text-gray-900'}`}>
            {value}
          </span>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: true,
  });

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="min-w-[120px]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
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
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TablePagination table={table} />
    </>
  );
}

'use client';

import { useSalesCashier } from '@/__generated__/api/hooks/sales-daily-days.hooks';
import { getMonthRange } from '@/utils/dateRange';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Cookies from 'js-cookie';
import React from 'react';
import { useVoidReportFilters } from '../hooks/use-chasier-report-filters';
import { VoidReportFilters } from './sales-cashier-filters';
import { VoidReportTableCore, createVoidReportColumns } from './sales-cashier-table-core';
import { TablePagination } from './sales-cashier-table-pagination';

const { start, end } = getMonthRange();

export default function VoidReportTable() {
  const { filters, updateSorting } = useVoidReportFilters();
  const organization_id = Cookies.get('x-device-id') || '1';

  const salesCashierFilters = {
    start_date: filters.start_date || start,
    end_date: filters.end_date || end,
    cashier_id: filters.cashier_id ? Number(filters.cashier_id) : null,
    store_id: filters.store_id ? Number(filters.store_id) : null,
    page: filters.page === 0 ? 1 : filters.page + 1,
    per_page: filters.pageSize ?? 2,
    sort_by: filters.sortBy || '',
    sort_dir:
      filters.sortDirection === 'asc' || filters.sortDirection === 'desc'
        ? filters.sortDirection
        : 'asc',
  };

  const { data: queryData, isLoading } = useSalesCashier(salesCashierFilters, organization_id);

  const tableData = Array.isArray(queryData?.data?.data)
    ? queryData.data.data.map((item) => ({
        ...item,
        omzet: String(item.omzet),
      }))
    : [];

  const columns = React.useMemo(
    () =>
      createVoidReportColumns(
        filters.sortBy,
        (filters.sortDirection === 'asc' || filters.sortDirection === 'desc'
          ? filters.sortDirection
          : 'asc') as 'asc' | 'desc',
        updateSorting
      ),
    [filters.sortBy, filters.sortDirection, updateSorting]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: queryData?.data?.last_page ?? 1,
    state: {
      sorting:
        filters.sortBy && filters.sortDirection
          ? [{ id: filters.sortBy, desc: filters.sortDirection === 'desc' }]
          : [],
      pagination: {
        pageIndex: (queryData?.data?.current_page ?? 1) - 1,
        pageSize: queryData?.data?.per_page ?? filters.pageSize,
      },
    },
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <VoidReportFilters />
      <VoidReportTableCore
        table={table}
        columns={columns}
        isLoading={isLoading}
        pageSize={filters.pageSize}
      />
      <TablePagination table={table} totalPages={queryData?.data?.last_page ?? 1} />
    </>
  );
}

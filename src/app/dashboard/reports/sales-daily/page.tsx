'use client';

import { useSalesDailyDaysChartAndTable } from '@/__generated__/api/hooks/sales-daily-days.hooks';
import { PageSection } from '@/components/page-section/page-section';
import { TablePagination } from '@/modules/reports/sales-cashier/components/sales-cashier-table-pagination';
import { FilterSalesDailyTable } from '@/modules/reports/sales-daily/components/filter-sales-daily';
import {
  SalesDailyChart,
  SalesDailyChartData,
} from '@/modules/reports/sales-daily/components/sales-daily-chart';
import {
  SalesDailyTableCore,
  createDailyReportColumns,
} from '@/modules/reports/sales-daily/components/sales-daily-table';
import { useSalesDailyDays } from '@/modules/reports/sales-daily/hooks/use-sales-daily-days';
import { CardComponentFilter } from '@/modules/reports/sales-variant/components/card-component-filter';
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

const { start, end } = getMonthRange();

export default function page() {
  const { filters, updateSorting } = useSalesDailyDays();
  const organization_id = Cookies.get('x-device-id') || '1';

  const SalesDaily = {
    start_date: filters.start_date || start,
    end_date: filters.end_date || end,
    grouping: filters.grouping || 'daily',
    store_id: filters.store_id ? String(filters.store_id) : null,
    page: filters.page === 0 ? 1 : filters.page + 1,
    per_page: filters.pageSize ?? 2,
    sort_by: filters.sortBy || 'transaction_date',
    sort_dir:
      filters.sortDirection === 'asc' || filters.sortDirection === 'desc'
        ? filters.sortDirection
        : 'asc',
  };

  const { data: queryData, isLoading } = useSalesDailyDaysChartAndTable(
    SalesDaily,
    organization_id
  );

  const tableData = Array.isArray(queryData?.data?.table?.data) ? queryData?.data?.table?.data : [];
  const salesDailyGraphItems = Array.isArray(queryData?.data?.graph) ? queryData?.data?.graph : [];
  const columns = React.useMemo(
    () =>
      createDailyReportColumns(
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
    pageCount: queryData?.data?.table?.last_page ?? 1,
    state: {
      sorting:
        filters.sortBy && filters.sortDirection
          ? [{ id: filters.sortBy, desc: filters.sortDirection === 'desc' }]
          : [],
      pagination: {
        pageIndex: (queryData?.data?.table?.current_page ?? 1) - 1,
        pageSize: queryData?.data?.table?.per_page ?? filters.pageSize,
      },
    },
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const chartData: SalesDailyChartData[] = salesDailyGraphItems.map((item) => {
    return {
      date: item.date,
      pertumbuhanTransaksi: item.transaction_growth ?? 0,
      pertumbuhanPendapatan: item.revenue_growth ?? 0,
    };
  });
  return (
    <>
      <CardComponentFilter title={'Line Chart Penjualan Harian'} subtitle={undefined}>
        <FilterSalesDailyTable />
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
          <SalesDailyChart data={chartData} height={100} width={220} />
        </div>
      </CardComponentFilter>

      <PageSection title="Ringkasan Penjualan">
        <SalesDailyTableCore
          table={table}
          columns={columns}
          isLoading={isLoading}
          pageSize={filters.pageSize}
        />
        <TablePagination table={table} totalPages={queryData?.data?.table?.last_page ?? 1} />
      </PageSection>
    </>
  );
}

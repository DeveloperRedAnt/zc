import { useVoidReportQuery } from '@/__generated__/api/hooks/reports.hooks';
import { TablePagination } from '@/modules/reports/sales-cashier/components/sales-cashier-table-pagination';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Cookies from 'js-cookie';
import { useVoidReportFilters } from '../hooks/use-void-report-filters';
import { VoidReportFilters } from './void-report-filters';
import { VoidReportTableCore, createVoidReportColumns } from './void-report-table-core';

export default function VoidReportTable() {
  const { filters } = useVoidReportFilters();
  const deviceId = Cookies.get('x-device-id') || '0';
  const storeId = Cookies.get('x-store-id') || '0';

  const voidSales = {
    start_date: filters.start_date,
    end_date: filters.end_date,
    nota_number: filters.nota_number,
    cashier_name: filters.cashier_name,
    void_by: filters.void_by,
    sort_dir: filters.sort_dir as 'asc' | 'desc',
    page: filters.page,
    per_page: filters.per_page,
    sort_by: filters.sort_by,
  };
  const { data: queryData, isLoading } = useVoidReportQuery(deviceId, storeId, voidSales);
  const tableData = Array.isArray(queryData?.data?.data) ? queryData?.data?.data : [];
  const columns = createVoidReportColumns();

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting:
        filters.sort_by && filters.sort_dir
          ? [{ id: filters.sort_by, desc: filters.sort_dir === 'desc' }]
          : [],
      pagination: {
        pageIndex: (queryData?.data?.current_page ?? 1) - 1,
        pageSize: queryData?.data?.per_page ?? filters.per_page,
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
        per_page={filters.per_page}
      />
      <TablePagination table={table} totalPages={queryData?.data?.last_page ?? 1} />
    </>
  );
}

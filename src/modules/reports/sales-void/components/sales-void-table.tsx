import { useVoidReportQuery } from '@/__generated__/api/hooks/reports.hooks';
import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { cashierOptions, responsiblePersonOptions } from '../constants/mock-data';
import { mockVoidReportData } from '../constants/mock-data';
import { useVoidReportFilters } from '../hooks/use-void-report-filters';
import { VoidReport } from '../types/void-report.types';
import { TablePagination } from './table-pagination';
import { VoidReportFilters } from './void-report-filters';
import { VoidReportTableCore, createVoidReportColumns } from './void-report-table-core';

interface VoidReportTableProps {
  data?: VoidReport[];
}

export default function VoidReportTable({ data: customData }: VoidReportTableProps) {
  const { filters } = useVoidReportFilters();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Get deviceId and storeId from cookies or use defaults
  const deviceId = Cookies.get('x-device-id') || '1';
  const storeId = Cookies.get('x-store-id') || '1';

  // Use TanStack Query to fetch data
  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useVoidReportQuery(deviceId, storeId, filters);

  // Use custom data if provided, otherwise use query data, fallback to mock data
  const tableData = customData || queryData?.data || mockVoidReportData;

  // Sync URL sorting state with table sorting state
  useEffect(() => {
    if (filters.sortBy && filters.sortDirection) {
      setSorting([
        {
          id: filters.sortBy,
          desc: filters.sortDirection === 'desc',
        },
      ]);
    } else {
      setSorting([]);
    }
  }, [filters.sortBy, filters.sortDirection]);

  const columns = createVoidReportColumns();

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  // Handle loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center py-8">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
  //         <p className="text-gray-600">Loading void reports...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // Handle error state
  // if (isError) {
  //   return (
  //     <div className="flex items-center justify-center py-8">
  //       <div className="text-center">
  //         <div className="text-red-600 mb-2">
  //           <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  //           </svg>
  //         </div>
  //         <p className="text-red-600 font-medium">Error loading void reports</p>
  //         <p className="text-gray-600 text-sm mt-1">
  //           {error?.message || 'An unexpected error occurred'}
  //         </p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <>
      {/* Show loading indicator if data is being fetched */}
      {isLoading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
            <p className="text-blue-700 text-sm">Loading latest data...</p>
          </div>
        </div>
      )}

      {/* Show error message if API failed but still show table with mock data */}
      {isError && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-yellow-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-yellow-700 text-sm">
              Unable to load latest data. Showing sample data.{' '}
              {error?.message && `(${error.message})`}
            </p>
          </div>
        </div>
      )}
      <VoidReportFilters
        table={table}
        responsiblePersonOptions={responsiblePersonOptions}
        cashierOptions={cashierOptions}
      />

      <VoidReportTableCore
        table={table}
        columns={columns}
        isLoading={isLoading}
        pageSize={filters.pageSize}
      />

      <TablePagination table={table} />

      {/* Show API pagination info if available, otherwise show mock data info */}
      {queryData?.pagination ? (
        <div className="mt-2 text-sm text-gray-600 text-center">
          Showing {queryData.pagination.page * queryData.pagination.pageSize + 1} to{' '}
          {Math.min(
            (queryData.pagination.page + 1) * queryData.pagination.pageSize,
            queryData.pagination.total
          )}{' '}
          of {queryData.pagination.total} results
        </div>
      ) : (
        <>
          {/* <div className="mt-2 text-sm text-gray-600 text-center">
          Showing sample data ({tableData.length} records)
        </div> */}
        </>
      )}
    </>
  );
}

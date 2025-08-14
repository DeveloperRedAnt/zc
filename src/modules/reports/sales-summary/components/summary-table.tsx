// summary-table.tsx
'use client';

import { ApiSalesSummaryData } from '@/__generated__/api/dto/reports/sales-summary.dto';
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React from 'react';

type SalesSummary = {
  periode: string;
  netto: string;
  bruto: string;
  diskon: string;
  pajak: string;
  transaksi_jumlah: string;
  transaksi_nominal: string;
  hpp: string;
  service_charge: string;
  profit: string;
  loss: string;
};

type SummaryTableProps = {
  data?: ApiSalesSummaryData[];
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  isLoading?: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

const columnHelper = createColumnHelper<SalesSummary>();

// Transform API data to table format
// const transformApiDataToTableFormat = (apiData: ApiSalesSummaryData[]): SalesSummary[] => {
//   return apiData.map((item) => ({
//     periode: item.period,
//     netto: item.netto,
//     bruto: item.bruto,
//     diskon: item.discount,
//     pajak: item.tax,
//     transaksi_jumlah: `${item.transaction_count} Transaksi`,
//     transaksi_nominal: item.netto, // You might want to calculate average here
//     hpp: item.cogs,
//     service_charge: item.service_charge,
//     profit: item.profit,
//     loss: item.loss,
//   }));
// };
const transformApiDataToTableFormat = (apiData: ApiSalesSummaryData[]): SalesSummary[] => {
  return apiData.map((item) => ({
    periode: item.period,
    netto: item.netto,
    bruto: item.bruto,
    diskon: item.discount,
    pajak: item.tax,
    transaksi_jumlah: `${item.transaction_count} Transaksi`,
    transaksi_nominal: item.netto,
    hpp: item.cogs,
    service_charge: item.service_charge,
    profit: item.profit,
    loss: item.loss,
  }));
};

export function SummaryTable({
  data = [],
  pagination,
  isLoading = false,
  currentPage = 1,
  onPageChange,
}: SummaryTableProps) {
  // Transform API data
  const tableData = React.useMemo(() => {
    return transformApiDataToTableFormat(data);
  }, [data]);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('periode', {
        header: () => <div className="font-bold text-black">Periode</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('netto', {
        header: () => <div className="font-bold text-black">Netto</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('bruto', {
        header: () => <div className="font-bold text-black">Bruto</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('diskon', {
        header: () => <div className="font-bold text-black">Diskon</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('pajak', {
        header: () => <div className="font-bold text-black">Pajak</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('service_charge', {
        header: () => <div className="font-bold text-black">Service Charge</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: 'transaksi',
        header: () => (
          <div className="font-bold text-black text-center">
            Transaksi
            <div className="flex justify-center gap-2 text-xs mt-1">
              <span>Jumlah</span>
            </div>
          </div>
        ),
        cell: (info) => (
          <div className="flex flex-col items-center">
            <div>{info.row.original.transaksi_jumlah}</div>
          </div>
        ),
      }),
      columnHelper.accessor('hpp', {
        header: () => <div className="font-bold text-black">HPP</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('profit', {
        header: () => <div className="font-bold text-black">Profit</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('loss', {
        header: () => <div className="font-bold text-black">Loss</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    ],
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: pagination?.per_page || 10,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: pagination?.last_page || 1,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-2">
        <div className="flex justify-center items-center h-32">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <div className="text-gray-500">Loading table...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!tableData.length) {
    return (
      <div className="container mx-auto py-2">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-2">
      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {typeof header.column.columnDef.header === 'function'
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}

                      {header.column.getCanSort() && (
                        <span className="inline-block w-4">
                          {header.column.getIsSorted() === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : (
                            <ArrowUpDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {typeof cell.column.columnDef.cell === 'function'
                    ? cell.column.columnDef.cell(cell.getContext())
                    : cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {(currentPage - 1) * pagination.per_page + 1} to{' '}
              {Math.min(currentPage * pagination.per_page, pagination.total)} of {pagination.total}{' '}
              results
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
              className="text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="min-w-[2rem] text-center">
              <span className="text-sm">
                {currentPage} of {pagination.last_page}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= pagination.last_page}
              className="text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

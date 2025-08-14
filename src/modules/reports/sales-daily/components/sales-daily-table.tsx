import { SalesDailyTableItem } from '@/__generated__/api/dto/sales-daily-days.dto';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/core/table';
import { ColumnDef, Table as ReactTable, flexRender } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TableSkeleton } from '../../sales-cashier/components/table-skeleton';
import { SortableHeader } from './sales-daily-sortable-header';

interface SalesDailyTableCoreProps {
  table: ReactTable<SalesDailyTableItem>;
  columns: ColumnDef<SalesDailyTableItem>[];
  isLoading?: boolean;
  pageSize?: number;
}

export function SalesDailyTableCore({
  table,
  columns,
  isLoading = false,
  pageSize = 10,
}: SalesDailyTableCoreProps) {
  return (
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
          {isLoading ? (
            <TableSkeleton rows={pageSize} columns={columns.length} />
          ) : table.getRowModel().rows?.length ? (
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
  );
}

export function createDailyReportColumns(
  sortBy,
  sortDirection,
  updateSorting
): ColumnDef<SalesDailyTableItem>[] {
  return [
    {
      accessorKey: 'transaction_date',
      header: () => (
        <SortableHeader
          columnId="transaction_date"
          isSorted={sortBy === 'transaction_date'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'transaction_date',
              sortBy === 'transaction_date' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Tgl Transaksi
        </SortableHeader>
      ),
      cell: ({ row }) => {
        const value = row.getValue('transaction_date');
        if (!value) {
          return <span className="whitespace-nowrap font-medium text-gray-400">-</span>;
        }
        return (
          <span className="whitespace-nowrap font-medium text-gray-900">
            {typeof value === 'string' || value instanceof Date
              ? format(new Date(value), 'dd MMM yyyy')
              : '-'}
          </span>
        );
      },
    },
    {
      accessorKey: 'total_transactions',
      header: () => (
        <SortableHeader
          columnId="total_transactions"
          isSorted={sortBy === 'total_transactions'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'total_transactions',
              sortBy === 'total_transactions' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Jumlah Transaksi
        </SortableHeader>
      ),
      cell: ({ row }) => {
        const rawValue = row.getValue('total_transactions');
        const value = typeof rawValue === 'number' ? rawValue : Number(rawValue) || 0;
        return <span className="whitespace-nowrap text-gray-900">{value} Transaksi</span>;
      },
    },
    {
      accessorKey: 'trans_growth',
      header: () => (
        <SortableHeader
          columnId="trans_growth"
          isSorted={sortBy === 'trans_growth'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'trans_growth',
              sortBy === 'trans_growth' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Pertumbuhan Transaksi
        </SortableHeader>
      ),
      cell: ({ row }) => {
        const rawValue = row.getValue('trans_growth');
        const value = typeof rawValue === 'number' ? rawValue : Number(rawValue) || 0;
        const sign = value > 0 ? '' : value < 0 ? '-' : '';
        const color = value > 0 ? 'text-green-600' : value < 0 ? 'text-red-500' : 'text-gray-500';
        return (
          <span className={`whitespace-nowrap font-medium ${color}`}>
            {sign}
            {Math.abs(value)} Transaksi
          </span>
        );
      },
    },
    {
      accessorKey: 'total_revenue',
      header: () => (
        <SortableHeader
          columnId="total_revenue"
          isSorted={sortBy === 'total_revenue'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'total_revenue',
              sortBy === 'total_revenue' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Jumlah Pendapatan
        </SortableHeader>
      ),
      cell: ({ row }) => {
        const value = row.getValue('total_revenue') || 0;
        return (
          <span className="whitespace-nowrap text-gray-900">
            Rp{' '}
            {typeof value === 'number'
              ? value.toLocaleString('id-ID')
              : Number(value).toLocaleString('id-ID')}
          </span>
        );
      },
    },
    {
      accessorKey: 'rev_growth',
      header: () => (
        <SortableHeader
          columnId="rev_growth"
          isSorted={sortBy === 'rev_growth'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'rev_growth',
              sortBy === 'rev_growth' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Pertumbuhan Pendapatan
        </SortableHeader>
      ),
      cell: ({ row }) => {
        const rawValue = row.getValue('rev_growth');
        const value = typeof rawValue === 'number' ? rawValue : Number(rawValue) || 0;
        const sign = value > 0 ? '' : value < 0 ? '-' : '';
        const color = value > 0 ? '#060807' : value < 0 ? '#ef4444' : '#888';
        return (
          <span style={{ fontWeight: 500, whiteSpace: 'nowrap', color }}>
            {sign}Rp {Math.abs(value).toLocaleString('id-ID')}
          </span>
        );
      },
    },
  ];
}

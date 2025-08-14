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
import { VoidReport } from '../types/sales-cashier-report.types';
import { SortableHeader } from './sales-cashier-sortable-header';
import { TableSkeleton } from './table-skeleton';

interface VoidReportTableCoreProps {
  table: ReactTable<VoidReport>;
  columns: ColumnDef<VoidReport>[];
  isLoading?: boolean;
  pageSize?: number;
}

export function VoidReportTableCore({
  table,
  columns,
  isLoading = false,
  pageSize = 10,
}: VoidReportTableCoreProps) {
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

// Helper function to create column definitions
export function createVoidReportColumns(
  sortBy: string,
  sortDirection: 'asc' | 'desc',
  updateSorting: (id: string, direction: 'asc' | 'desc') => void
): ColumnDef<VoidReport>[] {
  return [
    {
      accessorKey: 'period',
      header: () => (
        <SortableHeader
          columnId="period"
          isSorted={sortBy === 'period'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting('period', sortBy === 'period' && sortDirection === 'asc' ? 'desc' : 'asc')
          }
        >
          Tgl Transaksi
        </SortableHeader>
      ),
      cell: ({ row }) => {
        const value = row.getValue<string>('period');
        const date = value ? new Date(value) : null;
        const formatted = date && !Number.isNaN(date.getTime()) ? format(date, 'dd/MM/yyyy') : '';
        return <span>{formatted}</span>;
      },
    },
    {
      accessorKey: 'cashier_name',
      header: () => (
        <SortableHeader
          columnId="cashier_name"
          isSorted={sortBy === 'cashier_name'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'cashier_name',
              sortBy === 'cashier_name' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Nama Kasir
        </SortableHeader>
      ),
      cell: ({ row }) => <span>{row.getValue('cashier_name')}</span>,
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
          Transaksi
        </SortableHeader>
      ),
      cell: ({ row }) => <span>{row.getValue('total_transactions')} Transaksi</span>,
    },
    {
      accessorKey: 'omzet',
      header: () => (
        <div className="text-right">
          <SortableHeader
            columnId="omzet"
            isSorted={sortBy === 'omzet'}
            isDesc={sortDirection === 'desc'}
            onClick={() =>
              updateSorting('omzet', sortBy === 'omzet' && sortDirection === 'asc' ? 'desc' : 'asc')
            }
          >
            Omzet
          </SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        const value = row.getValue<number>('omzet');
        return <span>Rp {value.toLocaleString('id-ID')}</span>;
      },
    },
    {
      accessorKey: 'total_shift',
      header: () => (
        <SortableHeader
          columnId="total_shift"
          isSorted={sortBy === 'total_shift'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'total_shift',
              sortBy === 'total_shift' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Shift
        </SortableHeader>
      ),
      cell: ({ row }) => <span>{row.getValue('total_shift')} Shift</span>,
    },
    {
      accessorKey: 'avg_transactions_per_shift',
      cell: ({ row }) => <span>{row.getValue('avg_transactions_per_shift')} Transaksi</span>,
      header: () => (
        <SortableHeader
          columnId="avg_transactions_per_shift"
          isSorted={sortBy === 'avg_transactions_per_shift'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'avg_transactions_per_shift',
              sortBy === 'avg_transactions_per_shift' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Rata-rata Transaksi per Shift
        </SortableHeader>
      ),
    },
    {
      accessorKey: 'canceled_transactions',
      cell: ({ row }) => <span>{row.getValue('canceled_transactions')} Transaksi</span>,
      header: () => (
        <SortableHeader
          columnId="canceled_transactions"
          isSorted={sortBy === 'canceled_transactions'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'canceled_transactions',
              sortBy === 'canceled_transactions' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Transaksi Dibatalkan
        </SortableHeader>
      ),
    },
    {
      accessorKey: 'return_transactions',
      cell: ({ row }) => <span>{row.getValue('return_transactions')} Transaksi</span>,
      header: () => (
        <SortableHeader
          columnId="return_transactions"
          isSorted={sortBy === 'return_transactions'}
          isDesc={sortDirection === 'desc'}
          onClick={() =>
            updateSorting(
              'return_transactions',
              sortBy === 'return_transactions' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Transaksi Retur
        </SortableHeader>
      ),
    },
  ];
}

import { Button } from '@/components/button/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/core/table';
import { ColumnDef, Table as ReactTable, flexRender } from '@tanstack/react-table';
import { FileText } from 'lucide-react';
import { VoidReport } from '../types/void-report.types';
import { SortableHeader } from './sortable-header';
import { TableSkeleton } from './table-skeleton';

interface VoidReportTableCoreProps {
  table: ReactTable<VoidReport>;
  columns: ColumnDef<VoidReport>[];
  isLoading?: boolean;
  per_page?: number;
}

export function VoidReportTableCore({
  table,
  columns,
  isLoading = false,
  per_page = 10,
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
            <TableSkeleton rows={per_page} columns={columns.length} />
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
export function createVoidReportColumns(): ColumnDef<VoidReport>[] {
  return [
    {
      accessorKey: 'transaction_date',
      header: () => <SortableHeader columnId="transaction_date">Tgl Transaksi</SortableHeader>,
    },
    {
      accessorKey: 'nota_number',
      header: () => <SortableHeader columnId="nota_number">No. Nota</SortableHeader>,
    },
    {
      accessorKey: 'cashier',
      header: () => <SortableHeader columnId="cashier">Kasir</SortableHeader>,
    },
    {
      accessorKey: 'total_transaction',
      header: () => (
        <div className="text-right">
          <SortableHeader columnId="total_transaction">Nominal Penjualan</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        return <div className="text-right">{row.getValue('total_transaction')}</div>;
      },
    },
    {
      accessorKey: 'void_date',
      header: () => <SortableHeader columnId="void_date">Tgl Void</SortableHeader>,
    },
    {
      accessorKey: 'void_by',
      header: () => <SortableHeader columnId="void_by">Penanggungjawab</SortableHeader>,
    },
    {
      id: 'actions',
      cell: () => {
        return (
          <div className="text-center">
            <Button variant="ghost" size="icon">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        );
      },
    },
  ];
}

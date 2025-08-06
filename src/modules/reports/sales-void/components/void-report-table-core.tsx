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
export function createVoidReportColumns(): ColumnDef<VoidReport>[] {
  return [
    {
      accessorKey: 'tglTransaksi',
      header: () => <SortableHeader columnId="tglTransaksi">Tgl Transaksi</SortableHeader>,
    },
    {
      accessorKey: 'noNota',
      header: () => <SortableHeader columnId="noNota">No. Nota</SortableHeader>,
    },
    {
      accessorKey: 'kasir',
      header: () => <SortableHeader columnId="kasir">Kasir</SortableHeader>,
    },
    {
      accessorKey: 'nominalPenjualan',
      header: () => (
        <div className="text-right">
          <SortableHeader columnId="nominalPenjualan">Nominal Penjualan</SortableHeader>
        </div>
      ),
      cell: ({ row }) => {
        return <div className="text-right">{row.getValue('nominalPenjualan')}</div>;
      },
    },
    {
      accessorKey: 'tglVoid',
      header: () => <SortableHeader columnId="tglVoid">Tgl Void</SortableHeader>,
    },
    {
      accessorKey: 'penanggungjawab',
      header: () => <SortableHeader columnId="penanggungjawab">Penanggungjawab</SortableHeader>,
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

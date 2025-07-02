import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './core/table';

import type { DataTableFilterActions } from './core/types';

import type { Row } from '@tanstack/react-table';
import { type Table as TanStackTable, flexRender } from '@tanstack/react-table';

import React from 'react';
import { Skeleton } from '../skeleton/skeleton';

interface DataTableProps<T> {
  table: TanStackTable<T>;
  actions?: DataTableFilterActions;
  width?: string | number;
  isLoading?: boolean;
  renderDetailRow?: (row: Row<T>) => React.ReactNode;
}

export function DataTable<T>({
  table,
  actions,
  width,
  isLoading,
  renderDetailRow,
}: DataTableProps<T>) {
  const skeletonRowIds = React.useMemo(() => {
    return Array.from({ length: 5 }).map(() => crypto.randomUUID());
  }, []);

  const skeletonCellIds = React.useMemo(() => {
    return Array.from({ length: table.getAllColumns().length }).map(() => crypto.randomUUID());
  }, [table]);

  return (
    <div className="rounded-md bg-white dark:bg-inherit" style={width ? { width } : undefined}>
      <Table>
        <TableHeader>
          {isLoading ? (
            <TableRow>
              {skeletonCellIds.map((cellId) => (
                <TableHead key={cellId}>
                  <Skeleton className="h-4 w-20 rounded" />
                </TableHead>
              ))}
            </TableRow>
          ) : (
            table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))
          )}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            skeletonRowIds.map((rowId) => (
              <TableRow key={rowId}>
                {skeletonCellIds.map((cellId) => (
                  <TableCell key={cellId} className="h-12">
                    <Skeleton className="h-[20px] w-[75px] rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && 'selected'} className="h-12">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="h-12" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && renderDetailRow && (
                  <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length}>
                      {renderDetailRow(row)}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-center text-muted-foreground py-6"
              >
                Tidak ada data.
                {actions && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={actions.removeAllFilters}
                      className="text-blue-500 underline"
                    >
                      Hapus semua filter
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

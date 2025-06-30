import { FileX2, XIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './core/table';

import { cn } from '@/libs/utils';
import { Button } from '../button/button';
import type { DataTableFilterActions } from './core/types';

import { type Table as TanStackTable, flexRender } from '@tanstack/react-table';
import React from 'react';

function TableEmptyState({
  colSpan,
  onClearFilters,
  showClearButton,
}: {
  colSpan: number;
  onClearFilters?: () => void;
  showClearButton?: boolean;
}) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="h-[calc(var(--spacing)*12*10)]">
        <div className="flex flex-col items-center justify-center gap-8">
          <FileX2 className="size-24 stroke-muted-foreground" />
          <div className="flex flex-col gap-4 text-center font-[450]">
            <span>No issues matching your filters.</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                Adjust or clear filters to reveal issues.
              </span>
              <Button
                variant="ghost"
                size="sm"
                className={cn('gap-1', !showClearButton && 'hidden')}
                onClick={onClearFilters}
              >
                <XIcon className="text-muted-foreground" />
                Clear filters
              </Button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

function TablePaginationInfo<T>({ table }: { table: TanStackTable<T> }) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground tabular-nums">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.{' '}
        <span className="text-primary font-medium">
          Total row count: {table.getCoreRowModel().rows.length}
        </span>
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function DataTable<T>({
  table,
  actions,
}: {
  table: TanStackTable<T>;
  actions?: DataTableFilterActions;
}) {
  return (
    <>
      <div className="rounded-md bg-white dark:bg-inherit">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && 'selected'} className="h-12">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="h-12" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        {/* Konten detail accordion */}
                        <div className="p-4 bg-gray-50 rounded">
                          <strong>Detail:</strong> {JSON.stringify(row.original, null, 2)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableEmptyState
                colSpan={table.getAllColumns().length}
                onClearFilters={actions?.removeAllFilters}
                showClearButton={!!actions}
              />
            )}
          </TableBody>
        </Table>
      </div>
      <TablePaginationInfo table={table} />
    </>
  );
}

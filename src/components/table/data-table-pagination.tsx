import type { Table as TanStackTable } from '@tanstack/react-table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../pagination/pagination';
import RowsPerPage from '../rows-per-page/rows-per-page';

interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>;
  isLoading: boolean;
}

export function DataTablePagination<TData>({
  table,
  isLoading = false,
}: DataTablePaginationProps<TData>) {
  if (isLoading) return null;

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;

  const handlePageSizeChange = (value: number) => {
    table.setPageSize(value);
  };

  return (
    <div className="flex items-center justify-between py-4 gap-4 flex-wrap">
      <div className="flex items-center space-x-2 text-sm whitespace-nowrap">
        <span>Rows per page:</span>
        <RowsPerPage value={pageSize} onChange={handlePageSizeChange} />
      </div>
      <div className="flex items-center space-x-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                aria-disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }).map((_, i) => (
              <PaginationItem key={`page-${i + 1}`}>
                <PaginationLink isActive={i === pageIndex} onClick={() => table.setPageIndex(i)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                aria-disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

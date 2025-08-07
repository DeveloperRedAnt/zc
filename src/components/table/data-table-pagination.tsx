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
import { Skeleton } from '../skeleton/skeleton';

interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>;
  isLoading: boolean;
  onPage?: (pageIndex: number) => void;
  onPageSize?: (pageSize: number) => void;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  hidePageSize?: boolean;
}

export function DataTablePagination<TData>({
  table,
  isLoading,
  onPage,
  onPageSize,
  page,
  pageSize,
  totalPages,
  hidePageSize,
}: DataTablePaginationProps<TData>) {
  const pageIndex = page ?? table.getState().pagination.pageIndex;
  const pageCount = totalPages ?? table.getPageCount();

  const pageSizeValue = pageSize ?? table.getState().pagination.pageSize;
  const allowedPageSizes = [10, 25, 50, 100];

  const handlePageSizeChange = (value: number) => {
    const newValue = allowedPageSizes.includes(value) ? value : 10;
    table.setPageSize(newValue);
    table.setPageIndex(0);
    if (typeof onPageSize === 'function') {
      onPageSize(newValue);
    }
    if (typeof onPage === 'function') {
      onPage(0);
    }
  };

  const handlePageChange = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
    if (typeof onPage === 'function') {
      onPage(pageIndex);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 gap-4 flex-wrap">
      <div className="flex items-center space-x-2 text-sm whitespace-nowrap">
        {hidePageSize ? null : isLoading ? (
          <>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16 rounded" />
          </>
        ) : (
          <>
            <span>Rows per page:</span>
            <RowsPerPage value={pageSizeValue} onChange={handlePageSizeChange} />
          </>
        )}
      </div>

      <div className="flex items-center space-x-1">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-20 rounded" />
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
              <Skeleton key={`skeleton-page-${num}`} className="h-8 w-8 rounded" />
            ))}
            <Skeleton className="h-8 w-16 rounded" />
          </>
        ) : (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={!table.getCanPreviousPage()}
                  className={
                    !table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed text-gray-400' : ''
                  }
                  onClick={() => {
                    if (table.getCanPreviousPage()) {
                      handlePageChange(pageIndex - 1);
                    }
                  }}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }).map((_, i) => (
                <PaginationItem key={`page-${i + 1}`}>
                  <PaginationLink isActive={i === pageIndex} onClick={() => handlePageChange(i)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  aria-disabled={!table.getCanNextPage()}
                  className={
                    !table.getCanNextPage() ? 'opacity-50 cursor-not-allowed text-gray-400' : ''
                  }
                  onClick={() => {
                    if (table.getCanNextPage()) {
                      handlePageChange(pageIndex + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

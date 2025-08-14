import { Button } from '@/components/button/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { Table } from '@tanstack/react-table';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useVoidReportFilters } from '../hooks/use-chasier-report-filters';

interface TablePaginationProps<T> {
  table: Table<T>;
  pageSizeOptions?: number[];
  totalPages?: number;
}

export function TablePagination<T>({
  table,
  pageSizeOptions = [10, 25, 50, 100],
  totalPages,
}: TablePaginationProps<T>) {
  const { filters, updatePage, updatePageSize } = useVoidReportFilters();

  // Sync URL pagination state with table state
  useEffect(() => {
    table.setPageIndex(filters.page);
  }, [filters.page, table]);

  useEffect(() => {
    table.setPageSize(filters.pageSize);
  }, [filters.pageSize, table]);

  const handlePreviousPage = () => {
    updatePage(Math.max(0, filters.page - 1));
  };

  const handleNextPage = () => {
    const maxPage = (totalPages ?? 1) - 1;
    updatePage(Math.min(maxPage, filters.page + 1));
  };

  const handlePageSizeChange = (value: string) => {
    updatePageSize(Number(value));
  };

  const canPreviousPage = filters.page > 0;
  const canNextPage = filters.page < (totalPages ?? 1) - 1;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        Rows per page
        <Select value={`${filters.pageSize}`} onValueChange={handlePageSizeChange}>
          <SelectTrigger
            className="w-[70px] h-10"
            icon={<ChevronDown className="h-4 w-4 text-gray-400" />}
          >
            <SelectValue placeholder={filters.pageSize} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-3  ${
            !canPreviousPage ? 'opacity-50 cursor-not-allowed text-gray-400' : 'hover:bg-gray-50'
          }`}
          onClick={handlePreviousPage}
          disabled={!canPreviousPage}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <Button variant="ghost" size="sm" className="h-8 w-8 pointer-events-none">
          {filters.page + 1}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 px-3  ${
            !canNextPage ? 'opacity-50 cursor-not-allowed text-gray-400' : 'hover:bg-gray-50'
          }`}
          onClick={handleNextPage}
          disabled={!canNextPage}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

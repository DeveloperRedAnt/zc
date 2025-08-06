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

interface TablePaginationProps<T> {
  table: Table<T>;
  pageSizeOptions?: number[];
}

export function TablePagination<T>({
  table,
  pageSizeOptions = [10, 25, 50, 100],
}: TablePaginationProps<T>) {
  const handlePreviousPage = () => {
    table.previousPage();
  };

  const handleNextPage = () => {
    table.nextPage();
  };

  const handlePageSizeChange = (value: string) => {
    table.setPageSize(Number(value));
  };

  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        Rows per page
        <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
          <SelectTrigger
            className="w-[70px] h-10"
            icon={<ChevronDown className="h-4 w-4 text-gray-400" />}
          >
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
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
          {pageIndex + 1}
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

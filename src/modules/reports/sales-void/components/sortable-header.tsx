import { Button } from '@/components/button/button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useVoidReportFilters } from '../hooks/use-void-report-filters';

interface SortableHeaderProps {
  columnId: string;
  children: React.ReactNode;
  className?: string;
}

export function SortableHeader({ columnId, children, className }: SortableHeaderProps) {
  const { filters, toggleSort } = useVoidReportFilters();

  const isActive = filters.sortBy === columnId;
  const direction = filters.sortDirection;

  const handleClick = () => {
    toggleSort(columnId);
  };

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown className="ml-1 h-3 w-3 text-gray-500" />;
    }

    if (direction === 'asc') {
      return <ArrowUp className="ml-1 h-3 w-3 text-blue-600" />;
    }
    return <ArrowDown className="ml-1 h-3 w-3 text-blue-600" />;
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`p-0 hover:bg-transparent ${isActive ? 'text-blue-600' : ''} ${className || ''}`}
    >
      {children}
      {getSortIcon()}
    </Button>
  );
}

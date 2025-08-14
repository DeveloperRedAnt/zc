import { Button } from '@/components/button/button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

interface SortableHeaderProps {
  columnId: string;
  children: React.ReactNode;
  className?: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSort: (columnId: string) => void;
}

export function SortableHeader({
  columnId,
  children,
  className,
  sortBy,
  sortDirection,
  onSort,
}: SortableHeaderProps) {
  const isActive = sortBy === columnId;

  const handleClick = () => {
    onSort(columnId);
  };

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown className="ml-1 h-3 w-3 text-gray-500" />;
    }

    if (sortDirection === 'asc') {
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

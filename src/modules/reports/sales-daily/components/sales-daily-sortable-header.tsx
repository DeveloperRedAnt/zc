import { Button } from '@/components/button/button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

interface SortableHeaderProps {
  columnId: string;
  children: React.ReactNode;
  isSorted?: boolean;
  isDesc?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SortableHeader({
  children,
  className,
  isSorted,
  isDesc,
  onClick,
}: SortableHeaderProps) {
  const active = !!isSorted;
  const desc = !!isDesc;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const getSortIcon = () => {
    if (!active) {
      return <ArrowUpDown className="ml-1 h-3 w-3 text-gray-500" />;
    }
    if (!desc) {
      return <ArrowUp className="ml-1 h-3 w-3 text-blue-600" />;
    }
    return <ArrowDown className="ml-1 h-3 w-3 text-blue-600" />;
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`p-0 hover:bg-transparent ${active ? 'text-blue-600' : ''} ${className || ''}`}
    >
      {children}
      {getSortIcon()}
    </Button>
  );
}

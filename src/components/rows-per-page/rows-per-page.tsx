import * as Lucide from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/select';
import { RowPerPageStyles } from './rows-per-page.css';

interface RowsPerPageProps {
  value: number;
  onChange: (value: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

export default function RowsPerPage({
  value,
  onChange,
  pageSizeOptions = [10, 25, 50, 100],
  className,
}: RowsPerPageProps) {
  const styles = RowPerPageStyles();

  return (
    <Select value={`${value}`} onValueChange={(val) => onChange(Number(val))}>
      <SelectTrigger
        className={`${styles.trigger} ${className ?? ''}`}
        icon={<Lucide.ChevronDown className="ml-auto h-4 w-4 text-gray-500" />}
      >
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent side="top">
        {pageSizeOptions.map((pageSize) => (
          <SelectItem key={pageSize} value={`${pageSize}`}>
            {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

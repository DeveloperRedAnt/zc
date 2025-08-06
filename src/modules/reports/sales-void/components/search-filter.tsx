import { Input } from '@/components/input/input';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
}

export function SearchFilter({
  value,
  onChange,
  placeholder = 'Cari...',
  label = 'Cari No. Nota',
  id = 'search-filter',
  className = 'h-10',
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Search className={'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400'} />
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`pl-9 ${className}`}
        />
      </div>
    </div>
  );
}

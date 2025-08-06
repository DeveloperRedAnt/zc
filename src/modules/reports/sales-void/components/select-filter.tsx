import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { ChevronDown } from 'lucide-react';
import { FilterOption } from '../types/void-report.types';

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  label: string;
  placeholder: string;
  id: string;
  allOptionValue: string;
  className?: string;
}

export function SelectFilter({
  value,
  onChange,
  options,
  label,
  placeholder,
  id,
  allOptionValue,
  className = 'min-w-[200px]',
}: SelectFilterProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="w-full h-11"
          icon={<ChevronDown className="h-4 w-4 text-gray-400" />}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={allOptionValue}>{placeholder}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

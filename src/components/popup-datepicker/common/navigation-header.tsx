import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/button/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';

interface NavigationHeaderProps {
  currentValue: number | string;
  onPrevious: () => void;
  onNext: () => void;
  onValueChange?: (value: string) => void;
  showSelect?: boolean;
  selectOptions?: { value: string; label: string }[];
  selectWidth?: string;
  placeholder?: string;
  displayValue?: string;
}

export function NavigationHeader({
  currentValue,
  onPrevious,
  onNext,
  onValueChange,
  showSelect = true,
  selectOptions = [],
  selectWidth = 'w-[100px]',
  placeholder = 'Tahun',
  displayValue,
}: NavigationHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3 px-4 mb-4">
      <Button
        variant="ghost"
        className="h-8 w-8 p-0 hover:bg-gray-100"
        onClick={onPrevious}
        tabIndex={-1}
      >
        <ChevronLeft className="h-4 w-4 text-gray-600" />
      </Button>

      {showSelect && onValueChange ? (
        <Select value={String(currentValue)} onValueChange={onValueChange}>
          <SelectTrigger
            className={`${selectWidth} h-8 border-gray-200 text-sm text-center`}
            icon={<ChevronDown className="h-4 w-4" />}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <span className="font-medium text-sm text-gray-700">{displayValue || currentValue}</span>
      )}
      <Button
        variant="ghost"
        className="h-8 w-8 p-0 hover:bg-gray-100"
        onClick={onNext}
        tabIndex={-1}
      >
        <ChevronRight className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  );
}

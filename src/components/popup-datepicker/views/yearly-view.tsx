import * as React from 'react';

import { Button } from '@/components/button/button';
import { cn } from '@/libs/utils';
import { NavigationHeader } from '../common/navigation-header';
import { ViewProps } from '../types-datepircker-popup';

export function YearlyView({ state, actions }: ViewProps) {
  const { yearlyRange, currentYearNav } = state;
  const { setYearlyRange, setCurrentYearNav } = actions;

  const yearsInView = 12;
  const startYear = currentYearNav;
  const years = Array.from({ length: yearsInView }, (_, i) => startYear + i);

  const minYear =
    yearlyRange?.from !== undefined && yearlyRange?.to !== undefined
      ? Math.min(yearlyRange.from, yearlyRange.to)
      : undefined;
  const maxYear =
    yearlyRange?.from !== undefined && yearlyRange?.to !== undefined
      ? Math.max(yearlyRange.from, yearlyRange.to)
      : undefined;

  const handleYearClick = (year: number) => {
    setYearlyRange((prev) => {
      if (!prev?.from) {
        return { from: year };
      }
      if (!prev.to) {
        if (year < prev.from) {
          return { from: year, to: prev.from };
        }
        return { from: prev.from, to: year };
      }
      return { from: year };
    });
  };

  return (
    <div>
      <NavigationHeader
        currentValue={`${startYear} - ${startYear + yearsInView - 1}`}
        onPrevious={() => setCurrentYearNav((prev) => prev - yearsInView)}
        onNext={() => setCurrentYearNav((prev) => prev + yearsInView)}
        showSelect={false}
        displayValue={`${startYear} - ${startYear + yearsInView - 1}`}
      />
      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => {
          const isSelected = yearlyRange?.from === year || yearlyRange?.to === year;
          const isInRange =
            minYear !== undefined && maxYear !== undefined && year > minYear && year < maxYear;

          const isStartOfRange = minYear !== undefined && year === minYear;
          const isEndOfRange = maxYear !== undefined && year === maxYear;
          const isSingleSelected = yearlyRange?.from === year && yearlyRange.to === undefined;

          const is2025Outlined = year === 2025 && !isSelected && !isInRange;

          return (
            <Button
              key={year}
              variant="ghost"
              className={cn(
                'w-full rounded-md text-sm font-medium',
                (isSingleSelected || isStartOfRange || isEndOfRange) && 'bg-cyan-500 text-white',
                isInRange && 'bg-cyan-100 text-cyan-900',
                isStartOfRange && 'rounded-r-none',
                isEndOfRange && 'rounded-l-none',
                isInRange && 'rounded-none',
                is2025Outlined && 'border border-cyan-400 text-cyan-500 hover:bg-cyan-50',
                !isSelected && !isInRange && !is2025Outlined && 'text-gray-600 hover:bg-gray-100',
                (isSingleSelected || isStartOfRange || isEndOfRange) && 'hover:bg-cyan-600',
                isInRange && 'hover:bg-cyan-200'
              )}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

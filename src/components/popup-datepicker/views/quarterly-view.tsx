import * as React from 'react';

import { Button } from '@/components/button/button';
import { cn } from '@/libs/utils';
import { NavigationHeader } from '../common/navigation-header';
import { ViewProps } from '../types-datepircker-popup';

export function QuarterlyView({ state, actions }: ViewProps) {
  const { quarterlyRange, currentYearNav } = state;
  const { setQuarterlyRange, setCurrentYearNav } = actions;

  const quarters = [
    { id: 1, name: 'Q1 (Jan - Mar)' },
    { id: 2, name: 'Q2 (Apr - Jun)' },
    { id: 3, name: 'Q3 (Jul - Sep)' },
    { id: 4, name: 'Q4 (Okt - Des)' },
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(
    (year) => ({
      value: String(year),
      label: String(year),
    })
  );

  const isQuarterSame = (
    q1: { quarter: number; year: number },
    q2: { quarter: number; year: number }
  ) => q1.quarter === q2.quarter && q1.year === q2.year;

  const isQuarterAfter = (
    q1: { quarter: number; year: number },
    q2: { quarter: number; year: number }
  ) => {
    if (q1.year > q2.year) return true;
    if (q1.year === q2.year && q1.quarter > q2.quarter) return true;
    return false;
  };

  const handleQuarterClick = (quarter: number, year: number) => {
    const clickedQuarter = { quarter, year };
    setQuarterlyRange((prev) => {
      if (!prev?.from) {
        return { from: clickedQuarter };
      }
      if (!prev.to) {
        if (isQuarterAfter(clickedQuarter, prev.from)) {
          return { from: prev.from, to: clickedQuarter };
        }
        return { from: clickedQuarter, to: prev.from };
      }
      return { from: clickedQuarter };
    });
  };

  return (
    <div>
      <NavigationHeader
        currentValue={currentYearNav}
        onPrevious={() => setCurrentYearNav((prev) => prev - 1)}
        onNext={() => setCurrentYearNav((prev) => prev + 1)}
        onValueChange={(value) => setCurrentYearNav(Number(value))}
        selectOptions={years}
        selectWidth="w-[100px]"
        placeholder="Tahun"
      />
      <div className="grid grid-cols-2 gap-2">
        {quarters.map((quarter) => {
          const currentQ = { quarter: quarter.id, year: currentYearNav };
          const isSelected =
            (quarterlyRange?.from && isQuarterSame(currentQ, quarterlyRange.from)) ||
            (quarterlyRange?.to && isQuarterSame(currentQ, quarterlyRange.to));

          const isInRange =
            quarterlyRange?.from &&
            quarterlyRange?.to &&
            isQuarterAfter(currentQ, quarterlyRange.from) &&
            !isQuarterSame(currentQ, quarterlyRange.to) &&
            !isQuarterAfter(currentQ, quarterlyRange.to);

          const isStartOfRange =
            quarterlyRange?.from &&
            quarterlyRange?.to &&
            isQuarterSame(currentQ, quarterlyRange.from);
          const isEndOfRange =
            quarterlyRange?.from &&
            quarterlyRange?.to &&
            isQuarterSame(currentQ, quarterlyRange.to);
          const isSingleSelected =
            quarterlyRange?.from &&
            isQuarterSame(currentQ, quarterlyRange.from) &&
            quarterlyRange.to === undefined;

          return (
            <Button
              key={quarter.id}
              variant="ghost"
              className={cn(
                'w-full rounded-md text-sm font-medium',
                (isSingleSelected || isStartOfRange || isEndOfRange) && 'bg-cyan-500 text-white',
                isInRange && 'bg-cyan-100 text-cyan-900',
                isStartOfRange && 'rounded-r-none',
                isEndOfRange && 'rounded-l-none',
                isInRange && 'rounded-none',
                !isSelected && !isInRange && 'text-gray-600 hover:bg-gray-100',
                (isSingleSelected || isStartOfRange || isEndOfRange) && 'hover:bg-cyan-600',
                isInRange && 'hover:bg-cyan-200'
              )}
              onClick={() => handleQuarterClick(quarter.id, currentYearNav)}
            >
              {quarter.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

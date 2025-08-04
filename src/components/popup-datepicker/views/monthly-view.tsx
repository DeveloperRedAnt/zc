import { format, isAfter, isBefore, isSameMonth, isSameYear } from 'date-fns';
import { id } from 'date-fns/locale';
import * as React from 'react';

import { Button } from '@/components/button/button';
import { cn } from '@/libs/utils';
import { NavigationHeader } from '../common/navigation-header';
import { ViewProps } from './../types-datepircker-popup';

export function MonthlyView({ state, actions }: ViewProps) {
  const { monthlyRange, currentYearNav } = state;
  const { setMonthlyRange, setCurrentYearNav } = actions;

  const months = Array.from({ length: 12 }, (_, i) => new Date(currentYearNav, i, 1));

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(
    (year) => ({
      value: String(year),
      label: String(year),
    })
  );

  const handleMonthClick = (month: Date) => {
    setMonthlyRange((prev) => {
      if (!prev?.from) {
        return { from: month };
      }
      if (!prev.to) {
        if (isBefore(month, prev.from)) {
          return { from: month, to: prev.from };
        }
        return { from: prev.from, to: month };
      }
      return { from: month };
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
      <div className="grid grid-cols-4 gap-3 px-4">
        {months.map((month) => {
          const isSelected =
            (monthlyRange?.from &&
              isSameMonth(month, monthlyRange.from) &&
              isSameYear(month, monthlyRange.from)) ||
            (monthlyRange?.to &&
              isSameMonth(month, monthlyRange.to) &&
              isSameYear(month, monthlyRange.to));
          const isInRange =
            monthlyRange?.from &&
            monthlyRange?.to &&
            isAfter(month, monthlyRange.from) &&
            isBefore(month, monthlyRange.to);

          const isStartOfRange =
            monthlyRange?.from &&
            monthlyRange?.to &&
            isSameMonth(month, monthlyRange.from) &&
            isSameYear(month, monthlyRange.from);
          const isEndOfRange =
            monthlyRange?.from &&
            monthlyRange?.to &&
            isSameMonth(month, monthlyRange.to) &&
            isSameYear(month, monthlyRange.to);
          const isSingleSelected =
            monthlyRange?.from &&
            isSameMonth(month, monthlyRange.from) &&
            isSameYear(month, monthlyRange.from) &&
            monthlyRange.to === undefined;

          return (
            <Button
              key={`${month.getFullYear()}-${month.getMonth()}`}
              variant="ghost"
              className={cn(
                'w-full h-10 rounded-md text-sm font-medium border-0',
                (isSingleSelected || isStartOfRange || isEndOfRange) &&
                  'bg-[#0FA6C1] text-white shadow-none',
                isInRange && 'bg-teal-100 text-teal-900 shadow-none',
                isStartOfRange && 'rounded-r-none',
                isEndOfRange && 'rounded-l-none',
                isInRange && 'rounded-none',
                !isSelected &&
                  !isInRange &&
                  'text-gray-600 hover:bg-gray-100 bg-gray-50 shadow-none',
                (isSingleSelected || isStartOfRange || isEndOfRange) && 'hover:bg-teal-600',
                isInRange && 'hover:bg-teal-200'
              )}
              onClick={() => handleMonthClick(month)}
            >
              {format(month, 'MMM', { locale: id })}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

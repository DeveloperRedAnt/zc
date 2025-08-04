import { addWeeks, endOfWeek, format, isSameWeek, startOfWeek } from 'date-fns';
import * as React from 'react';

import { Button } from '@/components/button/button';
import { cn } from '@/libs/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationHeader } from '../common/navigation-header';
import { ViewProps } from '../types-datepircker-popup';

const WEEKS_PER_PAGE = 6;

export function WeeklyView({ state, actions }: ViewProps) {
  const { weeklyRange, currentYearNav } = state;
  const { setWeeklyRange, setCurrentYearNav } = actions;

  // Generate weeks for the selected year
  const year = currentYearNav;
  const firstDayOfYear = new Date(year, 0, 1);
  const start = startOfWeek(firstDayOfYear, { weekStartsOn: 1 });
  const weeks: { from: Date; to: Date }[] = [];

  let currentWeekStart = start;
  while (
    currentWeekStart.getFullYear() === year ||
    (currentWeekStart.getFullYear() === year - 1 && currentWeekStart.getMonth() === 11)
  ) {
    const from = currentWeekStart;
    const to = endOfWeek(from, { weekStartsOn: 1 });
    // Stop jika minggu sudah keluar dari tahun yang dipilih
    if (
      from.getFullYear() > year ||
      (from.getFullYear() === year && from.getMonth() === 11 && from.getDate() > 24)
    ) {
      break;
    }
    weeks.push({ from, to });
    currentWeekStart = addWeeks(currentWeekStart, 1);
  }
  // Pagination state
  const [page, setPage] = React.useState(0);
  const totalPages = Math.ceil(weeks.length / WEEKS_PER_PAGE);

  // Slice weeks for current page
  const pagedWeeks = weeks.slice(page * WEEKS_PER_PAGE, (page + 1) * WEEKS_PER_PAGE);

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(
    (year) => ({
      value: String(year),
      label: String(year),
    })
  );

  // Reset page when year changes
  React.useEffect(() => {
    setPage(0);
  }, []);

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

      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          <ChevronLeft size={20} />
        </Button>
        <span className="text-sm">
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pagedWeeks.map((week, idx) => {
              const weekNumber = page * WEEKS_PER_PAGE + idx + 1;
              const isSelected =
                weeklyRange?.from &&
                weeklyRange.to &&
                isSameWeek(week.from, weeklyRange.from, { weekStartsOn: 1 }) &&
                isSameWeek(week.to, weeklyRange.to, { weekStartsOn: 1 });
              return (
                <Button
                  key={`${week.from.toISOString()}_${week.to.toISOString()}`}
                  variant="ghost"
                  className={cn(
                    'w-full rounded-xl text-base font-semibold flex flex-col items-center py-3 transition-all duration-150',
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-cyan-50 text-cyan-900 border border-cyan-200 hover:bg-cyan-100',
                    isSelected && 'border-2 border-cyan-700',
                    !isSelected && 'border border-cyan-200',
                    !isSelected && 'hover:border-cyan-400',
                    'focus:outline-none',
                    isSelected ? '' : 'hover:bg-cyan-100'
                  )}
                  style={{
                    minHeight: 56,
                    boxShadow: isSelected ? '0 2px 8px rgba(0, 184, 255, 0.15)' : undefined,
                  }}
                  onClick={() => setWeeklyRange({ from: week.from, to: week.to })}
                >
                  <span className="font-semibold">{`Minggu ${weekNumber}`}</span>
                  <span className="text-base font-normal">{`${format(
                    week.from,
                    'd MMM'
                  )} – ${format(week.to, 'd MMM')}`}</span>
                </Button>
              );
            })}
          </div>
        </span>
        <Button
          variant="ghost"
          disabled={page === totalPages - 1}
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}

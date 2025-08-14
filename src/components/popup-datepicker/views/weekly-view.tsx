import { addWeeks, endOfWeek, format, isSameWeek, startOfWeek } from 'date-fns';
import { isAfter, isBefore } from 'date-fns';
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

  // Range selection state for weekly view
  const [isSelectingRange, setIsSelectingRange] = React.useState(false);
  const [tempStartWeek, setTempStartWeek] = React.useState<{ from: Date; to: Date } | null>(null);

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

  // Reset page and temporary selection when year changes (important for Reset behavior)
  React.useEffect(() => {
    setPage(0);
    setIsSelectingRange(false);
    setTempStartWeek(null);
  }, []);

  // When weeklyRange changes (e.g., after Reset), navigate to the page that contains the selected week
  React.useEffect(() => {
    if (!weeklyRange?.from) return;
    const index = weeks.findIndex((w) =>
      isSameWeek(w.from, weeklyRange.from as Date, { weekStartsOn: 1 })
    );
    if (index >= 0) {
      const targetPage = Math.floor(index / WEEKS_PER_PAGE);
      setPage((prev) => (prev === targetPage ? prev : targetPage));
    }
  }, [weeklyRange?.from]);

  const handleWeekClick = (week: { from: Date; to: Date }) => {
    // If not currently selecting a range, start with this week
    if (!isSelectingRange || !tempStartWeek) {
      setIsSelectingRange(true);
      setTempStartWeek(week);
      // Also reflect immediate selection for UX feedback
      setWeeklyRange({ from: week.from, to: week.to });
      return;
    }

    // Complete the range: determine the chronological order
    const startFrom = isAfter(tempStartWeek.from, week.from) ? week.from : tempStartWeek.from;
    const endTo = isBefore(tempStartWeek.to, week.to) ? week.to : tempStartWeek.to;

    setWeeklyRange({ from: startFrom, to: endTo });
    setIsSelectingRange(false);
    setTempStartWeek(null);
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
              // Selected endpoints
              const isStart =
                weeklyRange?.from && isSameWeek(week.from, weeklyRange.from, { weekStartsOn: 1 });
              const isEnd =
                weeklyRange?.to && isSameWeek(week.to, weeklyRange.to, { weekStartsOn: 1 });
              // In-range highlight when between start and end
              const isInRange =
                weeklyRange?.from &&
                weeklyRange.to &&
                week.from >= weeklyRange.from &&
                week.to <= weeklyRange.to;
              const isSelected = Boolean(isStart || isEnd);
              return (
                <Button
                  key={`${week.from.toISOString()}_${week.to.toISOString()}`}
                  variant="ghost"
                  className={cn(
                    'w-full rounded-xl text-base font-semibold flex flex-col items-center py-3 transition-all duration-150',
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-md'
                      : isInRange
                        ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                        : 'bg-cyan-50 text-cyan-900 border border-cyan-200 hover:bg-cyan-100',
                    isSelected && 'border-2 border-cyan-700',
                    !isSelected && !isInRange && 'border border-cyan-200',
                    !isSelected && !isInRange && 'hover:border-cyan-400',
                    'focus:outline-none',
                    isSelected ? '' : 'hover:bg-cyan-100'
                  )}
                  style={{
                    minHeight: 56,
                    boxShadow: isSelected ? '0 2px 8px rgba(0, 184, 255, 0.15)' : undefined,
                  }}
                  onClick={() => handleWeekClick(week)}
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

import { format, isAfter, isBefore } from 'date-fns';
import { id } from 'date-fns/locale';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/button/button';
import { Calendar } from '@/components/calendar/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { ViewProps } from '../types-datepircker-popup';

export function DailyView({ state, actions }: ViewProps) {
  const { dailyRange, singleBorderedDate, calendarMonth } = state;
  const { setDailyRange, setSingleBorderedDate, setCalendarMonth } = actions;

  const currentMonth = calendarMonth.getMonth();
  const currentYear = calendarMonth.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2000, i, 1), 'MMM', { locale: id }),
  }));

  const handleMonthChange = (value: string) => {
    setCalendarMonth(new Date(currentYear, Number(value), 1));
  };

  const handleYearChange = (value: string) => {
    setCalendarMonth(new Date(Number(value), currentMonth, 1));
  };

  const modifiers = {
    bordered: singleBorderedDate,
    isStartOfRangeDaily: dailyRange?.from && dailyRange.to ? dailyRange.from : undefined,
    isEndOfRangeDaily: dailyRange?.from && dailyRange.to ? dailyRange.to : undefined,
    isInRangeDaily: (date: Date): boolean => {
      if (!dailyRange?.from || !dailyRange.to) return false;
      return isAfter(date, dailyRange.from) && isBefore(date, dailyRange.to);
    },
    isSingleSelectedDaily: dailyRange?.from && !dailyRange.to ? dailyRange.from : undefined,
  };

  const modifiersClassNames = {
    bordered: 'border border-cyan-400 text-cyan-400 bg-background hover:bg-cyan-50',
    isStartOfRangeDaily: 'bg-cyan-500 text-white rounded-r-none',
    isEndOfRangeDaily: 'bg-cyan-500 text-white rounded-l-none',
    isInRangeDaily: 'bg-cyan-100 text-cyan-900 rounded-none',
    isSingleSelectedDaily: 'bg-cyan-500 text-white rounded-md',
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => setCalendarMonth(new Date(currentYear, currentMonth - 1, 1))}
          tabIndex={-1}
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </Button>
        <div className="items-center grid grid-cols-2 gap-4">
          <Select value={String(currentMonth)} onValueChange={handleMonthChange}>
            <SelectTrigger
              className="w-[80px] h-8 border-gray-200 text-sm text-center"
              icon={<ChevronDown className="h-4 w-4" />}
            >
              <SelectValue placeholder="Bulan" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={String(month.value)}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={String(currentYear)} onValueChange={handleYearChange}>
            <SelectTrigger
              className="h-8 border-gray-200 text-sm text-center"
              icon={<ChevronDown className="h-4 w-4" />}
            >
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-gray-100"
          onClick={() => setCalendarMonth(new Date(currentYear, currentMonth + 1, 1))}
          tabIndex={-1}
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
      <div className="px-6 pb-4">
        <Calendar
          mode="range"
          month={calendarMonth}
          onMonthChange={setCalendarMonth}
          defaultMonth={dailyRange?.from || new Date()}
          selected={dailyRange}
          onSelect={(range) => {
            setDailyRange(range);
            setSingleBorderedDate(undefined);
          }}
          numberOfMonths={1}
          locale={id}
          formatters={{
            formatWeekdayName: (date: Date): string => {
              const dayNames = ['Mi', 'Se', 'Se', 'Ra', 'Ka', 'Ju', 'Sa'];
              const dayIndex = date.getDay();
              return dayNames[dayIndex] ?? '';
            },
          }}
          classNames={{
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center hidden',
            caption_label: 'text-sm font-medium',
            nav: 'space-x-1 flex items-center hidden',
            nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'grid grid-cols-7 gap-0',
            head_cell:
              'text-gray-500 w-10 h-8 font-normal text-[0.8rem] text-center flex items-center justify-center',
            cell: 'text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
            day: 'h-10 w-10 p-0 font-normal aria-selected:opacity-100 text-gray-700 hover:bg-gray-100 text-sm rounded-md mx-auto',
            row: 'grid grid-cols-7 gap-0 mt-1',
            day_selected: '',
            day_range_start: '',
            day_range_end: '',
            day_range_middle: '',
            day_today: 'border-2 border-cyan-400 text-cyan-500 bg-background rounded-md',
            day_outside: 'text-gray-400 opacity-50',
            day_hidden: 'invisible',
          }}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>
    </div>
  );
}

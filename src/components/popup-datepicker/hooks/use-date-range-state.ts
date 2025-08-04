import { endOfWeek, startOfWeek } from 'date-fns';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import { MonthlyRange, Period, QuarterlyRange, YearlyRange } from '../types-datepircker-popup';

import { DateRangeActions, DateRangeState, WeeklyRange } from '../types-datepircker-popup';

interface UseDateRangeStateProps {
  initialPeriod?: Period;
  defaultDailyRange?: DateRange;
  defaultSingleBorderedDate?: Date;
  defaultMonthlyRange?: MonthlyRange;
  defaultQuarterlyRange?: QuarterlyRange;
  defaultYearlyRange?: YearlyRange;
}

export function useDateRangeState({
  initialPeriod,
  defaultDailyRange,
  defaultSingleBorderedDate,
  defaultMonthlyRange,
  defaultQuarterlyRange,
  defaultYearlyRange,
}: UseDateRangeStateProps): [DateRangeState, DateRangeActions] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentQuarter = Math.floor(currentMonth / 3) + 1;

  // State for each period type's selection
  const [dailyRange, setDailyRange] = React.useState<DateRange | undefined>(
    initialPeriod?.type === 'daily' ? (initialPeriod.value as DateRange) : defaultDailyRange
  );
  const [singleBorderedDate, setSingleBorderedDate] = React.useState<Date | undefined>(
    defaultSingleBorderedDate
  );
  const [weeklyRange, setWeeklyRange] = React.useState<WeeklyRange | undefined>(
    initialPeriod?.type === 'weekly'
      ? (initialPeriod.value as WeeklyRange)
      : {
          from: startOfWeek(new Date(), { weekStartsOn: 1 }),
          to: endOfWeek(new Date(), { weekStartsOn: 1 }),
        }
  );
  const [monthlyRange, setMonthlyRange] = React.useState<MonthlyRange | undefined>(
    initialPeriod?.type === 'monthly'
      ? (initialPeriod.value as MonthlyRange)
      : defaultMonthlyRange ?? { from: new Date(currentYear, currentMonth, 1) }
  );
  const [quarterlyRange, setQuarterlyRange] = React.useState<QuarterlyRange | undefined>(
    initialPeriod?.type === 'quarterly'
      ? (initialPeriod.value as QuarterlyRange)
      : defaultQuarterlyRange ?? {
          from: { quarter: currentQuarter, year: currentYear },
        }
  );
  const [yearlyRange, setYearlyRange] = React.useState<YearlyRange | undefined>(
    initialPeriod?.type === 'yearly'
      ? (initialPeriod.value as YearlyRange)
      : defaultYearlyRange ?? { from: 2020, to: 2022 }
  );

  const [currentYearNav, setCurrentYearNav] = React.useState<number>(() => {
    if (initialPeriod?.type === 'quarterly') {
      const quarterlyValue = initialPeriod.value as QuarterlyRange;
      return quarterlyValue?.from?.year || currentYear;
    }
    if (initialPeriod?.type === 'monthly') {
      const monthlyValue = initialPeriod.value as MonthlyRange;
      return monthlyValue?.from?.getFullYear() || currentYear;
    }
    if (initialPeriod?.type === 'yearly') {
      const yearlyValue = initialPeriod.value as YearlyRange;
      return yearlyValue?.from || currentYear;
    }
    return currentYear;
  });

  const [calendarMonth, setCalendarMonth] = React.useState<Date>(dailyRange?.from || new Date());

  const state: DateRangeState = {
    dailyRange,
    singleBorderedDate,
    weeklyRange,
    monthlyRange,
    quarterlyRange,
    yearlyRange,
    calendarMonth,
    currentYearNav,
  };

  const actions: DateRangeActions = {
    setDailyRange,
    setSingleBorderedDate,
    setWeeklyRange,
    setMonthlyRange,
    setQuarterlyRange,
    setYearlyRange,
    setCalendarMonth,
    setCurrentYearNav,
  };

  return [state, actions];
}

import { endOfWeek, startOfWeek } from 'date-fns';
import * as React from 'react';

import {
  DateRangeActions,
  DateRangePickerProps,
  DateRangeState,
  PeriodType,
} from '../types-datepircker-popup';

interface UseDateRangeEffectsProps {
  view: PeriodType;
  state: DateRangeState;
  actions: DateRangeActions;
  defaultDailyRange?: DateRangePickerProps['defaultDailyRange'];
  defaultMonthlyRange?: DateRangePickerProps['defaultMonthlyRange'];
  defaultQuarterlyRange?: DateRangePickerProps['defaultQuarterlyRange'];
  defaultYearlyRange?: DateRangePickerProps['defaultYearlyRange'];
}

export function useDateRangeEffects({
  view,
  state,
  actions,
  defaultDailyRange,
  defaultMonthlyRange,
  defaultQuarterlyRange,
  defaultYearlyRange,
}: UseDateRangeEffectsProps) {
  const { dailyRange, weeklyRange, monthlyRange, quarterlyRange, yearlyRange } = state;

  const {
    setDailyRange,
    setWeeklyRange,
    setMonthlyRange,
    setQuarterlyRange,
    setYearlyRange,
    setCurrentYearNav,
  } = actions;

  React.useEffect(() => {
    const currentYearEffect = new Date().getFullYear();
    const currentMonthEffect = new Date().getMonth();
    const currentDayEffect = new Date().getDate();
    const currentQuarterEffect = Math.floor(currentMonthEffect / 3) + 1;

    if (view === 'daily' && !dailyRange) {
      setDailyRange(
        defaultDailyRange ?? {
          from: new Date(currentYearEffect, currentMonthEffect, currentDayEffect),
        }
      );
    } else if (view === 'weekly' && !weeklyRange) {
      setWeeklyRange({
        from: startOfWeek(new Date(currentYearEffect, currentMonthEffect, 1), {
          weekStartsOn: 1,
        }),
        to: endOfWeek(new Date(currentYearEffect, currentMonthEffect, 1), {
          weekStartsOn: 1,
        }),
      });
      setCurrentYearNav(currentYearEffect);
    } else if (view === 'monthly' && !monthlyRange) {
      setMonthlyRange(
        defaultMonthlyRange ?? {
          from: new Date(currentYearEffect, currentMonthEffect, 1),
        }
      );
      setCurrentYearNav(currentYearEffect);
    } else if (view === 'quarterly' && !quarterlyRange) {
      setQuarterlyRange(
        defaultQuarterlyRange ?? {
          from: { quarter: currentQuarterEffect, year: currentYearEffect },
        }
      );
      setCurrentYearNav(currentYearEffect);
    } else if (view === 'yearly' && !yearlyRange) {
      setYearlyRange(defaultYearlyRange ?? { from: 2020, to: 2022 });
      setCurrentYearNav(2014);
    }
  }, [
    view,
    dailyRange,
    weeklyRange,
    monthlyRange,
    quarterlyRange,
    yearlyRange,
    defaultDailyRange,
    defaultMonthlyRange,
    defaultQuarterlyRange,
    defaultYearlyRange,
    setDailyRange,
    setWeeklyRange,
    setMonthlyRange,
    setQuarterlyRange,
    setYearlyRange,
    setCurrentYearNav,
  ]);
}

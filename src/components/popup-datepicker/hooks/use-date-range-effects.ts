import { endOfWeek, startOfWeek } from 'date-fns';
import * as React from 'react';

import { DateRangeActions, DateRangeState, PeriodType } from '../types-datepircker-popup';

interface UseDateRangeEffectsProps {
  view: PeriodType;
  state: DateRangeState;
  actions: DateRangeActions;
}

export function useDateRangeEffects({ view, state, actions }: UseDateRangeEffectsProps) {
  const { dailyRange, weeklyRange, monthlyRange, quarterlyRange, yearlyRange } = state;
  const initializedRef = React.useRef<Record<string, boolean>>({
    daily: false,
    weekly: false,
    monthly: false,
    quarterly: false,
    yearly: false,
  });

  const {
    setDailyRange,
    setWeeklyRange,
    setMonthlyRange,
    setQuarterlyRange,
    setYearlyRange,
    setCurrentYearNav,
  } = actions;

  React.useEffect(() => {
    const currentDate = new Date();
    const currentYearEffect = currentDate.getFullYear();
    const currentMonthEffect = currentDate.getMonth();
    const currentDayEffect = currentDate.getDate();
    const currentQuarterEffect = Math.floor(currentMonthEffect / 3) + 1;

    switch (view) {
      case 'daily':
        if (!dailyRange && !initializedRef.current.daily) {
          initializedRef.current.daily = true;
          setDailyRange({
            from: new Date(currentYearEffect, currentMonthEffect, currentDayEffect),
          });
        }
        break;
      case 'weekly':
        if (!weeklyRange && !initializedRef.current.weekly) {
          initializedRef.current.weekly = true;
          setWeeklyRange({
            from: startOfWeek(new Date(currentYearEffect, currentMonthEffect, 1), {
              weekStartsOn: 1,
            }),
            to: endOfWeek(new Date(currentYearEffect, currentMonthEffect, 1), {
              weekStartsOn: 1,
            }),
          });
          setCurrentYearNav(currentYearEffect);
        }
        break;
      case 'monthly':
        if (!monthlyRange && !initializedRef.current.monthly) {
          initializedRef.current.monthly = true;
          setMonthlyRange({
            from: new Date(currentYearEffect, currentMonthEffect, 1),
          });
          setCurrentYearNav(currentYearEffect);
        }
        break;
      case 'quarterly':
        if (!quarterlyRange && !initializedRef.current.quarterly) {
          initializedRef.current.quarterly = true;
          setQuarterlyRange({
            from: { quarter: currentQuarterEffect, year: currentYearEffect },
          });
          setCurrentYearNav(currentYearEffect);
        }
        break;
      case 'yearly':
        if (!yearlyRange && !initializedRef.current.yearly) {
          initializedRef.current.yearly = true;
          setYearlyRange({ from: 2020, to: 2022 });
          setCurrentYearNav(currentYearEffect);
        }
        break;
    }
  }, [
    view,
    dailyRange,
    weeklyRange,
    monthlyRange,
    quarterlyRange,
    yearlyRange,
    setDailyRange,
    setWeeklyRange,
    setMonthlyRange,
    setQuarterlyRange,
    setYearlyRange,
    setCurrentYearNav,
  ]);
}

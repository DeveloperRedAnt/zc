import { endOfWeek, startOfWeek } from 'date-fns';
import * as React from 'react';

import {
  DateRangeActions,
  DateRangeState,
  Period,
  PeriodType,
  PeriodValue,
} from '../types-datepircker-popup';

interface UseDateRangeLogicProps {
  state: DateRangeState;
  actions: DateRangeActions;
  view: PeriodType;
  onApply: (period: Period) => void;
}

export function useDateRangeLogic({ state, actions, view, onApply }: UseDateRangeLogicProps) {
  const {
    setDailyRange,
    setSingleBorderedDate,
    setWeeklyRange,
    setMonthlyRange,
    setQuarterlyRange,
    setYearlyRange,
    setCurrentYearNav,
  } = actions;

  const handleApply = React.useCallback(() => {
    let periodValue: PeriodValue;
    switch (view) {
      case 'daily':
        periodValue = state.dailyRange || {};
        break;
      case 'weekly':
        periodValue = state.weeklyRange || {};
        break;
      case 'monthly':
        periodValue = state.monthlyRange || {};
        break;
      case 'quarterly':
        periodValue = state.quarterlyRange || {};
        break;
      case 'yearly':
        periodValue = state.yearlyRange || {};
        break;
      default:
        periodValue = {};
    }
    onApply({ type: view, value: periodValue });
  }, [view, state, onApply]);

  const handleReset = React.useCallback(() => {
    const currentYearReset = new Date().getFullYear();
    const currentMonthReset = new Date().getMonth();
    const currentQuarterReset = Math.floor(currentMonthReset / 3) + 1;

    setDailyRange({ from: new Date(2025, 6, 17), to: new Date(2025, 6, 19) });
    setSingleBorderedDate(new Date(2025, 6, 5));
    setWeeklyRange({
      from: startOfWeek(new Date(currentYearReset, currentMonthReset, 1), {
        weekStartsOn: 1,
      }),
      to: endOfWeek(new Date(currentYearReset, currentMonthReset, 1), {
        weekStartsOn: 1,
      }),
    });
    setMonthlyRange({ from: new Date(currentYearReset, currentMonthReset, 1) });
    setQuarterlyRange({
      from: { quarter: currentQuarterReset, year: currentYearReset },
    });
    setYearlyRange({ from: 2025, to: undefined });
    setCurrentYearNav(currentYearReset);

    onApply({
      type: 'daily',
      value: { from: new Date(2025, 6, 17), to: new Date(2025, 6, 19) },
    });
  }, [
    setDailyRange,
    setSingleBorderedDate,
    setWeeklyRange,
    setMonthlyRange,
    setQuarterlyRange,
    setYearlyRange,
    setCurrentYearNav,
    onApply,
  ]);

  return {
    handleApply,
    handleReset,
  };
}

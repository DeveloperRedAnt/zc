import { endOfMonth, endOfQuarter, endOfWeek, startOfWeek } from 'date-fns';
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
        // Convert the end date to the last day of the month for monthly view
        if (state.monthlyRange?.to) {
          periodValue = {
            from: state.monthlyRange.from,
            to: endOfMonth(state.monthlyRange.to),
          };
        } else {
          periodValue = state.monthlyRange || {};
        }
        break;
      case 'quarterly':
        // Convert quarter objects to actual dates
        if (state.quarterlyRange?.from) {
          // Quarter to month conversion (Q1=0, Q2=3, Q3=6, Q4=9)
          const quarterToMonth = (q: number) => (q - 1) * 3;

          // Create start date (first day of quarter)
          const fromDate = new Date(
            state.quarterlyRange.from.year,
            quarterToMonth(state.quarterlyRange.from.quarter),
            1
          );

          let toDate: Date | undefined;
          if (state.quarterlyRange.to) {
            // Create end date (last day of quarter)
            toDate = new Date(
              state.quarterlyRange.to.year,
              quarterToMonth(state.quarterlyRange.to.quarter),
              1
            );
            toDate = endOfQuarter(toDate);
          }

          periodValue = {
            from: fromDate,
            to: toDate,
          };
        } else {
          periodValue = {};
        }
        break;
      case 'yearly':
        // Convert year numbers to actual dates
        if (state.yearlyRange?.from) {
          const fromDate = new Date(state.yearlyRange.from, 0, 1); // January 1st of start year

          let toDate: Date | undefined;
          if (state.yearlyRange.to) {
            toDate = new Date(state.yearlyRange.to, 11, 31); // December 31st of end year
          }

          periodValue = {
            from: fromDate,
            to: toDate,
          };
        } else {
          periodValue = {};
        }
        break;
      default:
        periodValue = {};
    }
    onApply({ type: view, value: periodValue });
  }, [view, state, onApply]);

  const handleReset = React.useCallback(() => {
    const today = new Date();
    const currentYearReset = today.getFullYear();
    const currentMonthReset = today.getMonth();
    const currentQuarterReset = Math.floor(currentMonthReset / 3) + 1;

    // Always update all date ranges to current period values
    setDailyRange({ from: today, to: today });
    setSingleBorderedDate(today);

    // Weekly view - current week
    setWeeklyRange({
      from: startOfWeek(today, { weekStartsOn: 1 }),
      to: endOfWeek(today, { weekStartsOn: 1 }),
    });

    // Monthly view - current month
    const firstDayOfMonth = new Date(currentYearReset, currentMonthReset, 1);
    const lastDayOfMonth = endOfMonth(firstDayOfMonth);
    setMonthlyRange({ from: firstDayOfMonth, to: lastDayOfMonth });

    // Quarterly view - current quarter
    setQuarterlyRange({
      from: { quarter: currentQuarterReset, year: currentYearReset },
      to: { quarter: currentQuarterReset, year: currentYearReset },
    });

    // Yearly view - current year
    setYearlyRange({ from: currentYearReset, to: currentYearReset });
    setCurrentYearNav(currentYearReset);

    // Apply based on current view
    let resetPeriodValue: { from: Date; to: Date };
    switch (view) {
      case 'daily':
        resetPeriodValue = { from: today, to: today };
        break;
      case 'weekly':
        resetPeriodValue = {
          from: startOfWeek(today, { weekStartsOn: 1 }),
          to: endOfWeek(today, { weekStartsOn: 1 }),
        };
        break;
      case 'monthly':
        resetPeriodValue = {
          from: firstDayOfMonth,
          to: lastDayOfMonth,
        };
        break;
      case 'quarterly': {
        // Convert quarter to date for the API
        const quarterStartMonth = (currentQuarterReset - 1) * 3;
        const quarterStartDate = new Date(currentYearReset, quarterStartMonth, 1);
        const quarterEndDate = endOfQuarter(quarterStartDate);
        resetPeriodValue = {
          from: quarterStartDate,
          to: quarterEndDate,
        };
        break;
      }
      case 'yearly':
        resetPeriodValue = {
          from: new Date(currentYearReset, 0, 1),
          to: new Date(currentYearReset, 11, 31),
        };
        break;
      default:
        resetPeriodValue = { from: today, to: today };
    }

    onApply({
      type: view,
      value: resetPeriodValue,
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
    view,
  ]);

  return {
    handleApply,
    handleReset,
  };
}

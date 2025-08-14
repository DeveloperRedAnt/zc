'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/button/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/popover';
import { cn } from '@/libs/utils';
import { PeriodType } from './types-datepircker-popup';

import { getQuarter } from 'date-fns';
import { ActionButtons } from './common/action-buttons';
import { PeriodSelector } from './common/period-selector';
import { DisplayValue } from './display-value';
import { useDateRangeEffects, useDateRangeLogic, useDateRangeState } from './hooks';
import { DateRangePickerProps } from './types-datepircker-popup';
import { DailyView, MonthlyView, QuarterlyView, WeeklyView, YearlyView } from './views';

export function DateRangePicker({
  className,
  onApply,
  initialPeriod,
  allowedViews = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
  defaultView = 'daily',
}: DateRangePickerProps & {
  hideSidebar?: boolean;
}) {
  const [view, setView] = React.useState<PeriodType>(initialPeriod?.type || defaultView);

  const [state, actions] = useDateRangeState({
    initialPeriod,
  });

  const { handleApply, handleReset } = useDateRangeLogic({
    state,
    actions,
    view,
    onApply,
  });

  // Sync state from external initialPeriod (e.g., from nuqs/query params)
  React.useEffect(() => {
    if (!initialPeriod) return;
    // Do not override the currently selected view when initialPeriod changes.
    // We still sync the underlying ranges so external changes reflect in the picker state.
    const val = initialPeriod.value as { from?: Date; to?: Date };
    if (!val) return;

    switch (initialPeriod.type) {
      case 'daily':
        if (val.from && val.to) {
          actions.setDailyRange({ from: val.from, to: val.to });
        }
        actions.setSingleBorderedDate(val.from ?? undefined);
        break;
      case 'weekly':
        if (val.from && val.to) {
          actions.setWeeklyRange({ from: val.from, to: val.to });
        }
        break;
      case 'monthly':
        if (val.from && val.to) {
          actions.setMonthlyRange({ from: val.from, to: val.to });
        }
        break;
      case 'quarterly': {
        // Convert dates to quarter objects for internal state
        const fromQ = val.from ? getQuarter(val.from) : undefined;
        const fromY = val.from ? val.from.getFullYear() : undefined;
        const toQ = val.to ? getQuarter(val.to) : undefined;
        const toY = val.to ? val.to.getFullYear() : undefined;
        actions.setQuarterlyRange({
          from: fromQ && fromY ? { quarter: fromQ, year: fromY } : undefined,
          to: toQ && toY ? { quarter: toQ, year: toY } : undefined,
        });
        actions.setCurrentYearNav(fromY ?? new Date().getFullYear());
        break;
      }
      case 'yearly':
        actions.setYearlyRange({
          from: val.from ? val.from.getFullYear() : undefined,
          to: val.to ? val.to.getFullYear() : undefined,
        });
        actions.setCurrentYearNav(val.from ? val.from.getFullYear() : new Date().getFullYear());
        break;
      default:
        break;
    }
  }, [initialPeriod, actions]);

  useDateRangeEffects({
    view,
    state,
    actions,
  });

  const renderView = () => {
    const viewProps = { state, actions };

    switch (view) {
      case 'daily':
        return <DailyView {...viewProps} />;
      case 'weekly':
        return <WeeklyView {...viewProps} />;
      case 'monthly':
        return <MonthlyView {...viewProps} />;
      case 'quarterly':
        return <QuarterlyView {...viewProps} />;
      case 'yearly':
        return <YearlyView {...viewProps} />;
      default:
        return <DailyView {...viewProps} />;
    }
  };

  // Tentukan apakah sidebar perlu di-hide
  const shouldHideSidebar = allowedViews && allowedViews.length === 1;

  // Add state for controlling the popover open state
  const [open, setOpen] = React.useState(false);

  // Modified handleApply to prevent auto-closing the popover
  const handleApplyClick = () => {
    handleApply();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'w-[400px] justify-start text-left font-normal',
            'truncate',
            !state.dailyRange && 'text-muted-foreground',
            className
          )}
          title={undefined}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="truncate">
            <DisplayValue
              view={view}
              dailyRange={state.dailyRange}
              weeklyRange={state.weeklyRange}
              monthlyRange={state.monthlyRange}
              quarterlyRange={state.quarterlyRange}
              yearlyRange={state.yearlyRange}
            />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 flex bg-white shadow-lg border border-gray-200 rounded-lg"
        align="start"
      >
        <PeriodSelector
          view={view}
          onViewChange={setView}
          allowedViews={allowedViews}
          style={shouldHideSidebar ? { display: 'none' } : undefined}
        />
        <div className="flex flex-col bg-white">
          <div className="p-4">{renderView()}</div>
          <ActionButtons onReset={handleReset} onApply={handleApplyClick} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

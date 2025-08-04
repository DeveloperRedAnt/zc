import React from 'react';
import { DateRangePicker } from './date-ranger-picker';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
};

export const Default = () => (
  <DateRangePicker
    defaultDailyRange={{
      from: new Date(2025, 6, 1),
      to: new Date(2025, 6, 7),
    }}
    defaultSingleBorderedDate={new Date(2025, 6, 1)}
    onApply={(_range) => {}}
  />
);

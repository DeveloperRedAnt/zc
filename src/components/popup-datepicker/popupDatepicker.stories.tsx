import React from 'react';
import { DateRangePicker } from './date-ranger-picker';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
};

export const Default = () => (
  <DateRangePicker
    initialPeriod={{
      type: 'daily',
      value: {
        from: new Date(2025, 6, 1),
        to: new Date(2025, 6, 7),
      },
    }}
    onApply={(_range) => {}}
  />
);

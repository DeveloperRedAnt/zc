import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Basic Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`DatePicker\` component provides a user-friendly interface for selecting dates. It supports labels, placeholders, and controlled value management. You can customize the label, set a placeholder, and handle date changes via the \`onChange\` callback. The component is suitable for forms and date input scenarios, and supports all standard input props.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    return (
      <div className="w-[300px]">
        <DatePicker
          mode="single"
          label="Tanggal Dipilih"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date as Date | undefined)}
        />
      </div>
    );
  },
};

type Range = { from: Date; to?: Date };

export const DateRange: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<Range | undefined>(undefined);

    return (
      <div className="w-[300px]">
        <DatePicker
          mode="range"
          label="Range Tanggal"
          value={selectedRange}
          onChange={(range) => setSelectedRange(range as Range | undefined)}
        />
      </div>
    );
  },
};

export const PreselectedDate: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    return (
      <div className="w-[300px]">
        <DatePicker
          mode="single"
          label="Tanggal Awal"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date as Date | undefined)}
        />
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    return (
      <div className="w-[300px]">
        <DatePicker
          mode="single"
          label=""
          placeholder="Pilih tanggal..."
          value={selectedDate}
          onChange={(date) => setSelectedDate(date as Date | undefined)}
        />
      </div>
    );
  },
};

export const Mandatory: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    return (
      <div className="w-[300px]">
        <DatePicker
          mode="single"
          label="Tanggal Wajib"
          placeholder="Pilih tanggal..."
          mandatory="true"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date as Date | undefined)}
        />
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import RowsPerPage from './rows-per-page';

const meta: Meta<typeof RowsPerPage> = {
  title: 'Basic Components/RowsPerPage',
  component: RowsPerPage,
  tags: ['autodocs'],
  argTypes: {
    pageSizeOptions: {
      description: 'Options for the number of rows per page that can be selected.',
      defaultValue: [10, 25, 50, 100],
    },
    value: {
      description: 'Current value (number of rows selected).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '25' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Called when the number of rows changes.',
    },
    className: {
      description: 'Additional CSS class for styling.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RowsPerPage>;

export const ControlledValue: Story = {
  args: {
    pageSizeOptions: [10, 25, 50, 100],
    value: 25,
    className: '',
  },
  render: (args) => {
    return (
      <div className="flex items-center space-x-2 h-10">
        <p className="text-sm text-gray-700 whitespace-nowrap">Rows per page</p>
        <RowsPerPage
          {...args}
          value={args.value}
          onChange={args.onChange}
          className={`min-w-[80px] ${args.className}`}
        />
      </div>
    );
  },
};

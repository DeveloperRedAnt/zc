import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './number-stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Basic Components/Stepper',
  component: Stepper,
  args: {
    value: 0,
    min: 0,
    max: undefined,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  render: () => <Stepper label="Required" required />,
  parameters: {
    docs: {
      description: {
        story: 'Number Stepper field with a required indicator.',
      },
    },
  },
};

export const Readonly: Story = {
  render: () => <Stepper label="Readonly" readOnly />,
  parameters: {
    docs: {
      description: {
        story: 'Number Stepper field with a readonly indicator.',
      },
    },
  },
};

export const MinMax: Story = {
  render: () => <Stepper label="Min/Max" value={5} min={1} />,
  parameters: {
    docs: {
      description: {
        story: 'Number Stepper field with min and max values set.',
      },
    },
  },
};

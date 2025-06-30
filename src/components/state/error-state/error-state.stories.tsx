import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ErrorState } from './error-state';

const meta: Meta<typeof ErrorState> = {
  title: 'State/ErrorState',
  component: ErrorState,
};
export default meta;

type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  render: () => <ErrorState error={new Error('Test error')} />,
};

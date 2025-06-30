import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmptyState } from './empty-state';

const meta: Meta<typeof EmptyState> = {
  title: 'State/EmptyState',
  component: EmptyState,
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Unauthorized: Story = {
  render: () => (
    <div>
      <EmptyState>
        <EmptyState variant="unauthorized" onActionClick={() => {}} />
      </EmptyState>
    </div>
  ),
};

export const Incomplete: Story = {
  render: () => (
    <EmptyState>
      <EmptyState variant="incomplete" onActionClick={() => {}} />
    </EmptyState>
  ),
};

export const NotFound: Story = {
  render: () => (
    <EmptyState>
      <EmptyState variant="notFound" onActionClick={() => {}} />
    </EmptyState>
  ),
};

export const SystemProblem: Story = {
  render: () => (
    <EmptyState>
      <EmptyState variant="systemProblem" onActionClick={() => {}} />
    </EmptyState>
  ),
};

export const BadGateway: Story = {
  render: () => (
    <EmptyState>
      <EmptyState variant="badGateway" onActionClick={() => {}} />
    </EmptyState>
  ),
};

export const UnderMaintenance: Story = {
  render: () => (
    <EmptyState>
      <EmptyState variant="underMaintenance" onActionClick={() => {}} />
    </EmptyState>
  ),
};

export const GatewayTimeout: Story = {
  render: () => (
    <EmptyState>
      <EmptyState variant="gatewayTimeout" onActionClick={() => {}} />
    </EmptyState>
  ),
};

export const IncorrectAccess: Story = {
  render: () => (
    <EmptyState>
      <EmptyState variant="incorrectAccess" onActionClick={() => {}} />
    </EmptyState>
  ),
};

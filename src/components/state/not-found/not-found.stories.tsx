import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import NotFound from './not-found';

const meta: Meta<typeof NotFound> = {
  title: 'State/NotFound',
  component: NotFound,
};
export default meta;

type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
  render: () => (
    <NotFound statusCode={404} title="Tidak Ditemukan" description="Halaman tidak ditemukan." />
  ),
};

export const Custom: Story = {
  render: () => (
    <NotFound
      statusCode={403}
      title="Akses Ditolak"
      description="Anda tidak memiliki akses ke halaman ini."
    />
  ),
};

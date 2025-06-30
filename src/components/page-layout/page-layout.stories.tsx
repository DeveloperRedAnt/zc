import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { PageLayout } from './page-layout';

const meta: Meta<typeof PageLayout> = {
  title: 'Basic Components/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {
    title: 'Layout Halaman',
    description: 'Deskripsi singkat tentang halaman ini.',
    requiredText: 'Form bertanda (*) harus diisi',
    button: <Button variant="default">Tambah</Button>,
    children: <p>Ini adalah isi dari halaman.</p>,
    className: 'w-[80vw]',
  },
};

export const withoutButton: Story = {
  args: {
    title: 'Layout Halaman Tanpa Tombol',
    description: 'Deskripsi singkat tentang halaman ini.',
    children: <p>Ini adalah isi dari halaman.</p>,
    className: 'w-[80vw]',
  },
};

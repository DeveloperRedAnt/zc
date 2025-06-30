import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Toaster, toast } from './toast';

const meta: Meta = {
  title: 'Basic Components/Toast',
  component: Toaster,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => {
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
          });
        }}
      >
        Show Toast
      </Button>
    </>
  ),
};

export const ToastShowcase: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => {
            toast.success('Successfully saved!', {
              description: 'Your changes have been saved.',
              className: 'bg-[#16a34a]',
            });
          }}
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.info('Informasi penting!', {
              description: 'Ini adalah pesan info.',
            });
          }}
        >
          Info Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.error('Gagal!', {
              description: 'Terjadi kesalahan.',
            });
          }}
        >
          Error Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.warning('Perhatian!', {
              description: 'Ini adalah pesan perhatian.',
            });
          }}
        >
          Warning Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.error('Gagal!', {
              description: 'Terjadi kesalahan.',
            });
          }}
        >
          Error Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: 'Loading...',
              success: 'Successfully loaded',
              error: 'Error loading data',
            });
          }}
        >
          Promise Toast
        </Button>
      </div>
    </>
  ),
};

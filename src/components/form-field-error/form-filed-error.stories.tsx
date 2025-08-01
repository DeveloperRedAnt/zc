import type { Meta, StoryObj } from '@storybook/react';
import FormFieldError from './form-field-error';

const meta: Meta<typeof FormFieldError> = {
  title: 'Basic Components/FormFieldError',
  component: FormFieldError,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <FormFieldError message="Email atau password salah" />;
  },
};

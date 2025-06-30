import type { Meta, StoryObj } from '@storybook/react';
import DOMPurify from 'dompurify';
import { InformationText } from './information-text';

const meta: Meta<typeof InformationText> = {
  title: 'Basic Components/InformationText',
  component: InformationText,
  argTypes: {
    text: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InformationText>;

export const Default: Story = {
  args: {
    text: 'Ini adalah text Informasi',
  },
};

export const SanitizedHtml: Story = {
  args: {
    text: DOMPurify.sanitize('<strong>Hello</strong> <em>Everybody</em>'),
  },
};

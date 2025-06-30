import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Step } from '../multi-step-wizard';
import WizardContainer from '../wizard-container';

const steps: Step[] = [
  { id: 1, title: 'Step 1', content: <div>Konten Langkah 1</div> },
  { id: 2, title: 'Step 2', content: <div>Konten Langkah 2</div> },
  { id: 3, title: 'Step 3', content: <div>Konten Langkah 3</div> },
];

const meta: Meta<typeof WizardContainer> = {
  title: 'Basic Components/WizardContainer',
  component: WizardContainer,
};

export default meta;

type Story = StoryObj<typeof WizardContainer>;

export const Default: Story = {
  render: () => <WizardContainer steps={steps} />,
};

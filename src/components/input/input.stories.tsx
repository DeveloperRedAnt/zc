import CustomInput from '@/components/input/custom-input';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import InputFile from './input-file';

const meta: Meta<typeof Input> = {
  title: 'Basic Components/Input',
  component: Input,
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        component: `
                  The \`CustomInput\` component is a flexible input field that supports labels, required indicators, currency prefix, and icons.

                  - Use \`currency\` to show a currency prefix.
                  - Use \`icon\` to display an icon from @icon-park/react.
                  - Supports all standard input props.
              `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const WithCopyButton: Story = {
  args: {
    value: 'Text to copy',
    showCopyButton: true,
  },
};

export const WithExternalCopyButton: Story = {
  args: {
    value: 'Text to copy',
    showExternalCopyButton: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DefaultCustom: Story = {
  render: () => <CustomInput label="Default" placeholder="Type here..." />,
  parameters: {
    docs: {
      description: {
        story: 'A basic text field with a label.',
      },
    },
  },
};

export const NoTitle: Story = {
  render: () => <CustomInput label="" placeholder="Type here..." />,
  parameters: {
    docs: {
      description: {
        story: 'A basic text field with a label.',
      },
    },
  },
};

export const Currency: Story = {
  render: () => (
    <CustomInput label="Amount" inputNumber prependText="Rp" placeholder="Enter amount" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text field with a currency prefix.',
      },
    },
  },
};

export const Required: Story = {
  render: () => <CustomInput label="Required Field" required placeholder="Required input" />,
  parameters: {
    docs: {
      description: {
        story: 'Text field with a required indicator.',
      },
    },
  },
};

export const CustomInputDisabled: Story = {
  render: () => <CustomInput label="Disabled Field" disabled placeholder="You cannot type here" />,
  parameters: {
    docs: {
      description: {
        story: 'A disabled input field that is not editable.',
      },
    },
  },
};

export const InputFileWithPreview: Story = {
  render: () => (
    <InputFile
      label="Unggah Thumbnail"
      accept="image/png, image/jpeg, image/jpg"
      fileInfoExtension=".jpg, .jpeg, .png"
      maxSize={2 * 1024 * 1024}
    />
  ),
};

export const WithPrependIcon: Story = {
  render: () => <CustomInput label="Search" prependIcon="Search" placeholder="Search..." />,
  parameters: {
    docs: {
      description: {
        story: 'Text field with an icon from @icon-park/react.',
      },
    },
  },
};

export const WithAppendIcon: Story = {
  render: () => <CustomInput appendIcon="Check" placeholder="Enter text . . ." />,
};

export const WithAppendText: Story = {
  render: () => <CustomInput appendText="Day" placeholder="Enter text . . ." />,
};

export const NumberInput: Story = {
  render: () => <CustomInput inputNumber placeholder="Enter number . . ." />,
};

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Dropdown from './dropdown';
import type { OptionType } from './dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Basic Components/Dropdown',
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const options: OptionType[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];

    const [selected, setSelected] = useState<OptionType | null>(null);

    return (
      <Dropdown
        label="Select Number"
        options={options}
        id={'single-select'}
        name={'single-select'}
        value={selected}
        onChange={setSelected}
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const options: OptionType[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ];

    const [selected, setSelected] = useState<OptionType[]>([]);

    return <Dropdown label="" options={options} isMulti value={selected} onChange={setSelected} />;
  },
};

export const SearchableFalse: Story = {
  render: () => {
    const options: OptionType[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];

    const [selected, setSelected] = useState<OptionType | null>(null);

    return (
      <Dropdown
        label=""
        options={options}
        isSearchable={false}
        value={selected}
        onChange={setSelected}
      />
    );
  },
};

export const Clearable: Story = {
  render: () => {
    const options: OptionType[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];

    const [selected, setSelected] = useState<OptionType | null>(null);

    return (
      <Dropdown
        label=""
        options={options}
        isClearable={true}
        value={selected}
        onChange={setSelected}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const options: OptionType[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];

    const [selected, setSelected] = useState<OptionType | null>(null);

    return (
      <Dropdown
        label=""
        options={options}
        isDisabled={true}
        value={selected}
        onChange={setSelected}
      />
    );
  },
};

export const WithLoading: Story = {
  render: () => {
    const options: OptionType[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];

    const [selected, setSelected] = useState<OptionType | null>(null);

    return (
      <Dropdown
        label=""
        options={options}
        isLoading={true}
        value={selected}
        onChange={setSelected}
      />
    );
  },
};

export const DefaultValue: Story = {
  render: () => {
    const options: OptionType[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];

    const [selected, setSelected] = useState<OptionType | null>(options[1] ?? null);

    return <Dropdown label="" options={options} value={selected} onChange={setSelected} />;
  },
};

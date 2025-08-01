import SelectPaginationSearch from '@/components/select-pagination-search/select-pagination-search';
import { Meta, StoryObj } from '@storybook/react';
import { LoadOptions } from 'react-select-async-paginate';

type OptionType = {
  id: string | number;
  name: string;
};

type Additional = { page: number };

const allOptions: OptionType[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
}));

const PAGE_SIZE = 5;

const loadOptions: LoadOptions<OptionType, never, Additional> = async (
  inputValue,
  _,
  additional
) => {
  const filtered = allOptions.filter((opt) =>
    opt.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const page = additional?.page ?? 1;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginated = filtered.slice(start, end);
  const hasMore = end < filtered.length;

  return {
    options: paginated,
    hasMore,
    additional: { page: page + 1 },
  };
};

const meta: Meta<typeof SelectPaginationSearch> = {
  title: 'Basic Components/SelectPaginationSearch',
  component: SelectPaginationSearch,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
};

export default meta;

export const Paginated: StoryObj<typeof SelectPaginationSearch> = {
  args: {
    loadOptions,
    placeholder: 'Search for a product...',
    styles: {
      control: (provided) => ({
        ...provided,
        border: '1',
        boxShadow: 'none',
        backgroundColor: '#fff',
      }),
      menu: (provided) => ({
        ...provided,
        maxHeight: 300,
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
    },
  },
  render: (args) => (
    <div className="min-h-[300px] flex items-center justify-center  p-8">
      <div className="w-[320px]">
        <SelectPaginationSearch {...args} />
      </div>
    </div>
  ),
};

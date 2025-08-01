import React, { useState } from 'react';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

type OptionType = {
  id: string | number;
  name: string;
};

type Additional = { page: number };

import { StylesConfig } from 'react-select';

interface SelectPaginationSearchProps {
  loadOptions: LoadOptions<OptionType, never, Additional>;
  placeholder?: string;
  styles?: StylesConfig<OptionType, false, never>;
}

const SelectPaginationSearch: React.FC<SelectPaginationSearchProps> = ({
  loadOptions,
  placeholder = 'Select...',
  styles,
}) => {
  const [value, setValue] = useState<OptionType | null>(null);

  return (
    <AsyncPaginate<OptionType, never, Additional>
      value={value}
      loadOptions={loadOptions}
      onChange={setValue}
      getOptionValue={(option: OptionType) => String(option.id)}
      getOptionLabel={(option: OptionType) => option.name}
      additional={{ page: 1 }}
      isSearchable={true}
      placeholder={placeholder}
      debounceTimeout={500}
      styles={styles}
    />
  );
};

export default SelectPaginationSearch;

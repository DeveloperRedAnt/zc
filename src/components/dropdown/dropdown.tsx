import React from 'react';
import Select, {
  ActionMeta,
  Props as ReactSelectProps,
  SingleValue,
  MultiValue,
} from 'react-select';

export type OptionType = {
  label: string;
  value: string | number;
};

type DropdownProps<Multi extends boolean> = {
  id?: string;
  name?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  options: OptionType[];
  isMulti?: Multi;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  value: Multi extends true ? OptionType[] : OptionType | null;
  required?: boolean;
  onChange: (value: Multi extends true ? OptionType[] : OptionType | null) => void;
} & Omit<ReactSelectProps<OptionType, Multi>, 'value' | 'onChange' | 'isMulti' | 'options'>;

function Dropdown<Multi extends boolean = false>({
  id,
  name,
  className,
  label,
  placeholder = 'Choose...',
  options,
  value,
  onChange,
  isMulti,
  isSearchable,
  isDisabled,
  isLoading,
  isClearable,
  required = false,
  ...rest
}: DropdownProps<Multi>) {
  const handleChange = (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>,
    _actionMeta: ActionMeta<OptionType>
  ) => {
    const castValue = newValue as DropdownProps<Multi>['value'];
    onChange(castValue);
  };

  return (
    <div className="mb-2">
      {label && (
        <label className="block mb-1 text-sm font-medium text-[#555555]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        inputId={id}
        name={name}
        options={options}
        value={value}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        onChange={handleChange}
        placeholder={placeholder}
        classNamePrefix="react-select"
        components={{
          IndicatorSeparator: () => null,
        }}
        classNames={{
          control: ({ isFocused }) =>
            `${className} border px-2 !h-[38px] ${
              isFocused ? 'border-zycas-primary ring-1 ring-zycas-primary' : 'border-gray-300'
            } inline-block !rounded-[8px] !text-[#555555] !text-[0.8rem]`,
          menu: () => 'z-50 text-[0.8rem] text-[#555555]',
        }}
        styles={{
          container: (base) => ({
            ...base,
            borderRadius: '8px !important',
            color: '#555555 !important',
          }),
          control: (base) => ({
            ...base,
            minWidth: 200,
            color: '#555555 !important',
          }),
          multiValue: (styles, _) => {
            return {
              ...styles,
              backgroundColor: '#ffffff',
              border: '1px solid #C2C7D0',
              borderRadius: '4px',
            };
          },
          multiValueLabel: (styles, _) => ({
            ...styles,
            color: '#555555',
          }),
          multiValueRemove: (styles, _) => ({
            ...styles,
            color: '#555555',
            ':hover': {
              backgroundColor: '#eee',
              color: '#000',
            },
          }),
        }}
        {...rest}
      />
    </div>
  );
}

export default Dropdown;

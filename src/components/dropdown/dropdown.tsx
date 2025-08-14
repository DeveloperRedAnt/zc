'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

// Definisikan tipe dasar yang digunakan
export type OptionType = {
  label: string;
  value: string | number;
};

// Import react-select secara dinamis hanya di client side
const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <div className="h-[38px] border border-gray-300 rounded-[8px] px-2" />,
});

// Import react-select/creatable untuk fitur menambah opsi baru
const CreatableSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false,
  loading: () => <div className="h-[38px] border border-gray-300 rounded-[8px] px-2" />,
});

// Props untuk Dropdown component dengan generic untuk isMulti
type DropdownProps<Multi extends boolean = false> = {
  id?: string;
  name?: string;
  className?: string;
  classDiv?: string;
  label?: string;
  placeholder?: string;
  options: OptionType[];
  isMulti?: Multi;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isCreatable?: boolean; // Fitur untuk menambah opsi baru
  value: Multi extends true ? OptionType[] : OptionType | null;
  required?: boolean;
  onChange: (value: Multi extends true ? OptionType[] : OptionType | null) => void;
  onCreateOption?: (inputValue: string) => void; // Callback saat opsi baru dibuat
  // Kita tidak menggunakan Omit<ReactSelectProps> karena dynamic import
};

function Dropdown<Multi extends boolean = false>({
  id,
  name,
  className = '',
  classDiv = 'mb-4',
  label,
  placeholder = 'Choose...',
  options = [],
  isMulti,
  isSearchable = true,
  isDisabled,
  isLoading,
  isClearable = false,
  isCreatable = false,
  value,
  required = false,
  onChange,
  onCreateOption,
  ...rest
}: DropdownProps<Multi>): React.ReactElement | null {
  // Untuk mengatasi hydration error, pastikan komponen mount hanya di client side
  const [isMounted, setIsMounted] = useState(false);
  const [stableId] = useState(
    () => `dropdown-${name || Math.random().toString(36).substring(2, 9)}`
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Gunakan ID stabil untuk menghindari perbedaan server-client
  const inputId = id || stableId;
  const instanceId = `instance-${inputId}`;

  // Handler untuk onChange yang compatible dengan dynamic import
  const handleChange = (newValue: unknown): void => {
    onChange(newValue as Multi extends true ? OptionType[] : OptionType | null);
  };

  // Handler untuk membuat opsi baru
  const handleCreateOption = (inputValue: string): void => {
    if (onCreateOption) {
      onCreateOption(inputValue);
    }
  };

  // Pilih komponen yang tepat berdasarkan isCreatable
  const SelectComponent = isCreatable ? CreatableSelect : Select;

  // Tampilkan skeleton loader saat pertama kali mount
  if (!isMounted) {
    return (
      <div className={classDiv}>
        {label && (
          <label htmlFor={inputId} className="block mb-1 text-sm font-medium">
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <div className="h-[38px] border border-gray-300 rounded-[8px] px-2" />
      </div>
    );
  }

  // Hanya render Select setelah component mount di client-side
  return (
    <div className={`${classDiv} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <SelectComponent
        {...rest}
        instanceId={instanceId}
        inputId={inputId}
        name={name}
        value={value}
        options={options}
        isMulti={isMulti}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        onChange={handleChange}
        onCreateOption={isCreatable ? handleCreateOption : undefined}
        formatCreateLabel={(inputValue: string) => `Tambah "${inputValue}"`}
        classNamePrefix="react-select"
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          container: (base) => ({
            ...base,
            width: '100%',
            fontSize: '14px',
          }),
          control: (base, state) => ({
            ...base,
            minHeight: '38px',
            height: '38px',
            backgroundColor: 'white',
            borderRadius: '8px',
            // @ts-ignore - state mungkin tidak sesuai tipe secara tepat tapi aman digunakan
            borderColor: state?.isFocused ? 'var(--color-zycas-primary)' : 'var(--color-gray-300)',
            // @ts-ignore - state mungkin tidak sesuai tipe secara tepat tapi aman digunakan
            boxShadow: state?.isFocused ? '0 0 0 1px var(--color-zycas-primary)' : 'none',
            '&:hover': {
              // @ts-ignore - state mungkin tidak sesuai tipe secara tepat tapi aman digunakan
              borderColor: state?.isFocused
                ? 'var(--color-zycas-primary)'
                : 'var(--color-gray-300)',
            },
            fontSize: '14px',
          }),
          valueContainer: (base) => ({
            ...base,
            padding: '0 8px',
            marginTop: '-2px',
            fontSize: '14px',
          }),
          input: (base) => ({
            ...base,
            margin: '0px',
            color: 'black',
            fontSize: '14px',
          }),
          indicatorsContainer: (base) => ({
            ...base,
            height: '38px',
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: '0 8px',
          }),
          menu: (base) => ({
            ...base,
            fontSize: '14px',
            zIndex: 50,
          }),
          option: (base) => ({
            ...base,
            fontSize: '14px',
            padding: '8px 12px',
          }),
          singleValue: (base) => ({
            ...base,
            fontSize: '14px',
          }),
          multiValue: (base) => ({
            ...base,
            fontSize: '14px',
          }),
          multiValueLabel: (base) => ({
            ...base,
            fontSize: '14px',
          }),
        }}
      />
    </div>
  );
}

// Export dengan tipe generic
export default Dropdown;

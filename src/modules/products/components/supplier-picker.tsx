'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

export interface ActualSupplier {
  id: number;
  name: string;
  pic: string;
  phone: string;
  created_at: string;
}

export type SupplierOptionType = {
  value: number;
  label: string;
  data: ActualSupplier;
};

interface SupplierPickerProps {
  value?: SupplierOptionType | null;
  onChange?: (option: SupplierOptionType | null) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  loadOptions: LoadOptions<SupplierOptionType, never, { page?: number }>;
  isLoading?: boolean;
  isClearable?: boolean;
}

const SupplierPicker = memo(function SupplierPicker({
  value,
  onChange,
  placeholder = '',
  className = '',
  label,
  required = false,
  loadOptions,
  isLoading,
  isClearable = false,
}: SupplierPickerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = useCallback(
    (option: SupplierOptionType | null) => {
      if (onChange) onChange(option);
    },
    [onChange]
  );

  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <AsyncPaginate
        defaultOptions
        value={isClient ? value : null}
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder={placeholder}
        isLoading={isLoading}
        isClearable={isClearable}
        className="w-full"
        styles={{
          container: (base) => ({
            ...base,
            width: '100%',
            fontSize: '16px',
          }),
          control: (base, state) => ({
            ...base,
            minHeight: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: state.isFocused ? '#5B6B7A' : '#C2C7D0',
            boxShadow: 'none',
            fontSize: '16px',
            transition: 'border-color 0.2s',
          }),
          valueContainer: (base) => ({
            ...base,
            minHeight: '40px',
            height: '40px',
            padding: '0 12px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
          }),
          input: (base) => ({
            ...base,
            margin: '0px',
            color: '#222',
            fontSize: '16px',
          }),
          indicatorsContainer: (base) => ({
            ...base,
            height: '40px',
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: '0 8px',
            color: '#5B6B7A',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          menu: (base) => ({
            ...base,
            fontSize: '16px',
            zIndex: 50,
          }),
          option: (base) => ({
            ...base,
            fontSize: '16px',
            padding: '8px 12px',
          }),
          singleValue: (base) => ({
            ...base,
            fontSize: '16px',
            color: '#222',
          }),
          placeholder: (base) => ({
            ...base,
            color: '#A0AEC0',
            fontSize: '16px',
          }),
        }}
      />
    </div>
  );
});

export default SupplierPicker;

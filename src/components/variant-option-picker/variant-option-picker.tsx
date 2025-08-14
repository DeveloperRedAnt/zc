'use client';

import CustomInput from '@/components/input/custom-input';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import React, { useState } from 'react';

interface VariantOption {
  id: string;
  value: string;
  label: string;
}

interface VariantOptionPickerProps {
  title?: string;
  options: VariantOption[];
  selectedValue?: string;
  customValue?: string;
  placeholder?: string;
  onChange?: (selectedValue: string, customValue?: string) => void;
}

export default function VariantOptionPicker({
  title = 'Pilih Opsi',
  options,
  selectedValue = '',
  customValue = '',
  placeholder = 'cth: Coklat',
  onChange,
}: VariantOptionPickerProps) {
  const [internalSelectedValue, setInternalSelectedValue] = useState(selectedValue);
  const [internalCustomValue, setInternalCustomValue] = useState(customValue);

  const handleOptionChange = (value: string) => {
    setInternalSelectedValue(value);
    onChange?.(value, internalCustomValue);
  };

  const handleCustomValueChange = (value: string) => {
    setInternalCustomValue(value);
    onChange?.(internalSelectedValue, value);
  };

  return (
    <div>
      <h4 className="text-base font-medium text-gray-800 mb-4">
        {title} <span className="text-red-500">*</span>
      </h4>

      <RadioGroup
        value={internalSelectedValue}
        onValueChange={handleOptionChange}
        className="space-y-4"
      >
        {/* Grid layout for predefined options */}
        <div className="grid grid-cols-5 gap-4 gap-y-3">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.id} className="text-blue-500" />
              <label htmlFor={option.id} className="text-sm text-gray-700 cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>

        {/* Custom option with input */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom-option" className="text-blue-500" />
            <label htmlFor="custom-option" className="text-sm font-medium text-gray-800">
              Opsi Baru
            </label>
          </div>

          <div className="ml-6">
            <CustomInput
              placeholder={placeholder}
              value={internalCustomValue}
              onChange={(e) => handleCustomValueChange(e.target.value)}
              className="border-gray-300"
              style={{ minWidth: '482px' }}
            />
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}

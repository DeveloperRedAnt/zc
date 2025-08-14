'use client';

import CustomInput from '@/components/input/custom-input';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import React, { useState } from 'react';

interface VariantOption {
  id: string;
  value: string;
  label: string;
}

interface Variant {
  id: number;
  name: string;
  title: string;
  options: VariantOption[];
  selectedValue?: string;
  customValue?: string;
}

interface VariantSelectorProps {
  variants: Variant[];
  onChange?: (variantId: number, selectedValue: string, customValue?: string) => void;
}

export default function VariantSelector({ variants, onChange }: VariantSelectorProps) {
  const [variantStates, setVariantStates] = useState<
    Record<number, { selectedValue: string; customValue: string }>
  >({});

  const handleOptionChange = (variantId: number, value: string) => {
    setVariantStates((prev) => ({
      ...prev,
      [variantId]: {
        // Ensure customValue is always a string, defaulting to empty string if not set
        selectedValue: value,
        customValue: prev[variantId]?.customValue || '',
      },
    }));

    const currentState = variantStates[variantId];
    onChange?.(variantId, value, currentState?.customValue);
  };

  const handleCustomValueChange = (variantId: number, value: string) => {
    setVariantStates((prev) => ({
      ...prev,
      [variantId]: {
        // Ensure selectedValue is always a string, defaulting to empty string if not set
        selectedValue: prev[variantId]?.selectedValue || '',
        customValue: value,
      },
    }));

    const currentState = variantStates[variantId];
    onChange?.(variantId, currentState?.selectedValue || '', value);
  };

  return (
    <div className="space-y-12 p-5">
      {variants.map((variant) => {
        const currentState = variantStates[variant.id] || {
          selectedValue: variant.selectedValue || '',
          customValue: variant.customValue || '',
        };

        return (
          <div key={variant.id} className="space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-2">Varian {variant.id}:</h3>
              <p className="text-gray-600 text-sm">{variant.title}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-4">
                Pilih Opsi <span className="text-red-500">*</span>
              </h4>

              <RadioGroup
                value={currentState.selectedValue}
                onValueChange={(value) => handleOptionChange(variant.id, value)}
                className="space-y-4"
              >
                {/* Grid layout for options */}
                <div className="grid grid-cols-5 gap-4">
                  {variant.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.value}
                        id={`${variant.id}-${option.id}`}
                        className="text-blue-500"
                      />
                      <label
                        htmlFor={`${variant.id}-${option.id}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Custom option with input */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="custom"
                      id={`${variant.id}-custom`}
                      className="text-blue-500"
                    />
                    <label
                      htmlFor={`${variant.id}-custom`}
                      className="text-sm font-medium text-gray-800"
                    >
                      Opsi Baru
                    </label>
                  </div>
                  <div className="ml-6">
                    <CustomInput
                      placeholder="cth: Coklat"
                      value={currentState.customValue}
                      onChange={(e) => handleCustomValueChange(variant.id, e.target.value)}
                      className="max-w-md border-gray-300"
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      })}
    </div>
  );
}

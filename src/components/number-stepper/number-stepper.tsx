'use client';

import { Minus, Plus } from '@icon-park/react';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Button } from '../button/button';
import FormFieldError from '../form-field-error/form-field-error';
import CustomInput from '../input/custom-input';
import { Label } from '../label/label';

interface StepperProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  onChange?: (value: number) => void;
}

export const Stepper = forwardRef<HTMLInputElement, StepperProps>(
  (
    { label, value, min = 0, max = Infinity, readOnly = false, required = false, error, onChange },
    ref
  ) => {
    const isControlled = typeof value === 'number' && typeof onChange === 'function';
    const [internalValue, setInternalValue] = useState<number>(value ?? min);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (isControlled && typeof value === 'number') {
        setInternalValue(value);
      }
    }, [value, isControlled]);

    const currentValue = isControlled ? value! : internalValue;

    const setValue = (newVal: number) => {
      if (newVal < min || newVal > max || Number.isNaN(newVal)) return;
      if (!isControlled) setInternalValue(newVal);
      onChange?.(newVal);
    };

    const decrement = () => {
      setValue(currentValue - 1);
    };

    const increment = () => {
      setValue(currentValue + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = Number(e.target.value);
      if (!Number.isNaN(newValue)) {
        setValue(newValue);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Label className="text-sm font-medium text-[#555555]">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={decrement}
            disabled={currentValue <= min || readOnly}
            aria-label="Decrement"
          >
            <Minus theme="outline" size="16" strokeWidth={3} />
          </Button>

          <CustomInput
            ref={inputRef}
            inputNumber
            readonly={readOnly}
            currency
            value={String(currentValue)}
            className={`text-center h-10 w-14 ${error ? '!border-[#F08181]' : 'border-[#C2C7D0]'}`}
            onChange={handleInputChange}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={increment}
            disabled={currentValue >= max || readOnly}
            aria-label="Increment"
          >
            <Plus theme="outline" size="16" strokeWidth={3} />
          </Button>
        </div>
        {error && <FormFieldError message={error} />}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';

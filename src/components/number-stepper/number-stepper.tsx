import { Minus, Plus } from '@icon-park/react';
import React, { useState, useEffect } from 'react';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Label } from '../label/label';

interface StepperProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (value: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  label,
  value,
  required = false,
  min = 0,
  max = Infinity,
  readOnly,
  onChange,
}) => {
  const isControlled = value !== undefined && typeof onChange === 'function';
  const [internalValue, setInternalValue] = useState<number>(value ?? min);

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  const setValue = (newValue: number) => {
    if (newValue < min || newValue > max || Number.isNaN(newValue)) return;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const currentValue = isControlled ? value! : internalValue;

  const decrement = () => setValue(currentValue - 1);
  const increment = () => setValue(currentValue + 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const newValue = Number(e.target.value);
    if (!Number.isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={currentValue <= min}
          aria-label="Decrement"
        >
          <Minus theme="outline" size="16" strokeWidth={3} />
        </Button>

        <Input
          readOnly={readOnly}
          type="text"
          value={currentValue}
          className="text-center h-10 w-14"
          onChange={handleInputChange}
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={currentValue >= max}
          aria-label="Increment"
        >
          <Plus theme="outline" size="16" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

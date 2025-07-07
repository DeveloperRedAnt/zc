'use client';

import { Input } from '@/components/input/input';
import * as IconPark from '@icon-park/react';
import clsx from 'clsx';
import { forwardRef, useEffect, useState } from 'react';
import { Label } from '../label/label';

type CustomInputProps = {
  label?: string;
  classDiv?: string;
  required?: boolean;
  currency?: boolean;
  inputNumber?: boolean;
  prependText?: string;
  prependIcon?: keyof typeof IconPark;
  appendText?: string;
  appendIcon?: keyof typeof IconPark;
  isWidthFull?: boolean;
  readonly?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const formatNumber = (value: string | number) => {
  const numeric = String(value).replace(/\D/g, '');
  if (!numeric) return '';
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({
  label,
  classDiv,
  required = false,
  currency = false,
  inputNumber = false,
  prependText,
  prependIcon,
  appendText,
  appendIcon,
  className,
  onChange,
  value,
  disabled,
  isWidthFull,
  readonly = false,
  ...props
}, ref) => {
  const [displayValue, setDisplayValue] = useState('');

  const safeValue = Array.isArray(value) ? value[0] ?? '' : value ?? '';

  useEffect(() => {
    if (currency) {
      setDisplayValue(formatNumber(safeValue));
    } else {
      setDisplayValue(String(safeValue));
    }
  }, [safeValue, currency]);

  const PrependIconComponent =
    prependIcon && typeof IconPark[prependIcon] === 'function'
      ? (IconPark[prependIcon] as React.ElementType)
      : null;

  const AppendIconComponent =
    appendIcon && typeof IconPark[appendIcon] === 'function'
      ? (IconPark[appendIcon] as React.ElementType)
      : null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readonly) return;
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
    ];

    if (e.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) return;

    if ((currency || inputNumber) && !allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }

    props.onKeyDown?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readonly) return;
    const inputValue = e.target.value;

    if (currency) {
      const numericValue = inputValue.replace(/\D/g, '');
      setDisplayValue(formatNumber(numericValue));
      onChange?.({ ...e, target: { ...e.target, value: numericValue } });
    } else if (inputNumber) {
      const numericValue = inputValue.replace(/\D/g, '');
      setDisplayValue(numericValue);
      onChange?.({ ...e, target: { ...e.target, value: numericValue } });
    } else {
      setDisplayValue(inputValue);
      onChange?.(e);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (readonly) return;

    if (currency || inputNumber) {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
      const formatted = currency ? formatNumber(pasted) : pasted;
      setDisplayValue(formatted);
      onChange?.({ ...e, target: { ...e.target, value: pasted } } as any);
    }

    props.onPaste?.(e);
  };

  return (
    <div className={clsx('flex flex-col gap-2', classDiv)}>
      {label && (
        <Label className="text-sm font-medium text-[#555555]">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div
        className={clsx(
          appendText ? 'flex items-center space-y-1.5' : 'space-y-1.5',
          (disabled || readonly) && 'opacity-60 cursor-not-allowed'
        )}
      >
        <div className="relative flex items-center">
          {(prependText || PrependIconComponent) && (
            <div className="absolute left-3 text-gray-500 text-sm flex items-center z-10">
              {prependText ? (
                <span className="font-medium">{prependText}</span>
              ) : PrependIconComponent ? (
                <PrependIconComponent theme="outline" size="16" />
              ) : null}
            </div>
          )}

          <Input
            {...Object.fromEntries(Object.entries(props).filter(
              ([key]) => !['onKeyDown', 'onPaste', 'inputMode', 'pattern'].includes(key)
            ))}
            ref={ref}
            className={clsx(
              prependText || PrependIconComponent ? 'pl-10' : '',
              appendText || AppendIconComponent ? 'pr-10' : '',
              className
            )}
            value={displayValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            inputMode={currency || inputNumber ? 'numeric' : props.inputMode}
            disabled={disabled}
            readOnly={readonly}
            isWidthFull={isWidthFull}
          />

          {(appendText || AppendIconComponent) && (
            <div className="absolute right-3 text-gray-500 text-sm flex items-center z-10">
              {appendText ? (
                <span className="font-medium">{appendText}</span>
              ) : AppendIconComponent ? (
                <AppendIconComponent theme="outline" size="16" />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;

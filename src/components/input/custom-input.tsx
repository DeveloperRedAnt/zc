'use client';

import { Input } from '@/components/input/input';
import * as IconPark from '@icon-park/react';
import clsx from 'clsx';
import { FC } from 'react';
import { Label } from '../label/label';

type CustomInputProps = {
  label?: string;
  required?: boolean;
  currency?: boolean;
  inputNumber?: boolean;
  prependText?: string;
  prependIcon?: keyof typeof IconPark;
  appendText?: string;
  appendIcon?: keyof typeof IconPark;
  isWidthFull?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const formatNumber = (value: string) => {
  const numeric = value.replace(/\D/g, '');
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const CustomInput: FC<CustomInputProps> = ({
  label,
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
  ...props
}) => {
  const PrependIconComponent =
    prependIcon && typeof IconPark[prependIcon] === 'function'
      ? (IconPark[prependIcon] as React.ElementType)
      : null;
  const AppendIconComponent =
    appendIcon && typeof IconPark[appendIcon] === 'function'
      ? (IconPark[appendIcon] as React.ElementType)
      : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (inputNumber) {
      val = formatNumber(val);
      onChange?.({
        ...e,
        target: {
          ...e.target,
          value: val.replace(/\./g, ''), // send to backend without dots
        },
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      onChange?.(e);
    }
  };

  const displayValue = inputNumber && typeof value === 'string' ? formatNumber(value) : value;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label className="text-sm font-medium text-[#555555]">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div
        className={clsx(
          appendText ? 'flex items-center space-y-1.5' : 'space-y-1.5',
          disabled && 'opacity-60 cursor-not-allowed'
        )}
      >
        <div className="relative flex items-center">
          {/* Prepend */}
          {(prependText || PrependIconComponent) && (
            <div className="absolute left-3 text-gray-500 text-sm flex items-center">
              {prependText ? (
                <span className="font-medium">{prependText}</span>
              ) : PrependIconComponent ? (
                <PrependIconComponent theme="outline" size="16" />
              ) : null}
            </div>
          )}

          <Input
            {...Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'onCopy'))}
            className={clsx(prependText || PrependIconComponent ? 'pl-10' : '', className)}
            value={displayValue}
            onChange={handleChange}
            inputMode={currency ? 'numeric' : props.inputMode}
            pattern={currency ? '[0-9]*' : props.pattern}
            disabled={disabled}
            isWidthFull={isWidthFull}
          />

          {/* Append */}
          {(appendText || AppendIconComponent) && (
            <div className="absolute right-3 text-gray-500 text-sm flex items-center">
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
};

export default CustomInput;

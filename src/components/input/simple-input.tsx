'use client';

import { Input } from '@/components/input/input';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { Label } from '../label/label';

type InputProps = {
  onCopy?: () => void;
  showCopyButton?: boolean;
  showExternalCopyButton?: boolean;
  isWidthFull?: boolean;
};

type SimpleInputProps = {
  label?: string;
  classDiv?: string;
  required?: boolean;
  readonly?: boolean;
} & InputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputProps>;

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  (
    {
      label,
      classDiv,
      required = false,
      className,
      onChange,
      value,
      disabled,
      isWidthFull,
      readonly = false,
      onCopy,
      showCopyButton,
      showExternalCopyButton,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx('flex flex-col gap-2', classDiv)}>
        {label && (
          <Label className="text-sm font-medium text-[#555555]">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <div className="space-y-1.5">
          <Input
            {...props}
            ref={ref}
            className={className}
            value={value || ''}
            onChange={onChange}
            onCopy={onCopy}
            showCopyButton={showCopyButton}
            showExternalCopyButton={showExternalCopyButton}
            disabled={disabled}
            readOnly={readonly}
            isWidthFull={isWidthFull}
          />
        </div>
      </div>
    );
  }
);

SimpleInput.displayName = 'SimpleInput';

export default SimpleInput;

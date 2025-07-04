import { RefObject } from 'react';

type FieldRef = {
  key: string;
  ref: RefObject<HTMLElement | null>;
  required?: boolean;
  getValue: () => string | null;
};

type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

export function useFormValidator() {
  function validateFields(fields: FieldRef[]): ValidationResult {
    const errors: Record<string, string> = {};
    let firstInvalidRef: HTMLElement | null = null;

    for (const field of fields) {
      const value = field.getValue();
      if (field.required && (!value || value.trim() === '')) {
        errors[field.key] = 'Wajib diisi!';
        if (!firstInvalidRef && field.ref.current) {
          firstInvalidRef = field.ref.current;
        }
      }
    }

    if (firstInvalidRef) {
      setTimeout(() => {
        firstInvalidRef?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidRef?.focus?.();
      }, 10);
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  return { validateFields };
}

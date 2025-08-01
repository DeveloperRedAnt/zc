'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useFormValidationContext } from './form-validation-context';

export function useRegisterField(
  key: string,
  required = true,
  options?: {
    ref?: RefObject<HTMLInputElement | null>;
    getValue?: () => string | null;
  }
) {
  // Ref internal jika user tidak memberikan custom ref
  const internalRef = useRef<HTMLInputElement>(null);
  const finalRef = options?.ref ?? internalRef;

  const { registerField, getError, clearError } = useFormValidationContext();

  useEffect(() => {
    registerField({
      key,
      ref: finalRef,
      required,
      getValue:
        options?.getValue ??
        (() => {
          const el = finalRef.current as HTMLInputElement | HTMLTextAreaElement | null;
          return el?.value ?? '';
        }),
    });
  }, [key, required, registerField, finalRef, options?.getValue]);

  const error = getError(key);

  const handleChange = () => {
    clearError(key);
  };

  return {
    ref: finalRef,
    error,
    handleChange,
  };
}

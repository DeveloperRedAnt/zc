'use client';
import { createContext, useContext, useRef, useState } from 'react';

type FieldRef = {
  key: string;
  ref: React.RefObject<HTMLElement | null>;
  required?: boolean;
  getValue: () => string | null;
};

type FormValidationContextType = {
  registerField: (field: FieldRef) => void;
  getRegisteredFields: () => FieldRef[];
  setErrors: (errors: Record<string, string>) => void;
  getError: (key: string) => string | undefined;
  clearError: (key: string) => void;
};

const FormValidationContext = createContext<FormValidationContextType | null>(null);

export function useFormValidationContext() {
  const context = useContext(FormValidationContext);
  if (!context) {
    throw new Error('useFormValidationContext must be used within a FormValidationProvider');
  }
  return context;
}

export function FormValidationProvider({ children }: { children: React.ReactNode }) {
  const fieldsRef = useRef<FieldRef[]>([]);
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});

  const registerField = (field: FieldRef) => {
    fieldsRef.current = fieldsRef.current.filter((f) => f.key !== field.key);
    fieldsRef.current.push(field);
  };

  const getRegisteredFields = () => fieldsRef.current;
  const setErrors = (errors: Record<string, string>) => setErrorMap(errors);
  const getError = (key: string) => errorMap[key];

  const clearError = (key: string) => {
    setErrorMap((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <FormValidationContext.Provider
      value={{ registerField, getRegisteredFields, setErrors, getError, clearError }}
    >
      {children}
    </FormValidationContext.Provider>
  );
}

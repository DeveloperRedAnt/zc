'use client';

import { useEffect, useState } from 'react';
import CustomInput from './custom-input';

type ClientOnlyInputProps = Parameters<typeof CustomInput>[0];

// Client-only wrapper to prevent hydration mismatch
export default function ClientOnlyInput(props: ClientOnlyInputProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return simple input during SSR to prevent hydration mismatch
    return (
      <div className="flex flex-col gap-2">
        {props.label && (
          <label className="text-sm font-medium text-[#555555]">
            {props.label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type="text"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      </div>
    );
  }

  return <CustomInput {...props} />;
}

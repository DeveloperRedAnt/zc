import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const switchStyles = tv({
  slots: {
    base: 'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:ring-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch',
    thumb:
      'pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-0.5',
  },
  variants: {
    readOnly: {
      true: {
        base: 'cursor-default opacity-70 pointer-events-none',
      },
    },
  },
});

export type SwitchVariants = VariantProps<typeof switchStyles>;

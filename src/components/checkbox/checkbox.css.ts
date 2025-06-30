import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const checkboxStyles = tv({
  slots: {
    base: [
      'peer size-4 shrink-0 border border-primary rounded-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-0',
    ],
    indicator: 'flex items-center justify-center text-current',
    icon: 'size-3 stroke-[3]',
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxStyles>;

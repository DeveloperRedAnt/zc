import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const collapsibleStyles = tv({
  slots: {
    base: 'w-full',
    trigger: 'relative',
    content: 'overflow-hidden',
  },
});

export type CollapsibleVariants = VariantProps<typeof collapsibleStyles>;

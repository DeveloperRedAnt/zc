import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const textareaStyles = tv({
  base: [
    'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
});

export type TextareaVariants = VariantProps<typeof textareaStyles>;

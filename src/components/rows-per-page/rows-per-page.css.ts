import { VariantProps, tv } from 'tailwind-variants';

export const RowPerPageStyles = tv({
  slots: {
    trigger: '',
    icon: '',
  },
});

export type RowPerPageVariants = VariantProps<typeof RowPerPageStyles>;

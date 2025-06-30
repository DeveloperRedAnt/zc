import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import type { LabelVariants } from './label.css';
import { labelStyles } from './label.css';

const Label = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  LabelVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof LabelPrimitive.Root> | null>;
  }) => <LabelPrimitive.Root ref={ref} className={labelStyles({ className })} {...props} />;

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

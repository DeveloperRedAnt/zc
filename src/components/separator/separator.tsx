import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import type { SeparatorVariants } from './separator.css';
import { separatorStyles } from './separator.css';

const Separator = ({
  ref,
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
  SeparatorVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof SeparatorPrimitive.Root> | null>;
  }) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={separatorStyles({ orientation, className })}
    {...props}
  />
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

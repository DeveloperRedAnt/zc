import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';
import type { ToggleVariants } from './toggle.css';
import { toggleStyles } from './toggle.css';

const Toggle = ({
  ref,
  className,
  variant,
  size,
  ...props
}: React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  ToggleVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof TogglePrimitive.Root> | null>;
  }) => (
  <TogglePrimitive.Root
    ref={ref}
    className={toggleStyles({ variant, size, className })}
    {...props}
  />
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };

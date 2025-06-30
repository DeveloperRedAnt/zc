import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as React from 'react';
import type { ToggleVariants } from '../toggle/toggle.css';
import { toggleStyles } from '../toggle/toggle.css';
import { toggleGroupStyles } from './toggle-group.css';

const ToggleGroupContext = React.createContext<ToggleVariants>({
  size: 'default',
  variant: 'default',
});

const ToggleGroup = ({
  ref,
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  ToggleVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof ToggleGroupPrimitive.Root> | null>;
  }) => {
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({ variant, size }), [variant, size]);

  return (
    <ToggleGroupPrimitive.Root ref={ref} className={toggleGroupStyles({ className })} {...props}>
      <ToggleGroupContext value={contextValue}>{children}</ToggleGroupContext>
    </ToggleGroupPrimitive.Root>
  );
};

const ToggleGroupItem = ({
  ref,
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  ToggleVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof ToggleGroupPrimitive.Item> | null>;
  }) => {
  const context = React.use(ToggleGroupContext);
  const styles = toggleStyles({
    variant: context.variant || variant,
    size: context.size || size,
    className,
  });

  return (
    <ToggleGroupPrimitive.Item ref={ref} className={styles} {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  );
};

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

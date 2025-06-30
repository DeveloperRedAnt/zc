import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { popoverStyles } from './popover.css';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = ({
  ref,
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof PopoverPrimitive.Content> | null>;
}) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={popoverStyles({ className })}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};

Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverAnchor.displayName = 'PopoverAnchor';
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };

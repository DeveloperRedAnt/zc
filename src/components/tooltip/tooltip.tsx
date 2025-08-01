import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';
import { tooltipStyles } from './tooltip.css';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = ({
  ref,
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof TooltipPrimitive.Content> | null>;
}) => {
  const styles = tooltipStyles();
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={styles.base({ className })}
        {...props}
      >
        {props.children}
        <TooltipPrimitive.Arrow className={styles.arrow()} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';
import type { HoverCardVariants } from './hover-card.css';
import { hoverCardStyles } from './hover-card.css';

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

type HoverCardContentProps = {} & React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
> &
  HoverCardVariants;

const HoverCardContent = ({
  ref,
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: HoverCardContentProps & {
  ref?: React.RefObject<React.ComponentRef<typeof HoverCardPrimitive.Content> | null>;
}) => {
  const styles = hoverCardStyles();
  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={styles.content({ className })}
      {...props}
    />
  );
};

HoverCard.displayName = HoverCardPrimitive.Root.displayName;
HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName;
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };

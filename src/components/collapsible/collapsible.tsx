import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';
import { collapsibleStyles } from './collapsible.css';

const Collapsible = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  const styles = collapsibleStyles();
  return <CollapsiblePrimitive.Root ref={ref} className={styles.base({ className })} {...props} />;
};

const CollapsibleTrigger = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
  ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
  const styles = collapsibleStyles();
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={styles.trigger({ className })}
      {...props}
    />
  );
};

const CollapsibleContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  const styles = collapsibleStyles();
  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className={styles.content({ className })}
      {...props}
    />
  );
};

Collapsible.displayName = 'Collapsible';
CollapsibleTrigger.displayName = 'CollapsibleTrigger';
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleContent, CollapsibleTrigger };

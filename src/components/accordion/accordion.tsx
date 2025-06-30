import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import { accordionStyles } from './accordion.css';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
  ref?: React.RefObject<React.ComponentRef<typeof AccordionPrimitive.Item> | null>;
}) => {
  const styles = accordionStyles();
  return <AccordionPrimitive.Item ref={ref} className={styles.item({ className })} {...props} />;
};

const AccordionTrigger = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  ref?: React.RefObject<React.ComponentRef<typeof AccordionPrimitive.Trigger> | null>;
}) => {
  const styles = accordionStyles();
  return (
    <AccordionPrimitive.Header className={styles.headerWrapper()}>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={styles.headerTrigger({ className })}
        {...props}
      >
        {children}
        <Lucide.ChevronDown className={styles.headerIcon()} strokeWidth={2} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

const AccordionContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof AccordionPrimitive.Content> | null>;
}) => {
  const styles = accordionStyles();
  return (
    <AccordionPrimitive.Content ref={ref} className={styles.contentWrapper()} {...props}>
      <div className={styles.contentChildren({ className })}>{children}</div>
    </AccordionPrimitive.Content>
  );
};

AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

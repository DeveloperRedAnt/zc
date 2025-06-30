import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import type { TabsVariants } from './tabs.css';
import { tabsStyles } from './tabs.css';

const Tabs = TabsPrimitive.Root;

export type TabsListProps = {} & React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  TabsVariants;

const TabsList = ({
  ref,
  className,
  ...props
}: TabsListProps & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.List> | null>;
}) => {
  const styles = tabsStyles();
  return <TabsPrimitive.List ref={ref} className={styles.list({ className })} {...props} />;
};

const TabsTrigger = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Trigger> | null>;
}) => {
  const styles = tabsStyles();
  return <TabsPrimitive.Trigger ref={ref} className={styles.trigger({ className })} {...props} />;
};

const TabsContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Content> | null>;
}) => {
  const styles = tabsStyles();
  return <TabsPrimitive.Content ref={ref} className={styles.content({ className })} {...props} />;
};

Tabs.displayName = TabsPrimitive.Root.displayName;
TabsList.displayName = TabsPrimitive.List.displayName;
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };

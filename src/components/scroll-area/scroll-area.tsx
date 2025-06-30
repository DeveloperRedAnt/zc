import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';
import { scrollAreaStyles } from './scroll-area.css';

// Define ScrollBar component first to avoid using it before definition
const ScrollBar = ({
  ref,
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> | null>;
}) => {
  const styles = scrollAreaStyles({ orientation });
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={styles.scrollbar({ className })}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className={styles.thumb()} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
};

const ScrollArea = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.Root> | null>;
}) => {
  const styles = scrollAreaStyles();
  return (
    <ScrollAreaPrimitive.Root ref={ref} className={styles.root({ className })} {...props}>
      <ScrollAreaPrimitive.Viewport className={styles.viewport()}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
};

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

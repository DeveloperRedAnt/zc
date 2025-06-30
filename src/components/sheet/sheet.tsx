import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import type { SheetVariants } from './sheet.css';
import { sheetStyles } from './sheet.css';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
  ref?: React.RefObject<React.ComponentRef<typeof SheetPrimitive.Overlay> | null>;
}) => {
  const styles = sheetStyles();
  return <SheetPrimitive.Overlay className={styles.overlay({ className })} {...props} ref={ref} />;
};

type SheetContentProps = {} & React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> &
  SheetVariants;

const SheetContent = ({
  ref,
  side = 'right',
  className,
  children,
  ...props
}: SheetContentProps & {
  ref?: React.RefObject<React.ComponentRef<typeof SheetPrimitive.Content> | null>;
}) => {
  const styles = sheetStyles({ side });
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={styles.base({ className })} {...props}>
        <SheetPrimitive.Close className={styles.contentCloseWrapper()}>
          <Lucide.XIcon className={styles.contentCloseIcon()} strokeWidth={2} />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
};

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const styles = sheetStyles();
  return <div className={styles.header({ className })} {...props} />;
};

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const styles = sheetStyles();
  return <div className={styles.footer({ className })} {...props} />;
};

const SheetTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> & {
  ref?: React.RefObject<React.ComponentRef<typeof SheetPrimitive.Title> | null>;
}) => {
  const styles = sheetStyles();
  return <SheetPrimitive.Title ref={ref} className={styles.title({ className })} {...props} />;
};

const SheetDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> & {
  ref?: React.RefObject<React.ComponentRef<typeof SheetPrimitive.Description> | null>;
}) => {
  const styles = sheetStyles();
  return (
    <SheetPrimitive.Description
      className={styles.description({ className })}
      ref={ref}
      {...props}
    />
  );
};

SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
SheetContent.displayName = SheetPrimitive.Content.displayName;
SheetHeader.displayName = 'SheetHeader';
SheetFooter.displayName = 'SheetFooter';
SheetTitle.displayName = SheetPrimitive.Title.displayName;
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};

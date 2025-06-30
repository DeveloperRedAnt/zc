import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import { dialogStyles } from './dialog.css';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.RefObject<React.ComponentRef<typeof DialogPrimitive.Overlay> | null>;
}) => {
  const styles = dialogStyles();
  return <DialogPrimitive.Overlay ref={ref} className={styles.overlay({ className })} {...props} />;
};

const DialogContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof DialogPrimitive.Content> | null>;
}) => {
  const styles = dialogStyles();
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={styles.content({ className })} {...props}>
        {children}
        <DialogPrimitive.Close className={styles.close()}>
          <Lucide.XIcon className={styles.closeIcon()} strokeWidth={2} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const styles = dialogStyles();
  return <div className={styles.header({ className })} {...props} />;
};

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const styles = dialogStyles();
  return <div className={styles.footer({ className })} {...props} />;
};

const DialogTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.RefObject<React.ComponentRef<typeof DialogPrimitive.Title> | null>;
}) => {
  const styles = dialogStyles();
  return <DialogPrimitive.Title ref={ref} className={styles.title({ className })} {...props} />;
};

const DialogDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
  ref?: React.RefObject<React.ComponentRef<typeof DialogPrimitive.Description> | null>;
}) => {
  const styles = dialogStyles();
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={styles.description({ className })}
      {...props}
    />
  );
};

Dialog.displayName = 'Dialog';
DialogTrigger.displayName = 'DialogTrigger';
DialogPortal.displayName = 'DialogPortal';
DialogClose.displayName = 'DialogClose';
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
DialogContent.displayName = DialogPrimitive.Content.displayName;
DialogHeader.displayName = 'DialogHeader';
DialogFooter.displayName = 'DialogFooter';
DialogTitle.displayName = DialogPrimitive.Title.displayName;
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { buttonStyles } from '../button/button.css';
import { alertDialogStyles } from './alert-dialog.css';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> & {
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Overlay> | null>;
}) => {
  const styles = alertDialogStyles();
  return (
    <AlertDialogPrimitive.Overlay className={styles.overlay({ className })} {...props} ref={ref} />
  );
};

const AlertDialogContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Content> | null>;
}) => {
  const styles = alertDialogStyles();
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={styles.content({ className })}
        {...props}
      />
    </AlertDialogPortal>
  );
};

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const styles = alertDialogStyles();
  return <div className={styles.header({ className })} {...props} />;
};

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const styles = alertDialogStyles();
  return <div className={styles.footer({ className })} {...props} />;
};

const AlertDialogTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> & {
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Title> | null>;
}) => {
  const styles = alertDialogStyles();
  return (
    <AlertDialogPrimitive.Title ref={ref} className={styles.title({ className })} {...props} />
  );
};

const AlertDialogDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & {
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Description> | null>;
}) => {
  const styles = alertDialogStyles();
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={styles.description({ className })}
      {...props}
    />
  );
};

const AlertDialogAction = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Action> | null>;
}) => {
  const styles = buttonStyles({ variant: 'default', size: 'default' });
  return (
    <AlertDialogPrimitive.Action ref={ref} className={styles.base({ className })} {...props} />
  );
};

const AlertDialogCancel = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
  ref?: React.RefObject<React.ComponentRef<typeof AlertDialogPrimitive.Cancel> | null>;
}) => {
  const styles = buttonStyles({ variant: 'ghost', size: 'default' });
  return (
    <AlertDialogPrimitive.Cancel ref={ref} className={styles.base({ className })} {...props} />
  );
};

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
AlertDialogHeader.displayName = 'AlertDialogHeader';
AlertDialogFooter.displayName = 'AlertDialogFooter';
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};

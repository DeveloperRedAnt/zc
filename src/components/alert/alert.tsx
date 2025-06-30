import * as React from 'react';
import type { AlertVariants } from './alert.css';
import { alertStyles } from './alert.css';

const Alert = ({
  ref,
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  AlertVariants & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const styles = alertStyles({ variant });
  return <div ref={ref} role="alert" className={styles.base({ variant, className })} {...props} />;
};

const AlertTitle = ({
  ref,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>;
}) => {
  const styles = alertStyles();
  return (
    <h5 ref={ref} className={styles.title({ className })} {...props}>
      {children}
    </h5>
  );
};

const AlertDescription = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>;
}) => {
  const styles = alertStyles();
  return <div ref={ref} className={styles.description({ className })} {...props} />;
};

Alert.displayName = 'Alert';
AlertTitle.displayName = 'AlertTitle';
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };

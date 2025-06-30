import * as React from 'react';
import { cardStyles } from './card.css';

const Card = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const styles = cardStyles();
  return <div ref={ref} className={styles.base({ className })} {...props} />;
};

const CardHeader = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const styles = cardStyles();
  return <div ref={ref} className={styles.header({ className })} {...props} />;
};

const CardTitle = ({
  ref,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>;
}) => {
  const styles = cardStyles();
  return (
    <h3 ref={ref} className={styles.title({ className })} {...props}>
      {children}
    </h3>
  );
};

const CardDescription = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>;
}) => {
  const styles = cardStyles();
  return <p ref={ref} className={styles.description({ className })} {...props} />;
};

const CardContent = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const styles = cardStyles();
  return <div ref={ref} className={styles.content({ className })} {...props} />;
};

const CardFooter = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const styles = cardStyles();
  return <div ref={ref} className={styles.footer({ className })} {...props} />;
};

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

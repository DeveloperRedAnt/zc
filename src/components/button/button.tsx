import * as Lucide from 'lucide-react';
import { Slot } from 'radix-ui';
import * as React from 'react';
import type { ButtonVariants } from './button.css';
import { buttonStyles } from './button.css';

export type ButtonProps = {
  asChild?: boolean;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

const Button = ({
  ref,
  variant,
  size,
  className,
  isLoading,
  disabled,
  children,
  asChild = false,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const Comp = asChild ? Slot.Root : 'button';
  const isDisabled = disabled || isLoading;
  const styles = buttonStyles({ variant, size, isLoading });

  // Wrap children in fragment when loading to ensure single child
  const content = isLoading ? (
    <>
      <Lucide.Loader2 strokeWidth={2} />
      {children}
    </>
  ) : (
    children
  );

  return (
    <Comp
      ref={ref}
      className={styles.base({ className })}
      data-loading={isLoading}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </Comp>
  );
};

Button.displayName = 'Button';

export { Button };

import { Slot } from 'radix-ui';
import * as React from 'react';
import type { TextVariants } from './text.css';
import { textStyles } from './text.css';

export type TextProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLParagraphElement> &
  TextVariants;

const Text = ({
  ref,
  className,
  size,
  weight,
  align,
  variant,
  asChild = false,
  ...props
}: TextProps & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const Comp = asChild ? Slot.Root : 'p';
  return (
    <Comp
      ref={ref}
      className={textStyles({ size, weight, align, variant, className })}
      {...props}
    />
  );
};

Text.displayName = 'Text';

export { Text };

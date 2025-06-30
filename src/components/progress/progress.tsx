import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';
import type { ProgressVariants } from './progress.css';
import { progressStyles } from './progress.css';

export type ProgressProps = {
  color?: string;
} & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
  ProgressVariants;

const Progress = ({
  ref,
  className,
  value,
  size,
  color,
  ...props
}: ProgressProps & {
  ref?: React.RefObject<React.ComponentRef<typeof ProgressPrimitive.Root> | null>;
}) => {
  const styles = progressStyles({ size });
  return (
    <ProgressPrimitive.Root ref={ref} className={styles.base({ className })} {...props}>
      <ProgressPrimitive.Indicator
        className={styles.indicator()}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: color || undefined,
        }}
      />
    </ProgressPrimitive.Root>
  );
};

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

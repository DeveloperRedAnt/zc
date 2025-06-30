import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';
import { switchStyles } from './switch.css';

const Switch = ({
  ref,
  className,
  readOnly,
  onCheckedChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof SwitchPrimitives.Root> | null>;
  readOnly?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) => {
  const styles = switchStyles({ readOnly });

  const handleChange = (checked: boolean) => {
    if (!readOnly && onCheckedChange) {
      onCheckedChange(checked);
    }
  };
  return (
    <SwitchPrimitives.Root
      className={styles.base({ className })}
      {...props}
      ref={ref}
      onCheckedChange={handleChange}
      tabIndex={readOnly ? -1 : 0}
      aria-readonly={readOnly}
    >
      <SwitchPrimitives.Thumb className={styles.thumb()} />
    </SwitchPrimitives.Root>
  );
};

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

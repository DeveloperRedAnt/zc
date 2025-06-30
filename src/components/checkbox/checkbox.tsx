import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import { checkboxStyles } from './checkbox.css';

const Checkbox = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof CheckboxPrimitive.Root> | null>;
}) => {
  const styles = checkboxStyles();
  return (
    <CheckboxPrimitive.Root ref={ref} className={styles.base({ className })} {...props}>
      <CheckboxPrimitive.Indicator className={styles.indicator()}>
        <Lucide.Check className={styles.icon()} strokeWidth={2} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import type { DropdownMenuVariants } from './dropdown-menu.css';
import { dropdownMenuStyles } from './dropdown-menu.css';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = ({
  ref,
  className,
  inset,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> &
  DropdownMenuVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger> | null>;
  }) => {
  const styles = dropdownMenuStyles({ inset });
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={styles.subTrigger({ className })}
      {...props}
    >
      {children}
      <Lucide.ChevronRight className={styles.triggerIcon()} strokeWidth={2} />
    </DropdownMenuPrimitive.SubTrigger>
  );
};

const DropdownMenuSubContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
  ref?: React.RefObject<React.ComponentRef<typeof DropdownMenuPrimitive.SubContent> | null>;
}) => {
  const styles = dropdownMenuStyles();
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={styles.subContent({ className })}
      {...props}
    />
  );
};

const DropdownMenuContent = ({
  ref,
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof DropdownMenuPrimitive.Content> | null>;
}) => {
  const styles = dropdownMenuStyles();
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={styles.content({ className })}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

const DropdownMenuItem = ({
  ref,
  className,
  inset,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> &
  DropdownMenuVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof DropdownMenuPrimitive.Item> | null>;
  }) => {
  const styles = dropdownMenuStyles({ inset });
  return <DropdownMenuPrimitive.Item ref={ref} className={styles.item({ className })} {...props} />;
};

const DropdownMenuCheckboxItem = ({
  ref,
  className,
  children,
  checked,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
  ref?: React.RefObject<React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem> | null>;
}) => {
  const styles = dropdownMenuStyles();
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={styles.checkboxItem({ className })}
      checked={checked}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className={styles.checkboxItemIndicator()}>
        <Lucide.Check className={styles.checkboxItemIcon()} strokeWidth={2} />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
};

const DropdownMenuRadioItem = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
  ref?: React.RefObject<React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem> | null>;
}) => {
  const styles = dropdownMenuStyles();
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={styles.radioItem({ className })}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className={styles.radioItemIndicator()}>
        <Lucide.Dot className={styles.radioItemIcon()} strokeWidth={2} />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
};

const DropdownMenuLabel = ({
  ref,
  className,
  inset,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> &
  DropdownMenuVariants & {
    ref?: React.RefObject<React.ComponentRef<typeof DropdownMenuPrimitive.Label> | null>;
  }) => {
  const styles = dropdownMenuStyles({ inset });
  return (
    <DropdownMenuPrimitive.Label ref={ref} className={styles.label({ className })} {...props} />
  );
};

const DropdownMenuSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & {
  ref?: React.RefObject<React.ComponentRef<typeof DropdownMenuPrimitive.Separator> | null>;
}) => {
  const styles = dropdownMenuStyles();
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={styles.separator({ className })}
      {...props}
    />
  );
};

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  const styles = dropdownMenuStyles();
  return <span className={styles.shortcut({ className })} {...props} />;
};

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
DropdownMenuGroup.displayName = 'DropdownMenuGroup';
DropdownMenuPortal.displayName = 'DropdownMenuPortal';
DropdownMenuSub.displayName = 'DropdownMenuSub';
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};

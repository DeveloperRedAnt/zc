import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import * as Lucide from 'lucide-react';
import * as React from 'react';
import type { ContextMenuVariants } from './context-menu.css';
import { contextMenuStyles } from './context-menu.css';

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

type ContextMenuSubTriggerProps = {} & React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
> &
  ContextMenuVariants;

const ContextMenuSubTrigger = ({
  ref,
  className,
  inset,
  children,
  ...props
}: ContextMenuSubTriggerProps & {
  ref?: React.RefObject<React.ComponentRef<typeof ContextMenuPrimitive.SubTrigger> | null>;
}) => {
  const styles = contextMenuStyles({ inset });
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={styles.subTrigger({ className })}
      {...props}
    >
      {children}
      <Lucide.ChevronRight className={styles.subTriggerIcon()} />
    </ContextMenuPrimitive.SubTrigger>
  );
};

const ContextMenuSubContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> & {
  ref?: React.RefObject<React.ComponentRef<typeof ContextMenuPrimitive.SubContent> | null>;
}) => {
  const styles = contextMenuStyles();
  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={styles.subContent({ className })}
      {...props}
    />
  );
};

const ContextMenuContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof ContextMenuPrimitive.Content> | null>;
}) => {
  const styles = contextMenuStyles();
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={styles.content({ className })}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
};

type ContextMenuItemProps = {} & React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> &
  ContextMenuVariants;

const ContextMenuItem = ({
  ref,
  className,
  inset,
  ...props
}: ContextMenuItemProps & {
  ref?: React.RefObject<React.ComponentRef<typeof ContextMenuPrimitive.Item> | null>;
}) => {
  const styles = contextMenuStyles({ inset });
  return <ContextMenuPrimitive.Item ref={ref} className={styles.item({ className })} {...props} />;
};

const ContextMenuCheckboxItem = ({
  ref,
  className,
  children,
  checked,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> & {
  ref?: React.RefObject<React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem> | null>;
}) => {
  const styles = contextMenuStyles();
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={styles.checkboxItem({ className })}
      checked={checked}
      {...props}
    >
      <ContextMenuPrimitive.ItemIndicator className={styles.itemIndicator()}>
        <Lucide.Check className={styles.itemIndicatorIcon()} />
      </ContextMenuPrimitive.ItemIndicator>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
};

const ContextMenuRadioItem = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> & {
  ref?: React.RefObject<React.ComponentRef<typeof ContextMenuPrimitive.RadioItem> | null>;
}) => {
  const styles = contextMenuStyles();
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={styles.radioItem({ className })}
      {...props}
    >
      <ContextMenuPrimitive.ItemIndicator className={styles.itemIndicator()}>
        <Lucide.Circle className={styles.radioItemIcon()} />
      </ContextMenuPrimitive.ItemIndicator>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
};

type ContextMenuLabelProps = {} & React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Label
> &
  ContextMenuVariants;

const ContextMenuLabel = ({
  ref,
  className,
  inset,
  ...props
}: ContextMenuLabelProps & {
  ref?: React.RefObject<React.ComponentRef<typeof ContextMenuPrimitive.Label> | null>;
}) => {
  const styles = contextMenuStyles({ inset });
  return (
    <ContextMenuPrimitive.Label ref={ref} className={styles.label({ className })} {...props} />
  );
};

const ContextMenuSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> & {
  ref?: React.RefObject<React.ComponentRef<typeof ContextMenuPrimitive.Separator> | null>;
}) => {
  const styles = contextMenuStyles();
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={styles.separator({ className })}
      {...props}
    />
  );
};

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  const styles = contextMenuStyles();
  return <span className={styles.shortcut({ className })} {...props} />;
};

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};

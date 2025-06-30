import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import { avatarStyles } from './avatar.css';

const Avatar = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Root> | null>;
}) => {
  const styles = avatarStyles();
  return <AvatarPrimitive.Root ref={ref} className={styles.base({ className })} {...props} />;
};

const AvatarImage = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
  ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Image> | null>;
}) => {
  const styles = avatarStyles();
  return <AvatarPrimitive.Image ref={ref} className={styles.image({ className })} {...props} />;
};

const AvatarFallback = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Fallback> | null>;
}) => {
  const styles = avatarStyles();
  return (
    <AvatarPrimitive.Fallback ref={ref} className={styles.fallback({ className })} {...props} />
  );
};

Avatar.displayName = AvatarPrimitive.Root.displayName;
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };

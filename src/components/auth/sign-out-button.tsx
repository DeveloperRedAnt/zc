'use client';

import { Button } from '@/components/button/button';
import { signOut } from 'next-auth/react';
import { ButtonHTMLAttributes, FC } from 'react';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  redirectUrl?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export const SignOutButton: FC<SignOutButtonProps> = ({
  redirectUrl = '/auth/sign-in',
  variant = 'ghost',
  children,
  ...props
}) => {
  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: redirectUrl,
    });
  };

  return (
    <Button onClick={handleSignOut} variant={variant} className="w-full justify-start" {...props}>
      {children || 'Sign out'}
    </Button>
  );
};

export default SignOutButton;

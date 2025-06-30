'use client';

import { useTranslation } from '@/libs/i18n';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function NextAuthSignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { t } = useTranslation();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: '/sign-in' });
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="border-none text-gray-700 hover:text-gray-900"
      type="button"
    >
      {isSigningOut ? t('auth.signingOut') : t('auth.signOut')}
    </button>
  );
}

'use client';
import { SignOutButton } from '@/components/auth';
import { Button } from '@/components/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile/user-avatar-profile';
import { useUser } from '@/hooks/use-user/use-user';
import { useTranslation } from '@/libs/i18n';
import { useRouter } from 'next/navigation';
import React from 'react';
export function UserNav(): React.ReactElement | null {
  const { user } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserAvatarProfile user={user} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={10} forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{user.fullName}</p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.emailAddresses?.[0]?.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
              {t('nav.profile')}
            </DropdownMenuItem>
            <DropdownMenuItem>{t('nav.billing')}</DropdownMenuItem>
            <DropdownMenuItem>{t('nav.settings')}</DropdownMenuItem>
            <DropdownMenuItem>{t('nav.newTeam')}</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <SignOutButton redirectUrl="/auth/sign-in" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return null;
}

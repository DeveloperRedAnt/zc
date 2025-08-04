'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useOrganization() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const switchOrganization = async (orgId) => {
    await update({ selectedOrganization: orgId });

    // Refresh server components tanpa full page reload
    router.refresh();
  };

  return {
    current: session?.selectedOrganization,
    switch: switchOrganization,
    loading: !session,
  };
}

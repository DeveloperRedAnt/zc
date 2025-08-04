'use client';

import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';

type OrganizationContextType = {
  currentId: string | null;
  switchOrganization: (orgId: string) => Promise<void>;
  isLoading: boolean;
};

const OrganizationContext = createContext<OrganizationContextType | null>(null);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id && !selectedOrgId) {
      setSelectedOrgId(session.selectedOrganization || null);
    }
  }, [session, selectedOrgId]);

  const switchOrganization = async (orgId: string) => {
    // Don't do anything if it's already the current org
    if (selectedOrgId === orgId) {
      return;
    }

    setIsLoading(true);
    try {
      setSelectedOrgId(orgId);

      if (orgId) {
        Cookies.set('x-organization-id', orgId);
      }

      await update({ selectedOrganization: orgId });

      if (!window.location.pathname.includes('/login/select-organization')) {
        router.refresh();
      }
    } catch (_e) {
      const prevOrgId = session?.selectedOrganization || null;
      setSelectedOrgId(prevOrgId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        currentId: selectedOrgId,
        switchOrganization,
        isLoading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within OrganizationProvider');
  }
  return context;
}

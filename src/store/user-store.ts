export interface Profile {
  id: string;
  name: string;
  whatsapp?: string;
  email?: string;
  role?: string;
  image?: string;
  permissions?: string[];
  // Add other fields as needed
}

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  clearProfile: () => void;
}

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { create } from 'zustand';

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  updateProfile: (profile) =>
    set((state) => ({ profile: state.profile ? { ...state.profile, ...profile } : null })),
  clearProfile: () => set({ profile: null }),
}));

// Hook to auto-sync profile store with NextAuth session
export function useSyncProfileWithSession() {
  const { data: session, status } = useSession();
  const setProfile = useProfileStore((state) => state.setProfile);
  const clearProfile = useProfileStore((state) => state.clearProfile);

  interface SessionUser {
    id: string;
    name?: string | null;
    whatsapp?: string;
    email?: string | null;
    role?: string;
    image?: string | null;
    permissions?: string[];
    [key: string]: unknown;
  }

  function isSessionUser(u: unknown): u is SessionUser {
    return !!u && typeof u === 'object' && 'id' in u;
  }

  useEffect(() => {
    if (status === 'authenticated' && isSessionUser(session?.user)) {
      const user = session.user as SessionUser;
      setProfile({
        id: user.id,
        name: user.name ?? '',
        whatsapp: user.whatsapp ?? undefined,
        email: user.email ?? undefined,
        role: user.role ?? undefined,
        image: user.image ?? undefined,
        permissions: user.permissions ?? [],
      });
    } else {
      clearProfile();
    }
  }, [session, status, setProfile, clearProfile]);
}

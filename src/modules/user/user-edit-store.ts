// src/modules/user/store/user-edit-store.ts

import { create } from 'zustand';

type UserEditState = {
  id: number | null;
  name: string;
  whatsapp: string;
  ktp: string;
  email: string;
  image: string;
  isActive: boolean;

  originalData: Omit<
    UserEditState,
    'originalData' | 'setUserData' | 'resetUserData' | 'resetToOriginal' | 'setOriginalData'
  > | null;

  setUserData: (user: Partial<UserEditState>) => void;
  resetUserData: () => void;
  setOriginalData: (
    user: Omit<
      UserEditState,
      'originalData' | 'setUserData' | 'resetUserData' | 'resetToOriginal' | 'setOriginalData'
    >
  ) => void;
  resetToOriginal: () => void;
};

export const useUserEditStore = create<UserEditState>((set, get) => ({
  id: null,
  name: '',
  whatsapp: '',
  ktp: '',
  email: '',
  image: '',
  isActive: true,

  originalData: null,

  setUserData: (user) => set((state) => ({ ...state, ...user })),
  resetUserData: () =>
    set({
      id: null,
      name: '',
      whatsapp: '',
      ktp: '',
      email: '',
      image: '',
      isActive: true,
      originalData: null,
    }),
  setOriginalData: (user) =>
    set(() => ({
      ...user,
      originalData: user,
    })),
  resetToOriginal: () => {
    const original = get().originalData;
    if (original) {
      set({ ...original });
    }
  },
}));

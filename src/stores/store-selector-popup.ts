'use client';

import { create } from 'zustand';

interface StoreSelectorPopupState {
  isOpen: boolean;
  pendingAction: {
    type: 'add' | 'edit';
    targetPath?: string;
  } | null;
  setIsOpen: (isOpen: boolean) => void;
  setPendingAction: (action: { type: 'add' | 'edit'; targetPath?: string } | null) => void;
  openPopup: (action?: { type: 'add' | 'edit'; targetPath?: string }) => void;
  closePopup: () => void;
}

export const useStoreSelectorPopupStore = create<StoreSelectorPopupState>((set) => ({
  isOpen: false,
  pendingAction: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setPendingAction: (action) => set({ pendingAction: action }),
  openPopup: (action) => set({ isOpen: true, pendingAction: action || null }),
  closePopup: () => set({ isOpen: false, pendingAction: null }),
}));

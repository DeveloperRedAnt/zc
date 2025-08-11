import { create } from 'zustand';

interface ProductTaxState {
  isTax: boolean;
  toggleTax: (isTax: boolean) => void;
}

export const useProductTaxStore = create<ProductTaxState>((set) => ({
  isTax: false,
  toggleTax: (isTax) => set({ isTax }),
}));

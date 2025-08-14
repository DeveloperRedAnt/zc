import { create } from 'zustand';

interface ProductTaxData {
  isTax: boolean;
}

// Initial state for a single product
const getInitialState = (): ProductTaxData => ({
  isTax: false,
});

interface ProductTaxStoreState {
  products: Record<number, ProductTaxData>;
}

interface ProductTaxStoreActions {
  toggleTax: (productId: number, isTax: boolean) => void;
  getProductData: (productId: number) => ProductTaxData;
}

type ProductTaxStore = ProductTaxStoreState & ProductTaxStoreActions;

export const useProductTaxStore = create<ProductTaxStore>((set, get) => ({
  // State
  products: {},

  // Helper to get product data with default values
  getProductData: (productId: number) => {
    const state = get();
    return state.products[productId] || getInitialState();
  },

  // Actions
  toggleTax: (productId: number, isTax: boolean) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: {
          isTax,
        },
      },
    })),
}));

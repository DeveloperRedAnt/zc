import { create } from 'zustand';
import { ProductDetailState } from './types';

// Initial state for a single product
const getInitialState = (): ProductDetailState => ({
  content: '',
  package: '',
  unit_id: null,
  unit_string: undefined,
  barcode: undefined,
  sku: undefined,
});

interface ProductDetailStoreState {
  products: Record<number, ProductDetailState>;
}

interface ProductDetailStoreActions {
  setProductDetail: (productId: number, data: Partial<ProductDetailState>) => void;
  resetProductDetail: (productId: number) => void;
  getProductData: (productId: number) => ProductDetailState;
}

type ProductDetailStore = ProductDetailStoreState & ProductDetailStoreActions;

export const useProductDetailStore = create<ProductDetailStore>((set, get) => ({
  // State
  products: {},

  // Helper to get product data with default values
  getProductData: (productId: number) => {
    const state = get();
    return state.products[productId] || getInitialState();
  },

  // Actions
  setProductDetail: (productId: number, data: Partial<ProductDetailState>) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: {
          ...get().getProductData(productId),
          ...data,
        },
      },
    })),

  resetProductDetail: (productId: number) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: getInitialState(),
      },
    })),
}));

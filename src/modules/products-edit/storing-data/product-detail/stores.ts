import { create } from 'zustand';
import { ProductDetailState, SetProductDetail } from './types';

interface ProductDetailStore extends ProductDetailState {
  setProductDetail: SetProductDetail;
  resetProductDetail: () => void;
}

export const useProductDetailStore = create<ProductDetailStore>((set) => ({
  content: '',
  package: '',
  unit_id: null,
  barcode: undefined,
  sku: undefined,
  setProductDetail: (data) => set((state) => ({ ...state, ...data })),
  resetProductDetail: () =>
    set({
      content: '',
      package: '',
      unit_id: null,
      barcode: undefined,
      sku: undefined,
    }),
}));

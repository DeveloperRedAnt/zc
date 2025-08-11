// stores/product-information-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ProductInformationState, ProductInformationStore, ProductTag } from './types';

// Initial state
const initialState: ProductInformationState = {
  thumbnailFile: null,
  thumbnailUrl: null,
  productName: '',
  isActiveProduct: true, // Default checked seperti di form
  isFavorite: false,
  selectedTags: [],
};

export const useProductInformationStore = create<ProductInformationStore>()(
  devtools(
    (set) => ({
      // State
      ...initialState,

      // Actions
      setThumbnailFile: (file: File | null) =>
        set((state) => ({ ...state, thumbnailFile: file }), false, 'setThumbnailFile'),

      setThumbnailUrl: (url: string | null) =>
        set((state) => ({ ...state, thumbnailUrl: url }), false, 'setThumbnailUrl'),

      setProductName: (name: string) =>
        set((state) => ({ ...state, productName: name }), false, 'setProductName'),

      setIsActiveProduct: (isActive: boolean) =>
        set((state) => ({ ...state, isActiveProduct: isActive }), false, 'setIsActiveProduct'),

      setIsFavorite: (isFavorite: boolean) =>
        set((state) => ({ ...state, isFavorite: isFavorite }), false, 'setIsFavorite'),

      setSelectedTags: (tags: ProductTag[]) =>
        set((state) => ({ ...state, selectedTags: tags }), false, 'setSelectedTags'),

      addTag: (tag: ProductTag) =>
        set(
          (state) => {
            const exists = state.selectedTags.some((t) => t.value === tag.value);
            if (exists) return state;

            return {
              ...state,
              selectedTags: [...state.selectedTags, tag],
            };
          },
          false,
          'addTag'
        ),

      removeTag: (tagValue: number) =>
        set(
          (state) => ({
            ...state,
            selectedTags: state.selectedTags.filter((tag) => tag.value !== tagValue),
          }),
          false,
          'removeTag'
        ),

      resetProductInformation: () =>
        set(() => ({ ...initialState }), false, 'resetProductInformation'),
    }),
    {
      name: 'product-information-store',
      // Enable redux devtools untuk debugging
    }
  )
);

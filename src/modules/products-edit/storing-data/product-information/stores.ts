// stores/product-information-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ProductInformationState, ProductTag } from './types';

// Initial state for a single product
const getInitialState = (): ProductInformationState => ({
  thumbnailFile: null,
  thumbnailUrl: null,
  productName: '',
  isActiveProduct: true, // Default checked seperti di form
  isFavorite: false,
  selectedTags: [],
});

interface ProductInformationStoreState {
  products: Record<number, ProductInformationState>;
}

interface ProductInformationStoreActions {
  setThumbnailFile: (productId: number, file: File | null) => void;
  setThumbnailUrl: (productId: number, url: string | null) => void;
  setProductName: (productId: number, name: string) => void;
  setIsActiveProduct: (productId: number, isActive: boolean) => void;
  setIsFavorite: (productId: number, isFavorite: boolean) => void;
  setSelectedTags: (productId: number, tags: ProductTag[]) => void;
  addTag: (productId: number, tag: ProductTag) => void;
  removeTag: (productId: number, tagValue: number) => void;
  resetProductInformation: (productId: number) => void;
  getProductData: (productId: number) => ProductInformationState;
}

type ProductInformationStore = ProductInformationStoreState & ProductInformationStoreActions;

export const useProductInformationStore = create<ProductInformationStore>()(
  devtools(
    (set, get) => ({
      // State
      products: {},

      // Helper to get product data with default values
      getProductData: (productId: number) => {
        const state = get();
        return state.products[productId] || getInitialState();
      },

      // Actions
      setThumbnailFile: (productId: number, file: File | null) =>
        set(
          (state) => ({
            products: {
              ...state.products,
              [productId]: {
                ...(state.products[productId] || getInitialState()),
                thumbnailFile: file,
              },
            },
          }),
          false,
          'setThumbnailFile'
        ),

      setThumbnailUrl: (productId: number, url: string | null) =>
        set(
          (state) => ({
            products: {
              ...state.products,
              [productId]: {
                ...(state.products[productId] || getInitialState()),
                thumbnailUrl: url,
              },
            },
          }),
          false,
          'setThumbnailUrl'
        ),

      setProductName: (productId: number, name: string) =>
        set(
          (state) => ({
            products: {
              ...state.products,
              [productId]: {
                ...(state.products[productId] || getInitialState()),
                productName: name,
              },
            },
          }),
          false,
          'setProductName'
        ),

      setIsActiveProduct: (productId: number, isActive: boolean) =>
        set(
          (state) => ({
            products: {
              ...state.products,
              [productId]: {
                ...(state.products[productId] || getInitialState()),
                isActiveProduct: isActive,
              },
            },
          }),
          false,
          'setIsActiveProduct'
        ),

      setIsFavorite: (productId: number, isFavorite: boolean) =>
        set(
          (state) => ({
            products: {
              ...state.products,
              [productId]: {
                ...(state.products[productId] || getInitialState()),
                isFavorite: isFavorite,
              },
            },
          }),
          false,
          'setIsFavorite'
        ),

      setSelectedTags: (productId: number, tags: ProductTag[]) =>
        set(
          (state) => ({
            products: {
              ...state.products,
              [productId]: {
                ...(state.products[productId] || getInitialState()),
                selectedTags: tags,
              },
            },
          }),
          false,
          'setSelectedTags'
        ),

      addTag: (productId: number, tag: ProductTag) =>
        set(
          (state) => {
            const currentData = state.products[productId] || getInitialState();
            const exists = currentData.selectedTags.some((t) => t.value === tag.value);
            if (exists) return state;

            return {
              products: {
                ...state.products,
                [productId]: {
                  ...currentData,
                  selectedTags: [...currentData.selectedTags, tag],
                },
              },
            };
          },
          false,
          'addTag'
        ),

      removeTag: (productId: number, tagValue: number) =>
        set(
          (state) => {
            const currentData = state.products[productId] || getInitialState();
            return {
              products: {
                ...state.products,
                [productId]: {
                  ...currentData,
                  selectedTags: currentData.selectedTags.filter((tag) => tag.value !== tagValue),
                },
              },
            };
          },
          false,
          'removeTag'
        ),

      resetProductInformation: (productId: number) =>
        set(
          (state) => ({
            products: {
              ...state.products,
              [productId]: getInitialState(),
            },
          }),
          false,
          'resetProductInformation'
        ),
    }),
    {
      name: 'product-information-store',
      // Enable redux devtools untuk debugging
    }
  )
);

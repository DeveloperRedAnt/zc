import { listVariantAttributes } from '@/__generated__/api/client/product.client';
import type { VariantAttributeItem } from '@/__generated__/api/dto/product.dto';
import type { VariantAttributeOptionType } from '@/modules/master-data/components/product-variant/variant-select';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ProductVariant,
  ProductVariantOption,
  ProductVariantType,
  ProductVariants,
} from './types';

import type { ProductVariantStore } from './types';

export const useProductVariantStore = create<ProductVariantStore>()(
  persist(
    (set, get) => ({
      // Store data per product ID - separate stores
      productVariantsStore: {} as Record<string, ProductVariants>,
      productVariantTypeStore: {} as Record<string, ProductVariantType>,

      // Legacy single product data (kept for backward compatibility)
      productVariants: [] as ProductVariants,
      productVariantType: '' as ProductVariantType,

      // Variant Attributes Caching State (shared across all products)
      variantAttributes: [] as VariantAttributeOptionType[],
      variantAttributesLoading: false,
      variantAttributesPagination: {
        currentPage: 0,
        lastPage: 0,
        hasMore: true,
      },

      // Product-specific methods
      setProductVariants: (productId: string, data: ProductVariants) =>
        set((state) => ({
          productVariantsStore: {
            ...state.productVariantsStore,
            [productId]: data,
          },
        })),

      getProductVariants: (productId: string) => {
        const state = get();
        return state.productVariantsStore[productId] || [];
      },

      setProductVariantType: (productId: string, type: ProductVariantType) =>
        set((state) => ({
          productVariantTypeStore: {
            ...state.productVariantTypeStore,
            [productId]: type,
          },
        })),

      getProductVariantType: (productId: string) => {
        const state = get();
        return state.productVariantTypeStore[productId] || '';
      },

      addProductVariant: (productId: string, productVariant: ProductVariant) =>
        set((state) => {
          const currentVariants = state.productVariantsStore[productId] || [];
          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: [...currentVariants, productVariant],
            },
          };
        }),

      removeProductVariant: (productId: string, id: string) =>
        set((state) => {
          const currentVariants = state.productVariantsStore[productId] || [];
          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: currentVariants.filter((variant) => variant.id !== id),
            },
          };
        }),

      updateProductVariant: (productId: string, id: string, data: Partial<ProductVariant>) =>
        set((state) => {
          const currentVariants = state.productVariantsStore[productId] || [];
          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: currentVariants.map((variant) =>
                variant.id === id ? { ...variant, ...data } : variant
              ),
            },
          };
        }),

      addProductVariantOption: (
        productId: string,
        productVariantID: string,
        option: ProductVariantOption
      ) =>
        set((state) => {
          const currentVariants = state.productVariantsStore[productId] || [];
          const productVariant = currentVariants.find((variant) => variant.id === productVariantID);
          if (!productVariant) return state;

          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: currentVariants.map((variant) =>
                variant.id === productVariantID
                  ? { ...variant, options: [...(variant.options || []), option] }
                  : variant
              ),
            },
          };
        }),

      updateProductVariantOptionByProductIDandOptionID: (
        productId: string,
        productVariantID: string,
        optionID: string,
        data: ProductVariantOption
      ) =>
        set((state) => {
          const currentVariants = state.productVariantsStore[productId] || [];
          const productVariant = currentVariants.find((variant) => variant.id === productVariantID);
          if (!productVariant) return state;

          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: currentVariants.map((variant) =>
                variant.id === productVariantID
                  ? {
                      ...variant,
                      options: variant.options?.map((option) =>
                        option.id === optionID ? { ...option, ...data } : option
                      ),
                    }
                  : variant
              ),
            },
          };
        }),

      deleteOptionByProductIDandOptionID: (
        productId: string,
        productVariantID: string,
        optionID: string
      ) =>
        set((state) => {
          const currentVariants = state.productVariantsStore[productId] || [];
          const index = currentVariants.findIndex((variant) => variant.id === productVariantID);

          if (index === -1) return state;

          const currentVariant = currentVariants[index];
          if (!currentVariant) return state;

          const updatedVariant: ProductVariant = {
            ...currentVariant,
            id: currentVariant.id,
            options: (currentVariant.options ?? []).filter((option) => option.id !== optionID),
          };

          const updatedVariants = [...currentVariants];
          updatedVariants[index] = updatedVariant;

          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: updatedVariants,
            },
          };
        }),

      changeProductVariantTypeByID: (
        productId: string,
        id: string,
        type: string,
        selectedID: string
      ) =>
        set((state) => {
          const currentVariants = state.productVariantsStore[productId] || [];
          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: currentVariants.map((variant) => {
                if (variant.id === id) {
                  return {
                    ...variant,
                    type,
                    selected_id: selectedID,
                  };
                }
                return variant;
              }),
            },
          };
        }),

      setProductVariantAttributeByID: (
        productId: string,
        id: string,
        variantAttribute: VariantAttributeOptionType | null
      ) =>
        set((state) => {
          const currentVariants = state.productVariantsStore[productId] || [];
          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: currentVariants.map((variant) =>
                variant.id === id
                  ? {
                      ...variant,
                      variantAttribute,
                    }
                  : variant
              ),
            },
          };
        }),

      addPricesVariantOption: (
        productId: string,
        productVariantID: string,
        optionID: string,
        price: { id: string; namePcs: string; quantity: string; price: number | string }
      ) =>
        set((state) => {
          const normalizedPrice = {
            ...price,
            price: typeof price.price === 'string' ? parseFloat(price.price) : price.price,
            quantity:
              typeof price.quantity === 'string' ? parseFloat(price.quantity) : price.quantity,
          };

          const currentVariants = state.productVariantsStore[productId] || [];
          return {
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: currentVariants.map((variant) => {
                if (variant.id !== productVariantID) return variant;

                return {
                  ...variant,
                  options: (variant.options ?? []).map((option) => {
                    if (option.id !== optionID) return option;

                    return {
                      ...option,
                      prices: [...(option.prices || []), normalizedPrice],
                    };
                  }),
                };
              }),
            },
          };
        }),

      clearAllData: (productId?: string) => {
        if (productId) {
          set((state) => ({
            productVariantsStore: {
              ...state.productVariantsStore,
              [productId]: [],
            },
            productVariantTypeStore: {
              ...state.productVariantTypeStore,
              [productId]: '',
            },
          }));
        } else {
          set(() => ({
            productVariantsStore: {},
            productVariantTypeStore: {},
            productVariants: [],
            productVariantType: '',
          }));
        }
      },

      // Variant Attributes Caching Methods (shared across all products)
      loadVariantAttributes: async (page = 1, search = '') => {
        const state = get();

        // If searching, reset pagination
        if (search && state.variantAttributesPagination.currentPage > 0) {
          set({
            variantAttributes: [],
            variantAttributesPagination: {
              currentPage: 0,
              lastPage: 0,
              hasMore: true,
            },
          });
        }

        // Don't fetch if already loading
        if (state.variantAttributesLoading) {
          return state.variantAttributes;
        }

        // Don't fetch more pages if no more data available (but allow initial fetch)
        if (!search && page > 1 && !state.variantAttributesPagination.hasMore) {
          return state.variantAttributes;
        }

        try {
          set({ variantAttributesLoading: true });

          const params = {
            page,
            per_page: 10,
            ...(search && { search }),
          };

          const response = await listVariantAttributes(params);

          if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid response structure:', response);
            set({ variantAttributesLoading: false });
            return state.variantAttributes;
          }

          const options: VariantAttributeOptionType[] = response.data.map(
            (attribute: VariantAttributeItem) => ({
              label: attribute.variant_attribute_name,
              value: attribute.id,
              data: attribute,
            })
          );

          const pagination = {
            currentPage: response.pagination?.current_page || page,
            lastPage: response.pagination?.last_page || page,
            hasMore: response.pagination ? page < response.pagination.last_page : false,
          };

          // If it's a new search or first page, replace; otherwise append
          const newAttributes =
            search || page === 1 ? options : [...state.variantAttributes, ...options];

          set({
            variantAttributes: newAttributes,
            variantAttributesPagination: pagination,
            variantAttributesLoading: false,
          });

          return newAttributes;
        } catch (error) {
          console.error('Error loading variant attributes:', error);
          set({ variantAttributesLoading: false });
          return state.variantAttributes;
        }
      },

      setVariantAttributesLoading: (loading: boolean) => set({ variantAttributesLoading: loading }),

      addVariantAttributes: (
        attributes: VariantAttributeOptionType[],
        pagination: { currentPage: number; lastPage: number; hasMore: boolean }
      ) =>
        set((state) => ({
          variantAttributes: [...state.variantAttributes, ...attributes],
          variantAttributesPagination: pagination,
        })),

      clearVariantAttributes: () =>
        set({
          variantAttributes: [],
          variantAttributesLoading: false,
          variantAttributesPagination: {
            currentPage: 0,
            lastPage: 0,
            hasMore: true,
          },
        }),
    }),
    {
      name: 'product-variant-store',
    }
  )
);

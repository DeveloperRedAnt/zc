import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StockItem, StockState, initialStock, variantList } from './types';

export const useStockStore = create<StockState>()(
  devtools(
    (set, get) => ({
      // Initial state
      selectedPurchaseDate: '',
      selectedExpiredDate: '',
      selectedStockDate: undefined,
      selectedSupplier: null,
      selectedStore: null,
      dataStock: Object.fromEntries(variantList.map((v) => [v, [initialStock]])),
      hasVariantStock: false,
      hasPaduanStock: false,

      // Basic setters
      setSelectedPurchaseDate: (date: string) => set({ selectedPurchaseDate: date }),
      setSelectedExpiredDate: (date: string) => set({ selectedExpiredDate: date }),
      setSelectedStockDate: (date) => set({ selectedStockDate: date }),
      setSelectedSupplier: (supplier) => set({ selectedSupplier: supplier }),
      setSelectedStore: (store) => set({ selectedStore: store }),
      setDataStock: (data) => set({ dataStock: data }),
      setHasVariantStock: (hasVariant) => set({ hasVariantStock: hasVariant }),
      setHasPaduanStock: (hasPaduan) => set({ hasPaduanStock: hasPaduan }),

      // Stock management actions
      addStock: (variant) => {
        const { dataStock } = get();
        set({
          dataStock: {
            ...dataStock,
            [variant]: [...(dataStock[variant] ?? []), { ...initialStock }],
          },
        });
      },

      removeStock: (variant, index) => {
        const { dataStock } = get();
        set({
          dataStock: {
            ...dataStock,
            [variant]: (dataStock[variant] ?? []).filter((_, i) => i !== index),
          },
        });
      },

      updateStock: (variant, index, field, value) => {
        const { dataStock } = get();
        const list = [...(dataStock[variant] ?? [])];

        const updatedItem: StockItem = {
          ...initialStock,
          ...list[index],
          [field]: value,
        };

        list[index] = updatedItem;

        set({
          dataStock: {
            ...dataStock,
            [variant]: list,
          },
        });
      },

      // Reset state
      resetState: () => {
        set({
          selectedPurchaseDate: '',
          selectedExpiredDate: '',
          selectedStockDate: undefined,
          selectedSupplier: null,
          selectedStore: null,
          dataStock: Object.fromEntries(variantList.map((v) => [v, [initialStock]])),
          hasVariantStock: false,
          hasPaduanStock: false,
        });
      },
    }),
    {
      name: 'stock-store',
    }
  )
);

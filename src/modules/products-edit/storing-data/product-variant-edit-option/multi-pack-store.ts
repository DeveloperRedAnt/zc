import { create } from 'zustand';
import { PriceMultiPackItem } from './multi-pack-types';

// Define the type for variant data
type VariantUnit = {
  id: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

// Store state for each variant
interface VariantMultiPackData {
  priceMultiPackList: PriceMultiPackItem[];
  isWholesale: boolean;
  multiPackErrors: { [itemId: number]: { [field: string]: string } };
  initialData: PriceMultiPackItem[]; // Store initial data for reset
}

interface VariantMultiPackState {
  // Map to store data for each variant by variantId
  variantData: Map<number, VariantMultiPackData>;

  // Actions
  initializeVariantData: (variantId: number, variantUnits: VariantUnit[]) => void;
  getVariantData: (variantId: number) => VariantMultiPackData;
  setMultiPackList: (variantId: number, list: PriceMultiPackItem[]) => void;
  addMultiPackItem: (variantId: number) => void;
  updateMultiPackItem: (
    variantId: number,
    id: number,
    field: keyof PriceMultiPackItem,
    value: string | number
  ) => void;
  removeMultiPackItem: (variantId: number, id: number) => void;
  resetVariantMultiPack: (variantId: number) => void;
  toggleWholesale: (variantId: number, isWholesale: boolean) => void;
  setMultiPackErrors: (
    variantId: number,
    errors: { [itemId: number]: { [field: string]: string } }
  ) => void;
}

const defaultVariantData: VariantMultiPackData = {
  priceMultiPackList: [],
  isWholesale: false,
  multiPackErrors: {},
  initialData: [],
};

// Helper function to convert VariantUnit to PriceMultiPackItem
const convertVariantUnitsToPriceMultiPack = (variantUnits: VariantUnit[]): PriceMultiPackItem[] => {
  return variantUnits.map((unit) => ({
    id: unit.id,
    unitName: unit.unitName,
    conversionValue: unit.conversionValue,
    price: unit.price,
  }));
};

export const useVariantMultiPackStore = create<VariantMultiPackState>((set, get) => ({
  variantData: new Map(),

  // Initialize data for a specific variant
  initializeVariantData: (variantId: number, variantUnits: VariantUnit[]) => {
    const state = get();
    const convertedData = convertVariantUnitsToPriceMultiPack(variantUnits);

    const newVariantData = {
      priceMultiPackList: [...convertedData],
      isWholesale: false,
      multiPackErrors: {},
      initialData: [...convertedData], // Store for reset functionality
    };

    const newMap = new Map(state.variantData);
    newMap.set(variantId, newVariantData);

    set({ variantData: newMap });
  },

  // Get data for a specific variant
  getVariantData: (variantId: number) => {
    const state = get();
    return state.variantData.get(variantId) || defaultVariantData;
  },

  // Set the entire list for a specific variant
  setMultiPackList: (variantId: number, list: PriceMultiPackItem[]) => {
    const state = get();
    const currentData = state.variantData.get(variantId) || defaultVariantData;
    const newMap = new Map(state.variantData);

    newMap.set(variantId, {
      ...currentData,
      priceMultiPackList: list,
    });

    set({ variantData: newMap });
  },

  // Toggle wholesale mode for a specific variant
  toggleWholesale: (variantId: number, isWholesale: boolean) => {
    const state = get();
    const currentData = state.variantData.get(variantId) || defaultVariantData;
    const newMap = new Map(state.variantData);

    newMap.set(variantId, {
      ...currentData,
      isWholesale,
    });

    set({ variantData: newMap });
  },

  // Add a new multi-pack item for a specific variant
  addMultiPackItem: (variantId: number) => {
    const state = get();
    const currentData = state.variantData.get(variantId) || defaultVariantData;
    const newMap = new Map(state.variantData);

    const newItem = {
      id: Date.now() + Math.random(),
      unitName: '',
      conversionValue: 1,
      price: 0,
    };

    newMap.set(variantId, {
      ...currentData,
      priceMultiPackList: [...currentData.priceMultiPackList, newItem],
    });

    set({ variantData: newMap });
  },

  // Update specific field of a multi-pack item for a specific variant
  updateMultiPackItem: (
    variantId: number,
    id: number,
    field: keyof PriceMultiPackItem,
    value: string | number
  ) => {
    const state = get();
    const currentData = state.variantData.get(variantId) || defaultVariantData;
    const newMap = new Map(state.variantData);

    const updatedList = currentData.priceMultiPackList.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    newMap.set(variantId, {
      ...currentData,
      priceMultiPackList: updatedList,
    });

    set({ variantData: newMap });
  },

  // Remove a multi-pack item for a specific variant
  removeMultiPackItem: (variantId: number, id: number) => {
    const state = get();
    const currentData = state.variantData.get(variantId) || defaultVariantData;

    if (currentData.priceMultiPackList.length <= 1) {
      return; // Don't remove if only one item left
    }

    const newMap = new Map(state.variantData);

    newMap.set(variantId, {
      ...currentData,
      priceMultiPackList: currentData.priceMultiPackList.filter((item) => item.id !== id),
      multiPackErrors: Object.fromEntries(
        Object.entries(currentData.multiPackErrors).filter(([itemId]) => Number(itemId) !== id)
      ),
    });

    set({ variantData: newMap });
  },

  // Reset to initial data for a specific variant
  resetVariantMultiPack: (variantId: number) => {
    const state = get();
    const currentData = state.variantData.get(variantId) || defaultVariantData;
    const newMap = new Map(state.variantData);

    newMap.set(variantId, {
      ...currentData,
      priceMultiPackList: [...currentData.initialData],
      multiPackErrors: {},
      isWholesale: false,
    });

    set({ variantData: newMap });
  },

  // Set validation errors for multi-pack items for a specific variant
  setMultiPackErrors: (
    variantId: number,
    errors: { [itemId: number]: { [field: string]: string } }
  ) => {
    const state = get();
    const currentData = state.variantData.get(variantId) || defaultVariantData;
    const newMap = new Map(state.variantData);

    newMap.set(variantId, {
      ...currentData,
      multiPackErrors: errors,
    });

    set({ variantData: newMap });
  },
}));

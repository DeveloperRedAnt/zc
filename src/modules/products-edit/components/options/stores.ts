import type * as DTO from '@/__generated__/api/dto/variant-options.dto';
import { usePriceMultiPackStore } from '@/modules/product-variant/components/variant-options/multi-pack-stores';
import Cookies from 'js-cookie';
import { create } from 'zustand';

const generateId = (prefix: string) => {
  const now = new Date();
  const datetime = now.toISOString().replace(/[-:.TZ]/g, '');
  return `${prefix}_${datetime}`;
};

export interface VariantUnit {
  id: string;
  unit_name: string;
  conversion_value: string;
  price: string;
}

export interface VariantAttribute {
  attribute_id: number;
  value_id: number | null;
  other: string | null;
}

export interface VariantOptionsData {
  id: string;
  store_id: number;
  product_id: number;
  thumbnail?: string | null;
  sku_code: string;
  barcode: string;
  is_active: boolean;
  is_wholesale: boolean;
  variant_units: VariantUnit[];
  attributes: VariantAttribute[];
}

export interface ValidationErrors {
  thumbnail?: string;
  sku_code?: string;
  barcode?: string;
  min_stock?: string;
  attributes?: { [key: number]: string };
  variant_units?: { [key: string]: { [field: string]: string } };
  general?: string;
}

const initialVariantUnit: VariantUnit = {
  id: generateId('vu'),
  unit_name: '',
  conversion_value: '1',
  price: '0',
};

const initialVariantOptionsData: VariantOptionsData = {
  id: generateId('v'),
  store_id: 0,
  product_id: 0,
  thumbnail: null,
  sku_code: '',
  barcode: '',
  is_active: true,
  is_wholesale: false,
  variant_units: [{ ...initialVariantUnit }],
  attributes: [],
};

interface VariantOptionsState {
  variantOptionsData: VariantOptionsData;
  checkEditVariant: DTO.CheckEditVariantData | null;

  thumbnail: File | null;
  minStock: number;
  selectedVariantOptions: {
    [attributeId: number]: { valueId: number | null | undefined; customValue: string };
  };

  validationErrors: ValidationErrors;
  isSubmitting: boolean;

  isDuplicateCombination: () => boolean;
  getDuplicateCombinationName: () => string;

  setCheckEditVariant: (data: DTO.CheckEditVariantData) => void;
  setThumbnail: (file: File | null) => void;
  setMinStock: (value: number) => void;
  updateVariantOptionsData: <K extends keyof VariantOptionsData>(
    field: K,
    value: VariantOptionsData[K]
  ) => void;
  setSelectedVariantOption: (
    attributeId: number,
    valueId: number | null,
    customValue?: string
  ) => void;
  addVariantUnit: () => void;
  updateVariantUnit: (index: number, field: keyof VariantUnit, value: string) => void;
  removeVariantUnit: (index: number) => void;

  validateForm: () => boolean;
  setValidationError: (field: string, error: string | { [key: number]: string }) => void;
  clearValidationError: (field: string) => void;
  clearAllValidationErrors: () => void;

  buildPayload: (
    productId: number,
    variant_units: VariantUnit[],
    isWholesale: boolean
  ) => DTO.CreateVariantOptionRequest;

  resetForm: () => void;
}

export const useVariantOptionsStore = create<VariantOptionsState>((set, get) => ({
  variantOptionsData: initialVariantOptionsData,
  checkEditVariant: null,
  thumbnail: null,
  minStock: 0,
  selectedVariantOptions: {},
  validationErrors: {},
  isSubmitting: false,

  setCheckEditVariant: (data) => {
    set({ checkEditVariant: data });

    if (data?.attribute_variant_options) {
      const initialSelected: { [key: number]: { valueId: number | null; customValue: string } } =
        {};
      for (let i = 0; i < data.attribute_variant_options.length; i++) {
        const option = data.attribute_variant_options[i];
        if (option?.attribute?.id) {
          initialSelected[option.attribute.id] = {
            valueId: null,
            customValue: '',
          };
        }
      }
      set({ selectedVariantOptions: initialSelected });
    }
  },

  setThumbnail: (file) => set({ thumbnail: file }),
  setMinStock: (value) => set({ minStock: value }),

  updateVariantOptionsData: (field, value) =>
    set((state) => ({
      variantOptionsData: { ...state.variantOptionsData, [field]: value },
    })),

  setSelectedVariantOption: (attributeId, valueId, customValue = '') =>
    set((state) => ({
      selectedVariantOptions: {
        ...state.selectedVariantOptions,
        [Number(attributeId)]: { valueId, customValue },
      },
    })),

  addVariantUnit: () =>
    set((state) => ({
      variantOptionsData: {
        ...state.variantOptionsData,
        variant_units: [...state.variantOptionsData.variant_units, { ...initialVariantUnit }],
      },
    })),

  updateVariantUnit: (index, field, value) =>
    set((state) => ({
      variantOptionsData: {
        ...state.variantOptionsData,
        variant_units: state.variantOptionsData.variant_units.map((unit, i) =>
          i === index ? { ...unit, [field]: value } : unit
        ),
      },
    })),

  removeVariantUnit: (index) =>
    set((state) => ({
      variantOptionsData: {
        ...state.variantOptionsData,
        variant_units: state.variantOptionsData.variant_units.filter((_, i) => i !== index),
      },
    })),

  validateForm: () => {
    const state = get();
    const errors: ValidationErrors = {};

    // 1️⃣ Validasi atribut pilihan
    const attributeErrors: { [key: number]: string } = {};
    const attributeOptions = state.checkEditVariant?.attribute_variant_options || [];
    for (let i = 0; i < attributeOptions.length; i++) {
      const option = attributeOptions[i];
      if (option?.attribute?.id) {
        const selected = state.selectedVariantOptions[option.attribute.id];
        const isEmpty =
          !selected || (selected.valueId == null && selected.customValue.trim() === '');
        if (isEmpty) {
          attributeErrors[option.attribute.id] =
            `Pilihan untuk ${option.attribute.name} wajib dipilih`;
        }
      }
    }
    if (Object.keys(attributeErrors).length > 0) {
      errors.attributes = attributeErrors;
    }

    // 2️⃣ Validasi variant unit dari multiPackStore
    const multiPackStore = usePriceMultiPackStore.getState();
    const unitErrors: { [key: string]: { [field: string]: string } } = {};
    const units = multiPackStore.priceMultiPackList;
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];
      if (unit) {
        const fieldErrors: { [field: string]: string } = {};
        if (!unit.unit_name.trim()) fieldErrors.unit_name = 'Nama unit wajib diisi';
        if (!unit.conversion_value.trim())
          fieldErrors.conversion_value = 'Nilai konversi wajib diisi';
        if (!unit.price.trim()) fieldErrors.price = 'Harga wajib diisi';
        if (Object.keys(fieldErrors).length > 0) {
          unitErrors[i] = fieldErrors;
        }
      }
    }
    if (Object.keys(unitErrors).length > 0) {
      errors.variant_units = unitErrors;
    }

    set({ validationErrors: errors });
    return Object.keys(errors).length === 0;
  },

  // Debug function untuk melihat struktur data
  debugCombinations: () => {
    const state = get();

    // Ekstrak unique combinations yang sudah ada
    const uniqueCombinations = new Set();
    const combinations = state.checkEditVariant?.combinations || [];

    for (let i = 0; i < combinations.length; i++) {
      const combo = combinations[i];
      if (combo?.attribute_option_name) {
        uniqueCombinations.add(combo.attribute_option_name);
      }
    }
  },

  // Improved isDuplicateCombination dengan debug info
  isDuplicateCombination: () => {
    const state = get();

    if (!state.checkEditVariant?.combinations || state.checkEditVariant.combinations.length === 0) {
      return false;
    }

    // Dapatkan nama kombinasi yang dipilih user saat ini
    const currentCombinationName = get().getDuplicateCombinationName();

    if (!currentCombinationName) {
      return false;
    }

    // Ekstrak semua nama kombinasi yang sudah ada
    const existingCombinationNames = new Set(
      state.checkEditVariant.combinations
        .map((combo) => combo.attribute_option_name?.toLowerCase()?.trim())
        .filter(Boolean)
    );

    const currentNameLower = currentCombinationName.toLowerCase().trim();

    const isDuplicate = existingCombinationNames.has(currentNameLower);

    return isDuplicate;
  },

  // Improved getDuplicateCombinationName
  getDuplicateCombinationName: () => {
    const state = get();

    if (!state.checkEditVariant?.attribute_variant_options) {
      return '';
    }

    const selectedNames: string[] = [];

    const options = state.checkEditVariant.attribute_variant_options;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option?.attribute?.id) {
        const selected = state.selectedVariantOptions[option.attribute.id];

        if (selected) {
          if (selected.valueId !== null && selected.valueId !== undefined) {
            const values = option.attribute.values || [];
            for (let j = 0; j < values.length; j++) {
              const value = values[j];
              if (value?.id === selected.valueId) {
                selectedNames.push(value.value);
                break; // sudah ketemu, keluar dari loop values
              }
            }
          } else if (selected.customValue?.trim()) {
            selectedNames.push(selected.customValue.trim());
          }
        }
      }
    }

    return selectedNames.join(' - ');
  },

  setValidationError: (field, error) =>
    set((state) => ({ validationErrors: { ...state.validationErrors, [field]: error } })),

  clearValidationError: (field) =>
    set((state) => {
      const newErrors = { ...state.validationErrors };
      delete newErrors[field as keyof ValidationErrors];
      return { validationErrors: newErrors };
    }),

  clearAllValidationErrors: () => set({ validationErrors: {} }),

  buildPayload: (productId, variant_units, isWholesale) => {
    const state = get();
    const storeId = Number(Cookies.get('x-store-id')) || 1;

    const attributes: VariantAttribute[] = Object.entries(state.selectedVariantOptions).map(
      ([attributeId, selection]) => ({
        attribute_id: Number(attributeId),
        value_id: selection.valueId ?? null,
        other: selection.valueId === null ? selection.customValue?.trim() || null : null,
      })
    );

    return {
      id: state.variantOptionsData.id,
      store_id: storeId,
      product_id: productId,
      thumbnail: '',
      sku_code: state.variantOptionsData.sku_code,
      barcode: state.variantOptionsData.barcode,
      is_active: state.variantOptionsData.is_active,
      is_wholesale: isWholesale,
      variant_units,
      attributes,
    };
  },

  resetForm: () =>
    set({
      variantOptionsData: {
        ...initialVariantOptionsData,
        variant_units: [{ ...initialVariantUnit }],
      },
      thumbnail: null,
      minStock: 0,
      selectedVariantOptions: {},
      validationErrors: {},
      isSubmitting: false,
    }),
}));

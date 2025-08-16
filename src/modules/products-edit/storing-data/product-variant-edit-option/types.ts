// @/modules/products-edit/storing-data/product-variant-edit-option/types.ts
import type { VariantAttributeOptionType } from '@/modules/master-data/components/product-variant/variant-select';

export type ProductVariant = {
  id: string;
  type?: string;
  variantAttribute?: VariantAttributeOptionType | null;
  selected_id?: string;
  options?: ProductVariantOption[];
};

export type ProductVariants = Array<ProductVariant>;

export type ProductVariantOption = {
  id: string;
  name: string;
  type: string;
  selected_id?: string;
  prices?: PricesVariantOption[];
};
export type ProductVariantOptions = Array<ProductVariantOption>;

export type PricesVariantOption = {
  id: string;
  namePcs: string;
  price: number;
  quantity: number;
};
export type PricesVariantOptions = Array<PricesVariantOption>;

export type ProductVariantType = 'Warna' | 'Ukuran' | 'Lainnya' | '';

export type ProductVariantStore = {
  productVariants: ProductVariants;
  productVariantType: ProductVariantType;
  formattedData: FormattedDatas;
  finalData: FormattedDatas;

  // Variant Attributes Caching
  variantAttributes: VariantAttributeOptionType[];
  variantAttributesLoading: boolean;
  variantAttributesPagination: {
    currentPage: number;
    lastPage: number;
    hasMore: boolean;
  };

  // Actions
  addProductVariant: (productVariant: ProductVariant) => void;
  removeProductVariant: (id: number) => void;
  updateProductVariant: (id: number, data: Partial<ProductVariant>) => void;
  addProductVariantOption: (productVariantID: string, option: ProductVariantOption) => void;
  updateProductVariantOptionByProductIDandOptionID: (
    productVariantID: string,
    optionID: string,
    data: ProductVariantOption
  ) => void;
  deleteOptionByProductIDandOptionID: (productVariantID: string, optionID: string) => void;
  changeProductVariantTypeByID: (id: string, type: ProductVariantType, selectedID: string) => void;
  setProductVariantAttributeByID: (
    id: string,
    variantAttribute: VariantAttributeOptionType | null
  ) => void;

  // Variant Attributes Caching Methods
  loadVariantAttributes: (page?: number, search?: string) => Promise<VariantAttributeOptionType[]>;
  setVariantAttributesLoading: (loading: boolean) => void;
  addVariantAttributes: (
    attributes: VariantAttributeOptionType[],
    pagination: { currentPage: number; lastPage: number; hasMore: boolean }
  ) => void;
  clearVariantAttributes: () => void;
  addPricesVariantOption: (
    productVariantID: string,
    optionID: string,
    price: { id: string; namePcs: string; quantity: string; price: string }
  ) => void;
  setFormattedData: (data: FormattedDatas) => void;
  updateFormattedData: (id: number, data: Partial<FormattedData>) => void;
  updateFormattedDataPrices: (id: string, prices: PricesVariantOption[], typeprice: string) => void;
  bulkUpdateFormattedDataPrices: (
    selectedIds: string[],
    prices: PricesVariantOption[],
    typeprice: string
  ) => void;
  batchUpdateAllFormattedDataPrices: (
    priceData: Record<string, PricesVariantOption[]>,
    typeprice: string
  ) => void;
  getExistingPriceData: () => (state: ProductVariantStore) => {
    existingPriceOptions: Record<string, PricesVariantOption[]>;
    hasExistingData: boolean;
  };
  clearAllData: () => void;
  clearFormattedData: () => void;
  setFinalData: (data: FormattedDatas) => void;
  clearFinalData: () => void;
};

export type PriceCardValue = {
  id: string;
  namePcs?: string;
  quantity?: number;
  price?: number;
};

// types.ts
export type VariantUnit = {
  id: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

export type AttributesUnit = {
  attribute: string;
  value: string;
};

export type FormattedData = {
  id: number;
  name: string;
  thumbnail: string;
  barcode: string;
  sku: string;
  minStock: number;
  variantUnits?: VariantUnit[]; // Add this property
  // Add other properties as needed based on your data structure
  attributes?: AttributesUnit[];
  isActive?: boolean;
  isWholesale?: boolean;
  // Original data for reset functionality
  originalData?: {
    thumbnail: string;
    barcode: string;
    sku: string;
    minStock: number;
    variantUnits?: VariantUnit[];
  };
};
export type FormattedDatas = Array<FormattedData>;

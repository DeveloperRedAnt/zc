import type { VariantAttributeOptionType } from '@/modules/master-data/components/product-variant/variant-select';

export type ProductVariant = {
  thumbnail: string;
  attributes: [];
  barcode: string;
  id: string;
  is_active: boolean;
  is_wholesale: boolean;
  minimum_stock: number;
  sku_code: string;
  variant_units: {
    conversion_value: string;
    id: string;
    price: string;
    unit_name: string;
  }[];
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
  // Store data per product ID - separate stores
  productVariantsStore: Record<string, ProductVariants>;
  productVariantTypeStore: Record<string, ProductVariantType>;

  // Legacy single product data (kept for backward compatibility)
  productVariants: ProductVariants;
  productVariantType: ProductVariantType;

  // Variant Attributes Caching (shared across all products)
  variantAttributes: VariantAttributeOptionType[];
  variantAttributesLoading: boolean;
  variantAttributesPagination: {
    currentPage: number;
    lastPage: number;
    hasMore: boolean;
  };

  // Product-specific methods
  setProductVariants: (productId: string, data: ProductVariants) => void;
  getProductVariants: (productId: string) => ProductVariants;
  setProductVariantType: (productId: string, type: ProductVariantType) => void;
  getProductVariantType: (productId: string) => ProductVariantType;

  // Actions with productId
  addProductVariant: (productId: string, productVariant: ProductVariant) => void;
  removeProductVariant: (productId: string, id: string) => void;
  updateProductVariant: (productId: string, id: string, data: Partial<ProductVariant>) => void;
  addProductVariantOption: (
    productId: string,
    productVariantID: string,
    option: ProductVariantOption
  ) => void;
  updateProductVariantOptionByProductIDandOptionID: (
    productId: string,
    productVariantID: string,
    optionID: string,
    data: ProductVariantOption
  ) => void;
  deleteOptionByProductIDandOptionID: (
    productId: string,
    productVariantID: string,
    optionID: string
  ) => void;
  changeProductVariantTypeByID: (
    productId: string,
    id: string,
    type: string,
    selectedID: string
  ) => void;
  setProductVariantAttributeByID: (
    productId: string,
    id: string,
    variantAttribute: VariantAttributeOptionType | null
  ) => void;
  addPricesVariantOption: (
    productId: string,
    productVariantID: string,
    optionID: string,
    price: { id: string; namePcs: string; quantity: string; price: number | string }
  ) => void;

  // Clear methods with optional productId
  clearAllData: (productId?: string) => void;

  // Variant Attributes Caching Methods (shared across all products)
  loadVariantAttributes: (page?: number, search?: string) => Promise<VariantAttributeOptionType[]>;
  setVariantAttributesLoading: (loading: boolean) => void;
  addVariantAttributes: (
    attributes: VariantAttributeOptionType[],
    pagination: { currentPage: number; lastPage: number; hasMore: boolean }
  ) => void;
  clearVariantAttributes: () => void;
};

export type PriceCardValue = {
  id: string;
  namePcs?: string;
  quantity?: number;
  price?: number;
};

export type FormattedData = {
  id: string;
  name: string;
  thumbnail: string;
  barcode: string;
  sku: string;
  minStock: number;
  prices?: PricesVariantOption[];
  typeprice: string;
  isActive: boolean;
  options?: {
    id: string;
    type: string;
    name: string;
    selected_id: string;
  }[];
};
export type FormattedDatas = Array<FormattedData>;

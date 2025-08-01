export type ProductVariant = {
  id: string;
  type?: ProductVariantType;
  options?: ProductVariantOption[];
};

export type ProductVariants = Array<ProductVariant>;

export type ProductVariantOption = {
  id: string;
  name: string;
  type: string;
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

  // Actions
  addProductVariant: (productVariant: ProductVariant) => void;
  removeProductVariant: (id: string) => void;
  updateProductVariant: (id: string, data: Partial<ProductVariant>) => void;
  addProductVariantOption: (productVariantID: string, option: ProductVariantOption) => void;
  updateProductVariantOptionByProductIDandOptionID: (
    productVariantID: string,
    optionID: string,
    data: ProductVariantOption
  ) => void;
  deleteOptionByProductIDandOptionID: (productVariantID: string, optionID: string) => void;
  changeProductVariantTypeByID: (id: string, type: ProductVariantType) => void;
  addPricesVariantOption: (
    productVariantID: string,
    optionID: string,
    price: { id: string; namePcs: string; quantity: string; price: string }
  ) => void;
  setFormattedData: (data: FormattedDatas) => void;
  updateFormattedData: (id: string, data: Partial<FormattedData>) => void;
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

export type FormattedData = {
  id: string;
  name: string;
  thumbnail: string;
  barcode: string;
  sku: string;
  minStock: number;
  prices?: PricesVariantOption[];
  typeprice: string;
};
export type FormattedDatas = Array<FormattedData>;

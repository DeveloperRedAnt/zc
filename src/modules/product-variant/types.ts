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
};
export type ProductVariantOptions = Array<ProductVariantOption>;

export type PricesVariantOption = {
  id: string;
  namePcs: string;
  prices: number;
  quantity: number;
};
export type PricesVariantOptions = Array<PricesVariantOption>;

export type ProductVariantType = 'Warna' | 'Ukuran' | 'Lainnya' | '';

export type ProductVariantStore = {
  formattedData: Array<{
    id: string;
    name: string;
    barcode: string;
    sku: string;
    minStock: number;
    thumbnail: string;
    prices: PricesVariantOption[];
  }>;
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

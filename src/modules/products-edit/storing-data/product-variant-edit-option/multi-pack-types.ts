// @/modules/products-edit/storing-data/product-variant-edit-option/multi-pack-types.ts
export type PriceMultiPackItem = {
  id?: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

// @/modules/products-edit/storing-data/product-variant-edit-option/types.ts
export type VariantUnit = {
  id: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

export type ProductCardValue = {
  file: string;
  barcode: string;
  sku: string;
  minStock: number;
};

export type FormattedData = {
  id: number;
  name: string;
  thumbnail: string;
  barcode: string;
  sku: string;
  minStock: number;
  variantUnits: VariantUnit[];
};

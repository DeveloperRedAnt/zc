// dto/product-variant.dto.ts
import { BaseRequestSchema } from './base.dto';
// Request schemas
export type GetProductDetailSchema = BaseRequestSchema & {
  params: {
    productId: string;
    store_id: string;
  };
};

export type UpdateProductVariantsSchema = BaseRequestSchema & {
  params: {
    productId: string;
  };
  body: UpdateProductVariantsPayload;
};

export type UpdateProductVariantsPayload = {
  variants: ProductVariantUpdateData[];
};

export type ProductVariantUpdateData = {
  id: number; // Changed from string to number
  thumbnail?: string;
  barcode: string;
  sku_code: string;
  minimum_stock: number;
  is_active: boolean;
  variant_units?: VariantUnitUpdateData[];
};

export type VariantUnitUpdateData = {
  id?: number;
  unit_name: string;
  conversion_value: number;
  price: number;
};

// API Response types - matching the actual API structure
export type ApiProductDetailResponse = {
  status: string;
  message: string;
  data: ApiProductDetailData;
};

export type ApiProductDetailData = {
  id: number;
  name: string;
  type: string;
  thumbnail: string | null;
  unit: {
    id: number;
    name: string;
  };
  package: string;
  is_active: boolean;
  is_favorite: boolean;
  is_non_tax: boolean;
  content: string;
  current_stock: string;
  tags: ApiTag[];
  stock_tracking: {
    is_enabled: boolean;
    minimum_stock: string;
  };
  expired_reminder: {
    is_enabled: boolean;
    countdown: string;
  };
  variants: ApiProductVariantData[];
  composite: unknown;
};

export type ApiTag = {
  id: number;
  name: string;
};

export type ApiProductVariantData = {
  id: number;
  thumbnail: string | null;
  sku_code: string;
  barcode: string;
  is_active: boolean;
  stock: string;
  expiration: {
    expired_at: string;
  };
  attributes: ApiVariantAttribute[];
  is_wholesale: boolean;
  variant_units: ApiVariantUnit[];
};

export type ApiVariantAttribute = {
  attribute: string;
  value: string;
};

export type ApiVariantUnit = {
  id: number;
  unit_name: string;
  conversion_value: string;
  price: string;
};

// Update response types
export type UpdateProductVariantsResponse = {
  status: string;
  message: string;
  data?: unknown;
};

// Frontend component data structure - transformed from API
export type FormattedVariantData = {
  id: number; // Changed from string to number to match existing type
  name: string;
  thumbnail: string;
  barcode: string;
  sku: string;
  minStock: number;
  isActive: boolean;
  attributes: VariantAttributeData[];
  isWholesale: boolean;
  variantUnits: FormattedVariantUnit[];
};

export type VariantAttributeData = {
  attribute: string;
  value: string;
};

export type FormattedVariantUnit = {
  id: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

// Form component types
export type ProductCardValue = {
  file: string;
  barcode: string;
  sku: string;
  minStock: number;
};

export type FieldErrors = {
  [variantId: number]: { // Changed from string to number
    [field: string]: string;
  };
};

// Validation schemas
export type ProductVariantValidationSchema = {
  name: string;
  thumbnail?: string;
  barcode: string;
  sku: string;
  minStock: number;
};
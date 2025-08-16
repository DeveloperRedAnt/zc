// Base entity interfaces
export interface Supplier {
  id: number;
  name: string;
  pic: string;
  phone: string;
  created_at: string;
}

export interface Store {
  id: number;
  name: string;
  code: string;
  address?: string;
  phone?: string;
  created_at: string;
}

// Product Detail interfaces
export interface VariantAttribute {
  attribute: string;
  value: string;
}

export interface VariantUnit {
  unit_name: string;
  conversion_value: string;
  price: string;
}

export interface VariantExpiration {
  expired_at: string;
}

export interface ProductVariant {
  id: number;
  thumbnail: string;
  sku_code: string;
  barcode: string;
  is_active: boolean;
  stock: string;
  store_name: string | null;
  expiration: VariantExpiration;
  attributes: VariantAttribute[];
  is_wholesale: boolean;
  variant_units: VariantUnit[];
}

export interface StockTracking {
  is_enabled: boolean;
  minimum_stock: string;
}

export interface ExpiredReminder {
  is_enabled: boolean;
  countdown: string;
}

export interface ProductDetail {
  id: number;
  name: string | null;
  type: string;
  thumbnail: string;
  is_active: boolean;
  is_favorite: boolean;
  is_non_tax: boolean;
  content: string | null;
  current_stock: string;
  tags: string[];
  stock_tracking: StockTracking;
  expired_reminder: ExpiredReminder;
  variants: ProductVariant[];
  composite: null;
}

export interface ProductDetailResponse {
  status: string;
  message: string;
  data: ProductDetail;
}

// Request/Response interfaces for getting data
export interface SupplierRequestParams {
  page?: number;
  search?: string;
  per_page?: number;
}

export interface SupplierResponse {
  data: Supplier[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface StoreRequestParams {
  page?: number;
  search?: string;
  per_page?: number;
}

export interface StoreResponse {
  data: Store[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Store Variant Request interfaces - Body Request
export interface StoreVariantProduct {
  store_id: number;
  product_id: number;
  product_variant_id: number;
  quantity: number;
  purchase_price: number;
  expired_at: string; // Format: "YYYY-MM-DD" contoh: "2025-12-31"
}

export interface StoreVariantRequest {
  supplier_id: number;
  other_cost: number;
  note: string;
  stock_reason_code_id: number;
  type: "in" | "out";
  products: StoreVariantProduct[];
  [key: string]: unknown; 
}

export type StoreVariantRequestPayload = StoreVariantRequest & Record<string, unknown>;

// Response interface
export interface StoreVariantResponse {
  code: 201;
  status: "success";
  name: "CREATED";
  message: "Initial stock created successfully";
  data: [];
}

// Generic response dengan specific data type
export interface ApiResponse<T> {
  code: number;
  status: string;
  name: string;
  message: string;
  data: T;
}

export interface StoreVariantSuccessResponse {
  code: number;
  status: string;
  name: string;
  message: string;
  data: [];
}

// Option dalam variant
export interface VariantAttributeOption {
  id: number;
  product_id: number;
  variant_attribute_id: number;
  option_value: string;
  created_at: string;
  updated_at: string;
}

export interface ProductVariantDetail {
  id: number;
  variant_name: string | null;
  sku: string;
  barcode: string;
  price: string;
  stock: string;
  attribute_options: VariantAttributeOption[];
}

export interface ProductVariantDetailResponse {
  status: string; // contoh: "success"
  message: string; // contoh: "Product variant detail retrieved successfully"
  data: ProductVariantDetail;
}
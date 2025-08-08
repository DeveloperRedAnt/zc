// DTOs for product domain
import { BaseRequestPagination, BaseResponseSchemaPagination } from "./base.dto";

export type UnitSchema = {
  data: Record<string, string>[];
}

export type TaxSchema = {
  created_at: string;
  deleted_at: string;
  id: number;
  period_date: string;
  store_id: number;
  tax: number;
  updated_at: string;
}

export type CreateTaxRequestSchema = {
  tax: number;
}

export type CreateUnitRequestSchema = {
  unit_name: string;
}

export type VariantRequestSchema = {
  name: string;
}

export type VariantSchema = {
  id: number;
  variant_attribute_name: string;
}

export type TagRequestSchema = {
  name: string;
}

export type TagSchema = {
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  store_id: number;
  updated_at: string;
}

// Create Product DTOs
export type ProductVariantUnit = {
  id: string;
  unit_name: string;
  conversion_value: string;
  price: string;
}

export type ProductVariant = {
  id: string;
  thumbnail?: string;
  sku_code: string;
  barcode: string;
  is_active: boolean;
  attributes: any[];
  is_wholesale: boolean;
  variant_units: ProductVariantUnit[];
}

export type ProductCompositeComponent = {
  id: string;
  product_variant_id: number;
  quantity: number;
}

export type CreateProductComposite = {
  production_per_batch: number;
  components: ProductCompositeComponent[];
}

export type CreateProductRequestSchema = {
  id: string;
  name: string;
  type: 'single' | 'variant' | 'composite';
  package?: string;
  thumbnail?: string;
  is_active: boolean;
  is_favorite: boolean;
  is_non_tax: boolean;
  content?: string;
  unit_id: number;
  tag_ids: number[];
  is_stock_tracking: boolean;
  minimum_stock?: number;
  is_enable_expired_reminder: boolean;
  expired_reminder_in_days?: number;
  expired_reminder_in_date?: string;
  variants: ProductVariant[];
  composites?: CreateProductComposite;
}

export type CreateProductResponseSchema = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: {
    product: string;
  };
}

export type ProductsFirstStockSchema = {
  product_id: number;
  product_variant_id: number;
  quantity: number;
  purchase_price: number;
  expired_at: string;
}

export enum StockType {
  IN = "in",
  OUT = "out",
}

export type SetFirstStockPayload = {
  purchase_date: Date | string;
  supplier: number;
  other_cost: number;
  note: string;
  type: StockType;
  stock_reason_code_id: number;
  store_id: number;
  products: ProductsFirstStockSchema;
}

export type GetProductFirstSchema = {
  'x-device-id': string;
  'x-organization-id': string;
  product_id: string;
}

export type GetRequestStockSchema = {
  'x-device-id': string;
  'x-organization-id': string;
  'x-store-id': string;
  product_id: string | number;
}

export type ReturnDetailTempProductResponseSchema = {
  id?: string | number;
  purchaseDate: string;
  supplier: {
    id: number;
    name: string;
  };
  otherCost: number;
  noteNumber: string;
  organization: {
    id: string;
    name: string;
  };
  store: {
    id: number;
    name: string;
  };
  firstStock: number;
  buyPrice: number;
  expiredDate: string;
}


export type ProductStockHistoriesResponse = {
  date: string;
  variant: string;
  stock_change: string;
  stock_after: string;
  reason: string;
};




export type ProductSchema = {
  id?: string;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
  page?: number;
  status?: 'Aktif' | 'Non Aktif';
}

export type ApiProduct = {
  id: number;
  brand: string; // menggantikan 'name'
  package?: string; // menggantikan 'packaging'
  content?: string; // menggantikan 'size'
  unit?: string;
  price: string; // menggantikan 'het'
  thumbnail?: string; // menggantikan 'image'
  is_favorite?: boolean;
  variants?: ApiVariant[];
  is_active?: boolean;
  barcode?: string;
  sku_code?: string;
  composite?: ProductComposite;
  stock_taking?: {
    is_enabled: boolean;
    minimum_stock: number;
  };
  expired_reminder?: {
    is_enabled: boolean;
    reminder_in_days: number;
    reminder_in_date: string;
  };
  current_stock?: number;
  type?: 'variant' | 'composite' | 'simple';
  tags: string[]
};

export type ApiVariant = {
  id: number;
  name: string;
  barcode: string;
  sku: string;
  het: string;
  variant_units?: {
    unit_name: string;
    conversion_value: number;
    price: number;
  }[];
  is_active: boolean;
  gtin?: string;
  sku_code?: string;
  thumbnail?: string;
  attributes?: { value: string }[];
  package?: string;
}

export type ApiResponse = {
  data: ApiProduct[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

// Variant Attributes API Types
export type VariantAttributeSchema = {
  per_page?: number;
  page?: number;
};

export type VariantAttributeItem = {
  id: number;
  variant_attribute_name: string;
};

export type VariantAttributeListResponse = {
  status: string;
  message: string;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  data: VariantAttributeItem[];
};

export type ProductStockOpname = {
    id: number;
    note: string;
    store_name: string;
    reference_number: string;
    date_inspection: string;
    total_items: number;
    person_in_charge: string;
}

export type ProductStockOpnameRequest = BaseRequestPagination & {
  start_date : string;
  end_date   : string;
  search     : string;
  [key: string]: unknown;
}

export type ProductStockOpnames = Array<ProductStockOpname>

export type ProductStockOpnameResponse = BaseResponseSchemaPagination<ProductStockOpnames>
    
export type ProductComposite = {
    components: {
      id: string; // UUID untuk UI tracking
      product_id: number | null;
      product_name: string | null;
      quantity: number;
    }[],
    production_per_batch: number;
    current_stock: string;
}

export type ProductTag = string;

export type ProductStockPayload = {
  supplier_id: number;
  other_cost: number;
  note: string;
  stock_reason_code_id: number;
  type: "in" | "out";
  products: {
    product_id: number;
    product_variant_id: number;
    quantity: number;
    purchase_price: number;
    expired_at: string;
  }[];
}


export type InitializeStockRequestSchema = {
  store_id: number;
  supplier_id: number;
  other_cost: number;
  note: string;
  stock_reason_code_id: number;
  type: "in" | "out";
  products: {
    product_id: number;
    product_variant_id: number;
    quantity: number;
    purchase_price: number;
    expired_at: string;
  }[];
}
// DTOs for product domain

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
  display_name: string;
}

export type VariantRequestSchema = {
  name: string;
}

export type VariantSchema = {
  id: number;
  name: string;
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
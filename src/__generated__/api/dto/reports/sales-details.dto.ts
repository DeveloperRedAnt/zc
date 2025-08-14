import { BaseRequestSchema } from '../base.dto';

export type GetDetailTransactionSchema = BaseRequestSchema & {
  body: Partial<GetDetailTransactionPayloadSchema>;
};

export type GetDetailTransactionPayloadSchema = {
  per_page: number;
  search?: string;
  sort_by?: string;
  sort_direction?: string;
  page: number;
  start_date?: string;
  end_date?: string;
  cashier?: string;
  store_id?: string;
};

// Frontend component data structure
export type TransactionDetail = {
  id: string;
  tanggal: string;
  no_transaksi: string;
  kasir: string;
  total_transaksi: number;
  tambahan_biaya: number;
  potongan: number;
  service_charge: number;
  pajak: number;
  products: ProductDetail[];
};

export type ProductDetail = {
  nama_produk: string;
  jumlah_penjualan: string;
  nominal_penjualan: string;
  image_url: string;
  qty_unit: number;
  qty: number;
  variant_unit_name: string;
  total_nominal: number;
};

// API Response types for the actual API structure
export type ApiTransactionItem = {
  product_name: string;
  qty_unit: number;
  qty: number;
  variant_unit_name: string;
  total_nominal: number;
  variant_product_image: string;
};

export type ApiTransactionData = {
  transaction_date: string;
  code: string;
  cashier: string;
  total_transaction: number;
  additional_fee: number;
  discount: number;
  service_charge: number;
  tax: number;
  items: ApiTransactionItem[];
};

export type ApiDetailTransactionResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiTransactionData[];
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

/** Cashier */

export type GetCashiersSchema = BaseRequestSchema & {
  body?: Partial<GetCashiersPayloadSchema>;
};

export type GetCashiersPayloadSchema = {
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_direction?: string;
  page?: number;
  store_id?: number;
  employee_id?: number;
};

export type ApiCashier = {
  id: number;
  employee_id: number;
  employee_name?: string;
  store_id: number;
  store_name: string;
};

export type ApiCashiersResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiCashier[];
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
};

/** Product */
export type GetProductsSchema = BaseRequestSchema & {
  body: Partial<GetProductsPayloadSchema>;
};

export type GetProductsPayloadSchema = {
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_direction?: string;
  page?: number;
  unit_id?: number;
  type?: string;
  is_active?: number;
  is_favorite?: number;
};

export type ApiProductVariant = {
  name: string;
  barcode: string;
  sku: string;
  het: string;
};

export type ApiProductDetails = {
  id: number;
  name?: string;
  organization_id: number;
  unit_id: number;
  brand?: string;
  model?: string;
  content?: string;
  package?: string;
  production_per_batch?: number;
  type: string;
  is_active: number;
  is_stock_tracking: number;
  minimum_stock: number;
  is_favorite: number;
  is_non_tax: number;
  is_enable_expired_reminder: number;
  expired_reminder_in_days?: number;
  expired_reminder_in_date?: string;
  hash?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  thumbnail?: string;
  price?: string;
  variants?: ApiProductVariant[];
};

export type ApiProductsResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiProductDetails[];
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
};
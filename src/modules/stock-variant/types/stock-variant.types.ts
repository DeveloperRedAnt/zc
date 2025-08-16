export interface StockEntry {
  id: string;
  toko: string;
  stokAwal: number | string;
  hargaBeli: number | string;
  tanggalKedaluwarsa: Date | undefined;
  sku_code?: string;
  variant_id?: number;
  store_name?: string;
  attributes?: VariantAttribute[];
  attribute_options?: VariantAttributeOption[];
}

export type StockEntryListProps = {
  stockEntries: StockEntry[];
  errors: { [key: string]: string };
  onRemove: (id: string) => void;
  onChange: (
    id: string,
    field: keyof Omit<StockEntry, 'id'>,
    value: string | number | Date | undefined
  ) => void;
  onAdd: () => void;
  variantId?: number;
  showAddButton?: boolean;
};

export type StockEntryCardProps = {
  entry: StockEntry;
  index: number;
  errors: { [key: string]: string };
  onRemove?: (id: string) => void;
  onChange: (
    id: string,
    field: keyof Omit<StockEntry, 'id'>,
    value: string | number | Date | undefined
  ) => void;
  removable?: boolean;
};

export interface FormErrors {
  [key: string]: string;
}

export type SupplierSectionProps = {
  purchaseDate: Date | undefined;
  setPurchaseDate: (date: Date | undefined) => void;
  supplier: string;
  setSupplier: (supplier: string) => void;
  otherCosts: string;
  setOtherCosts: (cost: string) => void;
  invoiceNumber: string;
  setInvoiceNumber: (invoice: string) => void;
  errors: FormErrors;
};

// data dummy
export interface ProductDetailResponse {
  status: string;
  message: string;
  data: ProductDetail;
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
  composite: Record<string, unknown> | null;
}

export interface StockTracking {
  is_enabled: boolean;
  minimum_stock: string;
}

export interface ExpiredReminder {
  is_enabled: boolean;
  countdown: string;
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

export interface VariantExpiration {
  expired_at: string;
}

export interface VariantAttribute {
  attribute: string;
  value: string;
}

export interface VariantUnit {
  unit_name: string;
  conversion_value: string;
  price: string;
}

export interface Store {
  id: string;
  name: string;
}

export interface VariantAttributeOption {
  id: number;
  product_id: number;
  variant_attribute_id: number;
  option_value: string;
  created_at: string;
  updated_at: string;
}

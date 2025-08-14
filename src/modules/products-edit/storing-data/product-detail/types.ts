export interface ProductDetailState {
  content: string;
  package: string;
  unit_id: number | null;
  unit_string?: string;
  barcode?: string;
  sku?: string;
}

export type SetProductDetail = (data: Partial<ProductDetailState>) => void;

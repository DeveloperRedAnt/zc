export type CompositeStockProduct = {
  product_id: number;
  product_variant_id: number;
  store_id: number;
  production_per_batch: number;
  stock_batch_realization: number;
  quantity: number;
  purchase_price: number;
  purchase_date: string; 
  expired_at: string;    
}

export type CompositeStockRequest  = {
  product_type: 'composite';
  stock_date: string; 
  other_cost: number;
  note: string;
  stock_reason_code_id: number;
  type: 'in';
  products: CompositeStockProduct[];
}

export type ResponseInitStockFirstComposiste = {
  code: number
  status: string
  name: string
  message: string
  data: CompositeStockProduct[]
}

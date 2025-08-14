export type CompositeComponent = {
  id: string; // UUID untuk UI tracking
  product_id: number | null;
  product_name: string | null;
  quantity: number;
};

export type ProductComposite = {
  purchase_price?: string;
  production_per_batch: number;
  components: CompositeComponent[];
};

export type CompositeComponent = {
  id: string; // UUID untuk UI tracking
  product_id: number | null;
  name: string | null;
  quantity: number;
};

export type ProductComposite = {
  current_stock?: number;
  production_per_batch: number;
  components: CompositeComponent[];
};

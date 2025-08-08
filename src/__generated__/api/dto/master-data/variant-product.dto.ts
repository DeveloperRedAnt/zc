import { Variant } from '@/modules/master-data/types/variant';

export type VariantProductListResponse = {
  data: Variant[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type VariantProductPayload = {
  variant_attribute_name: string;
};

export type VariantProductResponse = {
  id: number;
  variant_attribute_name: string;
};
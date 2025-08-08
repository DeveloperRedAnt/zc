import { Tag } from '@/modules/master-data/types/tag';

export type TagsProductListResponse = {
  data: Tag[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type TagsProductPayload = {
  name: string;
};

export type TagsProductResponse = {
  id: number;
  name: string;
};
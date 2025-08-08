import { UnitProduct } from '@/modules/master-data/types/unit';

export type UnitProductListResponse = {
  data: UnitProduct[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type UnitProductPayload = {
  unit_name: string;
};

export type UnitProductResponse = {
  id: number;
  unit_name: string;
};
import { BaseRequestSchema } from '../base.dto';

export type GetTaxMasterSchema = BaseRequestSchema & {
  body: Partial<GetTaxMasterPayloadSchema>;
};

export type GetTaxMasterPayloadSchema = {
  per_page: number;
  search: string;
  search_by_status: string;
  sort_by: string;
  sort_direction: string;
  page: number;
};

// Frontend component data structure
export type TaxMasterStore = {
  id: string;
  npwp: string;
  name: string;
  percentage: string;
};

// API Response types for the actual API structure
export type ApiTaxMasterData = {
  npwp: string;
  store_id: number;
  store: string;
  tax: number;
};

export type ApiTaxMasterResponse = {
  status: string;
  message: string;
  data: {
    code: number;
    status: string;
    name: string;
    message: string;
    data: ApiTaxMasterData[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
};

// Update tax master request types
export type UpdateTaxMasterPayload = {
  tax: number;
};

export type UpdateTaxMasterResponse = {
  code: number;
  status: string;
  message: string;
  data?: unknown;
};
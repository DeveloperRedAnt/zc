import { BaseRequestSchema } from '../base.dto';

export type GetServiceChargeSchema = BaseRequestSchema & {
  body: Partial<GetServiceChargePayloadSchema>;
};

export type GetServiceChargePayloadSchema = {
  per_page: number;
  search: string;
  search_by_status: string;
  sort_by: string;
  sort_direction: string;
  page: number;
};

// Frontend component data structure
export type ServiceChargeStore = {
  id: string;
  name: string;
  percentage: string;
  count_tax: boolean;
};

// API Response types for the actual API structure
export type ApiServiceChargeData = {
  store_id: number;
  store_name: string;
  charge: number;
  is_tax_included: boolean;
};

export type ApiServiceChargeResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ApiServiceChargeData[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

// Update service charge request types
export type UpdateServiceChargePayload = {
  charge: number;
  is_tax_included: boolean;
};

export type UpdateServiceChargeResponse = {
  code: number;
  status: string;
  message: string;
  data?: unknown;
};